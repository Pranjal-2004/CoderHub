import React, { useState, useEffect } from "react";
import { editor } from "monaco-editor";
import "./QuestionIDEComponent.css";
import Editor from "@monaco-editor/react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../../firebase/firebase.config";
interface IEditorOptions extends editor.IStandaloneEditorConstructionOptions {
  acceptSuggestionOnEnter: "on" | "off" | "smart";
}
interface Pairings {
  c: string;
  csharp: string;
  cpp: string;
  java: string;
  python: string;
  go: string;
  javascript: string;
}
interface ApiResponse {
  error: string;
  info: string;
  langauge: string;
  output: string;
  status: number;
  timestamp: number;
}
interface Testcases {
  input: string;
  output: string;
}
interface Constraints {
  time: string;
  space: string;
}
interface Question {
  id: number;
  title: string;
  description: string;
  input: string;
  output: string;
  difficulty: string;
  testcases: Testcases[];
  constraints: Constraints;
  tags: string;
}
interface QuestionIDEComponentProps {
  question: Question | null;
}
const QuestionIDEComponent: React.FC<QuestionIDEComponentProps> = ({
  question,
}) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [currCode, setCurrCode] = useState<string>(`// JavaScript Example
const greeting = "Hello, World!";
console.log(greeting);

function example() {
  return "This is a JavaScript example";
}`);
  const [theme, setTheme] = useState<string>("vs-dark");
  const [fontSize, setFontSize] = useState<number>(12);
  const [minimap, setMinimap] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [personalNotes, setPersonalNotes] = useState<string>("");
  const location = useLocation();
  question = !question ? location.state?.question : question;
  console.log(question);
  const languageDefaults: { [key: string]: string } = {
    java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    python: `# Python Example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
    cpp: `// C++ Example
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    c: `// C Example
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    csharp: `// C# Example
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
    go: `// Go Example
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
    javascript: `// JavaScript Example
const greeting = "Hello, World!";
console.log(greeting);

function example() {
  return "This is a JavaScript example";
}`,
  };
  const pairings: Pairings = {
    c: "c",
    csharp: "cs",
    cpp: "cpp",
    java: "java",
    python: "py",
    go: "go",
    javascript: "js",
  };
  const runCode = async (): Promise<void> => {
    const chosenLanguage = language as keyof Pairings;

    const data = {
      code: currCode,
      language: pairings[chosenLanguage],
      input: input,
    };
    const config = {
      method: "post",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    const response = await axios(config);
    const resData: ApiResponse = response.data;
    setOutput(resData.output);
    console.log(resData);
  };

  useEffect(() => {
    setCurrCode(languageDefaults[language]);
  }, [language]);

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor")
  ) => {
    editor.focus();
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });
  };
  const handleSave = async () => {
    console.log("Saving code:", currCode);
    console.log(language, theme, fontSize, minimap);
    runCode();
    if (!question) return;

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User is not authenticated");
        return;
      }

      const userId = user.uid;
      const questionId = question.id.toString();

      // Reference to the specific question document
      const questionRef = doc(firestore, "users", userId, "questions", questionId);

      
      await setDoc(
        questionRef,
        { solved: true },
        { merge: true }
      );

      console.log(`Question ${questionId} marked as solved!`);
    } catch (error) {
      console.error("Error updating question status:", error);
    }
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCurrCode(languageDefaults[newLanguage]);
  };
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(parseInt(e.target.value));
  };
  const handleMinimapToggle = () => {
    setMinimap(!minimap);
  };
  
  const editorOptions: IEditorOptions = {
    acceptSuggestionOnEnter: "smart",
    colorDecorators: true,
    quickSuggestions: true,
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoIndent: "full",
    formatOnPaste: true,
    formatOnType: true,
    snippetSuggestions: "inline",
    wordBasedSuggestions: "currentDocument",
    wordBasedSuggestionsOnlySameLanguage: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    mouseWheelZoom: true,
    minimap: {
      enabled: minimap,
      showSlider: "mouseover",
      size: "proportional",
      maxColumn: 80,
      renderCharacters: true,
      scale: 5,
    },
    fontSize: fontSize,
    fontFamily: "'Fira Code', Consolas, 'Courier New', monospace",
    fontLigatures: true,
    wordWrap: "on",
    lineNumbers: "on",
    renderWhitespace: "selection",
    scrollBeyondLastLine: false,
    automaticLayout: true,
    bracketPairColorization: {
      enabled: true,
    },
    padding: {
      top: 10,
    },
    suggest: {
      preview: true,
      showMethods: true,
      showFunctions: true,
      showConstructors: true,
      showDeprecated: false,
      showFields: true,
      showVariables: true,
      showClasses: true,
      showStructs: true,
      showInterfaces: true,
      showModules: true,
      showProperties: true,
      showEvents: true,
      showOperators: true,
      showUnits: true,
      showValues: true,
      showConstants: true,
      showEnums: true,
      showEnumMembers: true,
      showKeywords: true,
      showWords: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showSnippets: true,
    },
    theme: theme,
  };

  const ipEditorOptions: IEditorOptions = {
    fontSize: fontSize,
    minimap: {
      enabled: false,
    },
    fontFamily: "'Fira Code', Consolas, 'Courier New', monospace",
    fontLigatures: true,
    wordWrap: "on",
    lineNumbers: "on",
    renderWhitespace: "selection",
    scrollBeyondLastLine: false,
    readOnly: false,
    acceptSuggestionOnEnter: "off",
  };

  const opEditorOptions: IEditorOptions = {
    fontSize: fontSize,
    minimap: {
      enabled: false,
    },
    fontFamily: "'Fira Code', Consolas, 'Courier New', monospace",
    fontLigatures: true,
    wordWrap: "on",
    lineNumbers: "on",
    renderWhitespace: "selection",
    scrollBeyondLastLine: false,
    readOnly: true,
    acceptSuggestionOnEnter: "off",
  };

  return (
    <div className="questionIDE">
      <div className="question-container">
        <div id="question">
          <h1>{question?.title}</h1>
          <p>{question?.description}</p>
          <div id="questionIO">
            <div>
              <h2>Input</h2>
              <p>{question?.input}</p>
            </div>
            <div>
              <h2>Output</h2>
              <p>{question?.output}</p>
            </div>
          </div>
          <h2>Testcases</h2>
          <div className="testcases">
            {question &&
              question.testcases &&
              question?.testcases.map((testcase, index) => (
                <div key={index} className="testcase">
                  <h3>Testcase {index + 1}</h3>
                  <p>
                    <strong>Input:</strong> {testcase.input}
                  </p>
                  <p>
                    <strong>Output:</strong> {testcase.output}
                  </p>
                </div>
              ))}
          </div>
          <h2>Constraints</h2>
          <p>
            <strong>Time:</strong>{" "}
            {question && question.constraints && question?.constraints.time}
          </p>
          <p>
            <strong>Space:</strong>{" "}
            {question && question.constraints && question?.constraints.space}
          </p>
        </div>
        <div id="notes">
          <ReactQuill
            theme="snow"
            value={personalNotes}
            onChange={(notes) => setPersonalNotes(notes)}
          />
        </div>
      </div>
      <div className="editor-container">
        <div className="toolbar">
          <select
            className="select-input language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="c">C</option>
            <option value="csharp">C#</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="go">Go</option>
            <option value="javascript">JavaScript</option>
          </select>

          <select
            className="select-input"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="vs-dark">Dark</option>
            <option value="vs">Light</option>
            <option value="hc-black">HC-Black</option>
          </select>

          <select
            className="select-input"
            value={fontSize}
            onChange={handleFontSizeChange}
          >
            {[12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>

          <button
            className={`button ${minimap ? "active" : ""}`}
            onClick={handleMinimapToggle}
          >
            {minimap ? "Hide Minimap" : "Show Minimap"}
          </button>

          <button
            className="button run-button"
            onClick={handleSave}
            title="Ctrl/Cmd + S"
          >
            Run
          </button>

          <button
            className="button save-button"
            onClick={handleSave}
            title="Ctrl/Cmd + S"
          >
            Submit
          </button>
        </div>

        <div className="editor-wrapper">
          <div id="code">
            <Editor
              width="100%"
              height="100%"
              language={language}
              theme={theme}
              value={currCode}
              options={editorOptions}
              onChange={(value) => setCurrCode(value || "")}
              onMount={handleEditorDidMount}
            />
          </div>
          <div className="IO">
            <div id="inputEditor">
              <h2>Input</h2>
              <Editor
                width="100%"
                height="300px"
                language="plaintext"
                theme={theme}
                value={input}
                onChange={(ivalue) => setInput(ivalue || "")}
                options={ipEditorOptions}
                className="ioEditor"
              />
            </div>
            <div id="outputEditor">
              <h2>Output</h2>
              <Editor
                width="100%"
                height="300px"
                language="plaintext"
                theme={theme}
                value={output}
                options={opEditorOptions}
                className="ioEditor"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionIDEComponent;

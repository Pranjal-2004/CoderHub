import { FC } from 'react';
import './ModalForAi.css';
import ReactMarkDown from 'react-markdown';

interface ModalForAiProps {
  codeFeedback: string;
  onClose: () => void;
}

const ModalForAi: FC<ModalForAiProps> = ({ codeFeedback, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p><ReactMarkDown>{codeFeedback}</ReactMarkDown></p>
        <div className="button-container">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModalForAi;

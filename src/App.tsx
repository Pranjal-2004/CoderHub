import React, { FC } from 'react'
import LandingPage from './Components/LandingPagee/Home';
import  Login  from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './Components/Admin/AdminLogin';
import StudentLogin from './Components/StudentLogin/StudentLogin';
import StudentSignup from './Components/StudentSignup/StudentSignup';
import CClogin from './Components/CClogin/CClogin';
import CCrequest from './Components/CCRequest/CCrequest';
import Dashboard from './Components/Dashboard/Dashboard';
import './App.css'
import Home from './Components/Home/Home';
import CCProfile from './Components/Profile/Profile';
import CCSettings from './Components/Settings/Settings';
import Contest from './Components/Contests/Contest';
import SHome from './StudentUser/Home/Home';
import SProfile from './StudentUser/Profile/Profile';
import SContest from './StudentUser/Contest/Contest';
import SSettings from './StudentUser/Settings/Settings';  
import QuestionPageComponent from './QuestionIDEComponents/QuestionPageComponent/QuestionPageComponent';
import Courses from './Special60Components/Courses/Courses';
import Cpptsx from './Special60Components/Cpptsx/Cpptsx';
import Array from './Special60Components/Array/Array';
import LinkedList from './Special60Components/LinkedList/LinkedList';
import QuestionIDEComponent from './QuestionIDEComponents/QuestionIDEComponent/QuestionIDEComponent';

const App: FC = () => {

  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage}/>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={SignUp}/>
        <Route path="/login/admin" Component={AdminLogin}/>
        <Route path="/login/user" Component={StudentLogin}/>
        <Route path="/register/user" Component={StudentSignup}/>
        <Route path="/login/cc" Component={CClogin} />
        <Route path="/register/cc" Component={CCrequest} />
        <Route path="/u/dashboard" Component={ Dashboard} />
        <Route path="/cc/home" Component={ Home} />
        <Route path="/cc/profile" Component={ CCProfile} />
        <Route path="/cc/settings" Component={ CCSettings} />
        <Route path="/cc/contest" Component={ Contest} />
        <Route path="/u/home" Component={SHome} />
        <Route path="/u/profile" Component={SProfile} />
        <Route path="/u/settings" Component={SSettings} />
        <Route path="/u/contest" Component={SContest} />
        <Route path="/question/*" Component={QuestionPageComponent} />
        <Route path="/learning-path" Component={Courses} />
        <Route path='/learning-path/courses' Component={Courses} />
        <Route path="learning-path/courses/cpp" Component={Cpptsx} />
        <Route path="learning-path/array" Component={Array} />
        <Route path='learning-path/linked-list' Component={LinkedList} />
        <Route path="learning-path/:topic/question/:questionId"  Component={QuestionIDEComponent} />
      </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App

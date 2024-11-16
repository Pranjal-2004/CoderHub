import  { FC } from "react";
import "./Heading.css"
import { Link } from "react-router-dom";
const Heading:FC = () => {
  return (
    <div className="header">
      <Link className="link" to="/">
        <h1>CODER'S HUB</h1>
      </Link>
        <div className="authbtn">
          <button onClick={ () => { window.location.href = '/login'}}>Login</button>
          <button onClick={ () => {window.location.href='/register'}}>Sign Up</button>
        </div>
    </div>
  )
}

export default Heading
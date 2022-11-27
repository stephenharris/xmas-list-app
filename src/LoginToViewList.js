import React from 'react';
import { connect } from "react-redux";
import Auth0LoginButton from './Auth0LoginButton';
import SantaList from './SantaList';
import './LoginToViewList.css';
import icon from './gift-flat.png'; // Tell webpack this JS file uses this image

function LoginToViewList() {
  
  return (
    <div>
       { process.env.REACT_APP_THEME ==='xmas' ? <h1>Looks like you're on the naughty list</h1> : <h1>Log-in to view this list</h1>}

      <div className="signInContainer">
          { process.env.REACT_APP_THEME ==='xmas' ? <SantaList/> : <img src={icon} alt="" />}
          <div className="signInContainer__form">
            <p className="signInContainer__subHeader">(Actually, you just need to log-in)</p>
            <p><Auth0LoginButton/></p>
          </div>
      </div>
    </div>
  );
}

export default connect()(LoginToViewList);


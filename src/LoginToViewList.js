import React from 'react';
import { connect } from "react-redux";
import Auth0LoginButton from './Auth0LoginButton';
import './LoginToViewList.css';
import icon from './gift-flat.png'; // Tell webpack this JS file uses this image

function LoginToViewList() {
  
  return (
    <div>
      <h1>Log-in to view this list</h1>

      <div className="signInContainer">
          <img src={icon} alt="" />
          <div className="signInContainer__form">
            <p><Auth0LoginButton/></p>
          </div>
      </div>
    </div>
  );
}

export default connect()(LoginToViewList);


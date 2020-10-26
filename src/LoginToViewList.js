import React from 'react';
import { connect } from "react-redux";
import GoogleLoginButton from './GoogleLoginButton';
import Auth0LoginButton from './Auth0LoginButton';
import SantaList from './SantaList';
import LoginWithEmailForm from './LoginWithEmailForm';
import './LoginToViewList.css';

function LoginToViewList() {
  return (
    <div>
      <h1>Looks like you're on the naughty list</h1>

      <div className="signInContainer">
          <SantaList/>
          <div className="signInContainer__form">
            <p className="signInContainer__subHeader">(Actually, you just need to log-in)</p>
            <LoginWithEmailForm/>
            <p>or</p> 
            <p><GoogleLoginButton/></p>
            <p><Auth0LoginButton/></p>
          </div>
      </div>
    </div>
  );
}

export default connect()(LoginToViewList);


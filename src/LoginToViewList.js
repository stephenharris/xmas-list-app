import React from 'react';
import { connect } from "react-redux";
import { getAccessToken, isLoggedIn } from "./redux/selectors";
import GoogleLoginButton from './GoogleLoginButton';
import SantaList from './SantaList';
import LoginWithEmailForm from './LoginWithEmailForm';

import './LoginToViewList.css';

const mapStateToProps = state => {
  const accessToken = getAccessToken(state);
  const isUserLoggedIn = isLoggedIn(state);
  return { accessToken, isUserLoggedIn };

};


function LoginToViewList({isUserLoggedIn, accessToken, location}) {
    
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
          </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(LoginToViewList);


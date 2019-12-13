import React from 'react';
import { connect } from "react-redux";
import { getAccessToken, isLoggedIn } from "./redux/selectors";
import GoogleLoginButton from './GoogleLoginButton';
import Button from './Button';
import Input from './Input';
import SantaList from './SantaList';

import './LoginToViewList.css';

const mapStateToProps = state => {
  const accessToken = getAccessToken(state);
  const isUserLoggedIn = isLoggedIn(state);
  return { accessToken, isUserLoggedIn };

};

function LoginToViewList({isUserLoggedIn, accessToken}) {
    
  //

  return (
    <div>
      <h1>Looks like you're on the naughty list</h1>

      <div className="signInContainer">
        <SantaList/>
        <form>
            <p class="subHeader">(Or you just need to log-in)</p>

            <div>
              <Input label="Your email" type="email" />    
              <Button type="submit">Sign-in</Button>
            </div>
            <p>or</p> 
            <p><GoogleLoginButton/></p>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(LoginToViewList);


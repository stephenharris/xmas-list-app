import React from 'react';
import { connect } from "react-redux";
import { getAccessToken, isLoggedIn } from "./redux/selectors";
import GoogleLoginButton from './GoogleLoginButton';
import Button from './Button';
import Input from './Input';
import Santa from './Santa';

import './SignUp.css';

const mapStateToProps = state => {
  const accessToken = getAccessToken(state);
  const isUserLoggedIn = isLoggedIn(state);
  return { accessToken, isUserLoggedIn };

};

function SignUp({isUserLoggedIn, accessToken}) {
    

  return (
    <div>
      <h1>Sign up</h1>

      <div className="signUpContainer">
        <Santa/>
        <ol>
          <li>
            <strong>Log-in</strong>
            with Google or via email. No need to set a password
            <form>
              <div>
                <Input label="Your email" type="email" />    
                <Button type="submit">Sign-in</Button>
              </div>
              <p>or <GoogleLoginButton/></p>
            </form>
          </li>
          <li>
            <strong>Create a list</strong>
            Add items to your wishlist
          </li>
          <li>
            <strong>Share your list</strong>
            with friends and family. They can mark the ones they plan to get you, and other's will see those items crossed-out. 
          </li>
        </ol>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(SignUp);


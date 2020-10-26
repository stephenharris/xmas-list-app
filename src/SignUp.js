import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import Auth0LoginButton from './Auth0LoginButton';
import LoginWithEmailForm from './LoginWithEmailForm';
import Santa from './Santa';

import './SignUp.css';

function SignUp() {
  
  return (
    <div>
      <h1>Sign up</h1>

      <div className="signUpContainer">
        <Santa/>
        <ol>
          <li>
            <strong>Log-in</strong>
            <div>with Google or via email. No need to set a password
              <LoginWithEmailForm/>
              <p>or <GoogleLoginButton/></p>
              <p><Auth0LoginButton/></p>
            </div>
          </li>
          <li>
            <strong>Create a list</strong>
            <div>Add items to your wishlist</div>
          </li>
          <li>
            <strong>Share your list</strong>
            <div>with friends and family. They can mark the ones they plan to get you, and other's will see those items crossed-out. </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default SignUp;

import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
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
            with Google or via email. No need to set a password
              <LoginWithEmailForm/>
              <p>or <GoogleLoginButton/></p>
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

export default SignUp;

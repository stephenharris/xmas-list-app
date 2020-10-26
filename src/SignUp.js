import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import Auth0LoginButton from './Auth0LoginButton';
import LoginWithEmailForm from './LoginWithEmailForm';
import Santa from './Santa';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Loading';

import './SignUp.css';

function SignUp() {
  
  
  const {isLoading , isAuthenticated}= useAuth0();

  return (
    <div>
      <h1> {isLoading ? "Signing in..." : "Sign up"}</h1>

      {(isLoading) && <div><Loading/></div>}

      <div className="signUpContainer">
        <Santa/>

        {!isLoading && !isAuthenticated && <ol>
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
            <div>with friends and family. They can mark the gifts they plan to get you, and others will see those items crossed-out. </div>
          </li>
        </ol>}

      </div>
    </div>
  );
}

export default SignUp;

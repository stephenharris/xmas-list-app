import React from 'react';
import Auth0LoginButton from './Auth0LoginButton';
import Santa from './Santa';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Loading';
import icon from './gift-flat.png'; // Tell webpack this JS file uses this image
import './SignUp.scss';

function SignUp() {
  
  
  const {isLoading , isAuthenticated}= useAuth0();

  return (
    <div>
      <h1> {isLoading ? "Signing in..." : "Wishlist"}</h1>

      {(isLoading) && <div><Loading/></div>}

      <div className="signUpContainer">
      { process.env.REACT_APP_THEME ==='xmas' ? <Santa/> : <img id="splashImage" src={icon} alt="" /> }

        {!isLoading && !isAuthenticated && <ol>
          <li>
            <strong>Log-in</strong>
            <div>with Google or create an account.
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

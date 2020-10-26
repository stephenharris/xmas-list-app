import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from './Button';

const Auth0LoginButton = ({match}) => {
  const { user, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  //isAuthenticated

  const alpha = localStorage.getItem('alpha');
  console.log(alpha)
  console.log(user)

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `xmas-api`,
          scope: "*",
        });
  
        console.log("accessToken");
        console.log(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently]);

  return alpha && alpha === "true" ? <Button  onClick={() => loginWithRedirect()}>Log In</Button> : null;
};

export default Auth0LoginButton;
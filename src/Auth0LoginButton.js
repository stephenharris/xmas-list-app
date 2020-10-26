import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { setAccessToken } from "./redux/actions";
import Button from './Button';
import { connect } from "react-redux";

const Auth0LoginButton = ({setAccessToken}) => {
  const { user, loginWithRedirect, getAccessTokenSilently } = useAuth0();

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
        const alpha = localStorage.getItem('alpha');
  
        console.log("accessToken via auth0");
        if (accessToken && alpha === 'true') {
          console.log(accessToken);
          setAccessToken(accessToken);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, setAccessToken]);

  return alpha && alpha === "true" ? <Button  onClick={() => loginWithRedirect()}>Log In</Button> : null;
};

export default connect(null, {setAccessToken})(Auth0LoginButton);

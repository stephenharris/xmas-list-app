import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from './Button';

const Auth0LoginButton = ({match}) => {
  const { user, loginWithRedirect } = useAuth0();

  const alpha = localStorage.getItem('alpha');
  console.log(alpha)
  console.log(user)

  return alpha && alpha === "true" ? <Button  onClick={() => loginWithRedirect()}>Log In</Button> : null;
};

export default Auth0LoginButton;
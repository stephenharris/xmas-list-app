import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from './Button';
import { connect } from "react-redux";

const Auth0LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const alpha = localStorage.getItem('alpha');
  
  return alpha && alpha === "true" ? <Button  onClick={() => loginWithRedirect()}>Log In</Button> : null;
};

export default connect()(Auth0LoginButton);

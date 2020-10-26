import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from './Button';
import { connect } from "react-redux";

const Auth0LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button  onClick={() => loginWithRedirect()}>Log In / Sign Up</Button>
};

export default connect()(Auth0LoginButton);

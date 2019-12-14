import React from 'react';
import { connect } from "react-redux";
import { setAccessToken } from "./redux/actions";
import api from './services/api';

class LoginButton extends React.Component{

  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(googleUser) {
    console.log('signed in', googleUser.getBasicProfile().getEmail());
    api
      .loginWithGoogle(googleUser.getAuthResponse(true).id_token)
      .then((response) => {
        this.props.setAccessToken(response.data.token);
      })
      .catch((error) => {
        //TODO handle failure
        console.log(error);
      });
  }

  renderGoogleLoginButton() {
    console.log('renderGoogleLoginButton');
      window.gapi.load('auth2', () =>{
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          this.auth2 = window.gapi.auth2.init({
            client_id: '50551686024-dfc0mvniq1fb3eslnp0n65m5o5ofe69s.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
          });
          this.attachSignin(document.getElementById('customBtn'));
      });
    
  }
    
    attachSignin(element) 
    {
      if(element) {
        this.auth2.attachClickHandler(element, {},
          (googleUser) => this.onSignIn(googleUser), (error) => {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      }
    }

    componentDidMount()
    {
      this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
      this.renderGoogleLoginButton();
    }

    render() {
      return (
        <button onClick={(event) => event.preventDefault()} id="customBtn">Sign in with Google</button>
      );
    }
};
export default connect(null, {setAccessToken})(LoginButton);

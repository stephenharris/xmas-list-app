import React from 'react';
import axios from 'axios';

import { connect } from "react-redux";
import { setAccessToken } from "./redux/actions";

class LoginButton extends React.Component{

    constructor(props) {
      super(props);
      console.log(props);
      //this.state = { counter: 0 };
      this.onSignIn = this.onSignIn.bind(this);
    }

    onSignIn(googleUser) {
        console.log('signed in', googleUser.getBasicProfile().getEmail());
        axios.post(
            'https://r70a0wupc9.execute-api.eu-west-2.amazonaws.com/testing/login',
                {
                strategy: 'google',
                token: googleUser.getAuthResponse(true).id_token
                }
            )
            .then((response) => {
              console.log(response);
              console.log(response.data.token);
              this.props.setAccessToken(response.data.token);
            })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function () {
            // always executed
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
        this.auth2.attachClickHandler(element, {},
            (googleUser) => this.onSignIn(googleUser), function(error) {
              alert(JSON.stringify(error, undefined, 2));
            });
    }

    componentDidMount()
    {
        this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
        //window.addEventListener('google-loaded',this.renderGoogleLoginButton);
        //if(window.gapi) {
          this.renderGoogleLoginButton();
        //}
    }

    render() {
        return (
            <button onClick={(event) => event.preventDefault()} id="customBtn">Sign in with Google</button>
        );
    }

};
export default connect(null, {setAccessToken})(LoginButton);

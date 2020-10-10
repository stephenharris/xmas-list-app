import React, { useState }  from 'react';
import api from './services/api';
import Button from './Button';
import Input from './Input';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import './LoginWithEmailForm.css';

function LoginWithEmailForm({location}) {

  const [state, setState] = useState("initial");

  const sendEmailConfirmationLink = (event) => {
    event.preventDefault();
    setState("sending");
    api
      .sendConfirmationEmail(event.target.email.value, location.pathname)
      .then(() => {
          setState("sent");
      })
      .catch(function (error) {
          console.log("error sending email");
          console.log(error);
          setState("failed");
      });
  }

  return (
    <form className="loginWithEmailForm" onSubmit={sendEmailConfirmationLink}>
        {state !== 'sent' && <>
            <Input label="Your email" type="email" name="email"/>    
            <Button type="submit" 
            className={classNames({
              "button--green": true,
              "button--disabled": state==="sending"
            })}
            disabled={state==="sending"}>{state==="sending" ? "Sending email..." : "Sign-in"}</Button>
            {state === "failed" && <p className="loginWithEmailForm__errorMessage">Oops! Something went wrong. Please try again</p>}
        </>}
        {state === 'sent' && <p className="loginWithEmailForm__successMessage">Email sent! Click the link in the email to login</p>}
    </form>
  );
}

export default withRouter(LoginWithEmailForm);
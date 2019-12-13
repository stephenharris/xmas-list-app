import React, { useState, useEffect }  from 'react';
import queryString from 'query-string'
import { connect } from "react-redux";
import axios from 'axios';
import Santa from './Santa';
import { setAccessToken } from "./redux/actions";
import './SignUp.css';
import {Redirect} from "react-router-dom";
  

function LoginWithEmail({match, location, setAccessToken}) {

    const token = match.params.token;
    const [status, setStatus] = useState('loading');

    const values = queryString.parse(location.search);
    const redirect = values.redirect || '/';

    console.log("redirect==========>", redirect);

    useEffect(() => {
      axios.post(
        'https://r70a0wupc9.execute-api.eu-west-2.amazonaws.com/testing/login/',
        {
            'strategy':'email',
            'token': token
        }
        )
        .then(function (response) {
          // handle success
          setStatus('success');
          setAccessToken(response.data.token);
        })
      .catch(function (error) {
        setStatus('failed');
        console.log(error);
      });
    }, []);
      
  return (
    <div>
      <h1>Confirming email...</h1>

      <div className="signUpContainer">
        <Santa/>
        {status === 'loading' && <p>Sigining in...</p>}
        {status === 'failed' && <p>Token failed.</p>}
        {status === 'success' &&  <Redirect to={redirect}/>}
      </div>
    </div>
  );
}

export default connect(null, {setAccessToken})(LoginWithEmail);
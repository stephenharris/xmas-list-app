import React, {useState} from 'react';
import './App.css';
import SignUp from './SignUp';
import OtherListView from './OtherListView';
import MyListView from './MyListView';
import NotFound from './NotFound';
import LoginToViewList from './LoginToViewList';
import Elf from './Elf';
import LoginWithEmail from './LoginWithEmail';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import { connect } from "react-redux";
import { isLoggedIn, getLoggedInUser } from "./redux/selectors";
import { setAccessToken } from "./redux/actions";

const mapStateToProps = state => {
  const isUserLoggedIn = isLoggedIn(state);
  const loggedInUser = getLoggedInUser(state);
  return { isUserLoggedIn, loggedInUser };
};


function App({isUserLoggedIn, loggedInUser, setAccessToken}) {

  const [redirectHome, setRedirectHome] = useState(false);

  const logOut = (event) => {
    event.preventDefault();
    setAccessToken(null);
    setRedirectHome(true);
  }

  return (
    <Router>
      {redirectHome && <Redirect to="/"/>}

     {isUserLoggedIn && <div className="appbar">
      <Elf/>
      <nav>
        <ul>
          <li><Link to="/">My list</Link></li>
          <li><a href="#" onClick={logOut}>Log-out</a></li>
        </ul>
      </nav>
    </div>}

    <Switch>
      <Route path="/list/:listId" component={isUserLoggedIn ? OtherListView : LoginToViewList}>
      </Route>
      <Route exact path="/">
        {isUserLoggedIn ?  <MyListView /> :  <SignUp />}
      </Route>
      <Route path="/login/:token" component={LoginWithEmail}/>
      <Route component={NotFound} />
    </Switch>

  </Router>
  );
}


export default connect(mapStateToProps, {setAccessToken})(App);
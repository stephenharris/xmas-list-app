import React, {useState} from 'react';
import './App.css';
import SignUp from './SignUp';
import OtherListView from './OtherListView';
import MyListView from './MyListView';
import FavouritesView from './FavouritesView';
import NotFound from './NotFound';
import LoginToViewList from './LoginToViewList';
import Elf from './Elf';
import LoginWithEmail from './LoginWithEmail';
import Button from './Button';
import { useAuth0 } from "@auth0/auth0-react";

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
  const { logout, isAuthenticated } = useAuth0();
  const alpha = localStorage.getItem('alpha');

  const onClickLogOut = (event) => {
    event.preventDefault();
    setAccessToken(null);

    logout({ returnTo: "https://xmas.c7e.uk/" })
    setRedirectHome(true);
  }

  return (
    <Router>
      {redirectHome && <Redirect to="/"/>}

     {(isUserLoggedIn || (isAuthenticated && alpha === 'true') ) && <div className="appbar">
      <Elf/>
      <nav>
        <ul>
          <li><Link to="/">My list</Link></li>
          <li><Link to="/favourites">My favourites</Link></li>
          <li><Button variants={["link"]} onClick={onClickLogOut}>Log-out</Button></li>
        </ul>
      </nav>
    </div>}

    <Switch>
      <Route path="/list/:listId" component={isUserLoggedIn ? OtherListView : LoginToViewList}>
      </Route>
      <Route exact path="/">
        {isUserLoggedIn ?  <MyListView /> :  <SignUp />}
      </Route>
      <Route exact path="/favourites">
        {isUserLoggedIn ?  <FavouritesView /> :  <SignUp />}
      </Route>

      <Route path="/login/:token" component={LoginWithEmail}/>
      <Route component={NotFound} />
    </Switch>

  </Router>
  );
}


export default connect(mapStateToProps, {setAccessToken})(App);
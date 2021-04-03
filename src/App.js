import React, {useState, useEffect} from 'react';
import './App.css';
import SignUp from './SignUp';
import OtherListView from './OtherListView';
import MyListsView from './MyListsView';
import MyListView from './MyListView';
import FavouritesView from './FavouritesView';
import NotFound from './NotFound';
import LoginToViewList from './LoginToViewList';
import Elf from './Elf';
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


function App({isUserLoggedIn, setAccessToken}) {

  const [redirectHome, setRedirectHome] = useState(false);
  const { logout, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const onClickLogOut = (event) => {
    event.preventDefault();
    setAccessToken(null);

    logout({ returnTo: `${location.host}/` })
    setRedirectHome(true);
  }

  useEffect(() => {
    const getUserMetadata = async () => {
      console.log("getUserMetadata called");
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `wishlist-api`,
          scope: "*",
        });
        console.log(accessToken);
        if (accessToken) {
          setAccessToken(accessToken);
        }
      } catch (e) {
        console.log("login error");
        console.log(e.message);
      }
    };
  
    console.log("getUserMetadata()");
    getUserMetadata();
  }, [getAccessTokenSilently, setAccessToken]);

  return (
    <Router>
      {redirectHome && <Redirect to="/"/>}

     {(isUserLoggedIn || isAuthenticated ) && <div className="appbar">
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
      <Route path="/list/:listId" component={isUserLoggedIn ? OtherListView : LoginToViewList}></Route>
      <Route path="/mine/:listId" component={isUserLoggedIn ? MyListView : SignUp}></Route>
      <Route exact path="/">
        {isUserLoggedIn ?  <MyListsView /> :  <SignUp />}
      </Route>
      <Route exact path="/favourites">
        {isUserLoggedIn ?  <FavouritesView /> :  <SignUp />}
      </Route>

      <Route component={NotFound} />
    </Switch>

  </Router>
  );
}


export default connect(mapStateToProps, {setAccessToken})(App);
import React, { useState, useEffect } from 'react';
import api from './services/api';
import { connect } from "react-redux";
import Loading from './Loading';
import './MyListView.scss';

import {
    Link,
  } from "react-router-dom";
  
function FavouritesView() {
        
  const [favourites, setFavourites] = useState([]);
  const [state, setState] = useState("initial");

  useEffect(() => {
    setState("loading");
    api
      .getMyFavourites()
      .then((response) => {
        setFavourites(response.data.lists);
        setState("success");
      })
      .catch(function (error) {
        //TODO handle error state
        setState("error");
        console.log(error.response);
      });
  }, []);

  return (
    <div>

      <h1>Your saved lists</h1>

      {state === "loading" && !favourites.length && <Loading/>}

      {state === "success" && favourites && favourites.length === 0 && <>
        <p className="empty-wishlist">Your have no saved lists.</p>
      </> }

      {favourites && favourites.length > 0 &&<>
        <div className="list">
          <ol>
            {favourites.map((favourite) => {
              return (<li key={favourite.uuid} id={favourite.uuid}>
                <span>
                    <Link to={`/list/${favourite.uuid}`}>{favourite.name}</Link>
                </span>
              </li>);
            })}
          </ol>
        </div>
        </>
      }

      
    </div>
  );
}

export default connect()(FavouritesView);


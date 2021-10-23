import React, { useState, useEffect } from 'react';
import api from './services/api';
import { connect } from "react-redux";
import Loading from './Loading';
import './MyListView.scss';
import classNames from './class-names';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import FavouriteButton from './FavouriteButton';
import Linkify from 'react-linkify';

function OtherListView({match}) {
        
  const [items, setItems] = useState([]);
  const [name, setName] = useState(null);
  const listId = match.params.listId;
  const [state, setState] = useState("initial");
  const [listLastChanged, setListLastChanged] = useState((new Date()).getTime());
  const [isFavourite, setIsFavourite] = useState(null);
  
  useEffect(() => {
    setState("loading");
    api
      .getList(listId)
      .then((response) => {
        setItems(response.data.items);
        setName(response.data.name);
        setState("success");
      })
      .catch(function (error) {
        if(error.response.status === 403) {
          setItems([]);
          setName(null);
          setState("forbidden");
        
        } else if(error.response.status === 404) {
          setState("notfound");
        
        } else {
          //TODO handle error state
          setState("error");
        }
        console.log(error.response);
      });
  }, [listLastChanged, listId]);

  useEffect(() => {
    api
      .getMyFavourites()
      .then((response) => {
        let isFavourite = response.data.lists && response.data.lists.some((list) => list.uuid === listId);
        setIsFavourite(isFavourite);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }, [listId]);

  const markAsBought = (itemUuid) => {
    api
      .markAsBought(listId, itemUuid)
      .then(function (response) {
        setListLastChanged((new Date()).getTime());
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  const unMarkAsBought = (itemUuid) => {
    api
      .unmarkAsBought(listId, itemUuid)
      .then(function (response) {
        setListLastChanged((new Date()).getTime());
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }


  const onClickToggleMark = (event, item) => {
    event.preventDefault();
    if(item.boughtBy === null) {
      markAsBought(item.id);
    } else if( item.boughtBy === 'you') {
      unMarkAsBought(item.id);
    }
  } 

  const onClickToggleFavourite = (event, item) => {
    event.preventDefault();
    if(isFavourite) {
      setIsFavourite(false);
      api.removeListFromFavourites(listId).then();
    } else {
      setIsFavourite(true);
      api.addListToFavourites(listId).then();
    }
  } 

  return (
    <div>

      {state === "loading" && !items.length && <Loading/>}

      {state === "notfound" && <NotFound/>}

      {state === "forbidden" && <Forbidden/>}

      {state === "success" && <h1>{name}{isFavourite !== null && <FavouriteButton onClick={onClickToggleFavourite} isFavourite={isFavourite}/>}</h1>}

      {state === "success" && items && items.length === 0 && <>
        <p className="empty-wishlist">Your wish list is empty.</p>
      </> }

      {items && items.length > 0 &&<>
        <div className="list">
          <ol>
            {items.map((item) => {
              return (<li key={item.id} id={item.id}>
                <span>
                  <span className={classNames({'item-description--bought': item.boughtBy !== null, 'item-description': true})}>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key}>{decoratedText}</a>
                      )}>{item.description}</Linkify>
                  </span>
                  <label className='mark'>
                    <input type="checkbox" disabled={item.boughtBy === 'someonelse'} checked={item.boughtBy} value={item.id} onChange={(event) => onClickToggleMark(event, item)}/>
                    {item.boughtBy === 'you' ?  "You've said you're getting this item" : (item.boughtBy === 'someoneelse' ? 'Someone else is getting this' : 'Get this item')}
                  </label>
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

export default connect()(OtherListView);


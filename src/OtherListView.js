import React, { useState, useEffect } from 'react';
import api from './services/api';
import { connect } from "react-redux";
import { getAccessToken, isLoggedIn } from "./redux/selectors";
import Tree from './Tree';
import './MyListView.css';
import { setAccessToken } from './redux/actions';
import classNames from './class-names';
import NotFound from './NotFound';
import Forbidden from './Forbidden';


const mapStateToProps = state => {
  const accessToken = getAccessToken(state);
  const isUserLoggedIn = isLoggedIn(state);
  return { accessToken, isUserLoggedIn };

};

function OtherListView({accessToken, match}) {
        
  const [items, setItems] = useState([]);
  const [name, setName] = useState(null);
  const listId = match.params.listId;
  const [state, setState] = useState("initial");
  const [listLastChanged, setListLastChanged] = useState((new Date()).getTime());
  
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
  }, [listLastChanged]);

  const markAsBought = (itemUuid) => {
    api
      .markAsBought(listId, itemUuid)
      .then(function (response) {
        // handle success
        console.log(response.data);
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
        // handle success
        console.log(response.data);
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

  return (
    <div>

      {state === "notfound" && <NotFound/>}

      {state === "forbidden" && <Forbidden/>}

      {name && <h1>{name}'s List</h1>}

      {state === "loading" && !items.length && <p>Loading...</p>}

      {state === "success" && items && items.length === 0 && <>
        <Tree/>
        <p className="empty-wishlist">Your wish list is empty.</p>
      </> }

      {items && items.length > 0 &&<>
        <div className="list">
          <ol>
            {items.map((item) => {
              return (<li key={item.id} id={item.id}>
                <span>
                  <span className={classNames({'item-description--bought': item.boughtBy !== null, 'item-description': true})}>{item.description}</span>
                  <label className='mark'>
                    <input type="checkbox" disabled={item.boughtBy === 'someonelse'} checked={item.boughtBy} value={item.id} onChange={(event) => onClickToggleMark(event, item)}/>
                    {item.boughtBy === 'you' ?  "You've said you're getting this item" : (item.boughtBy === 'someonelse' ? 'Someone else is getting this' : 'Get this item')}
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

export default connect(mapStateToProps, {setAccessToken})(OtherListView);


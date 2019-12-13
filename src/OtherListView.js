import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { getAccessToken, isLoggedIn } from "./redux/selectors";
import Tree from './Tree';
import './MyListView.css';
import { setAccessToken } from './redux/actions';

const mapStateToProps = state => {
  const accessToken = getAccessToken(state);
  const isUserLoggedIn = isLoggedIn(state);
  return { accessToken, isUserLoggedIn };

};

function OtherListView({accessToken, match}) {
        
  const [items, setItems] = useState([]);
  const listId = match.params.listId;
  const [isLoading, setLoading] = useState(false);
  const [listLastChanged, setListLastChanged] = useState((new Date()).getTime());
  
  useEffect(() => {
    setLoading(true);
    axios.get(
      `https://r70a0wupc9.execute-api.eu-west-2.amazonaws.com/testing/list-item/${listId}/`,
      { headers: {"Authorization" : `Bearer ${accessToken}`} }
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setItems(response.data.items);
        //setListId(response.data.listId);
        setLoading(false);
        //setTransactions(response.data.transactions.filter((transaction) => transaction.include_in_spending));
      })
    .catch(function (error) {
      // handle error
      //if(response.b)

      if(error.response.data.status === 403) {
        setAccessToken(null)
      }
      setLoading(false);
      console.log(error.response);
      
    });
  }, [listLastChanged]);

  const markAsBought = (itemUuid) => {
    axios.post(
      `https://r70a0wupc9.execute-api.eu-west-2.amazonaws.com/testing/mark-item/${listId}/${itemUuid}`,
      {},
      { headers: {"Authorization" : `Bearer ${accessToken}`} }
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setListLastChanged((new Date()).getTime());
      })
    .catch(function (error) {
      // handle error
      //if(response.b)

      setLoading(false);
      console.log(error);
      console.log(error.response);
      console.log(error.response.data.code)
      
    }); 
  }

  const unMarkAsBought = (itemUuid) => {
    axios.delete(
      `https://r70a0wupc9.execute-api.eu-west-2.amazonaws.com/testing/mark-item/${listId}/${itemUuid}`,
      { headers: {"Authorization" : `Bearer ${accessToken}`} }
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setListLastChanged((new Date()).getTime());
      })
    .catch(function (error) {
      // handle error
      //if(response.b)

      setLoading(false);
      console.log(error);
      console.log(error.response);
      console.log(error.response.data.code)
      
    }); 
  }


  const onClickToggleMark = (event, item) => {
    console.log(event.target.value);
    console.log(event.target.checked);
    //console.log(event);
    event.preventDefault();
    //return;
    if(item.boughtBy === null) {
      markAsBought(item.id);
    } else if( item.boughtBy === 'you') {
      unMarkAsBought(item.id);
    }
  } 

  return (
    <div>
      <h1>Someone's List</h1>

      {items && items.length === 0 && <>
        <Tree/>
        <p className="empty-wishlist">Your wish list is empty.</p>
      </> }

      {items && items.length > 0 &&<>
        <div className="list">
          <ol>
            {items.map((item) => {
              return (<li key={item.id} id={item.id}>
                <span>
                  <span className="item-description">{item.description}</span>
                  <label className="mark">
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


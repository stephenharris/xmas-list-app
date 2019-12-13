import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { getAccessToken, isLoggedIn } from "./redux/selectors";
import Tree from './Tree';
import './MyListView.css';
import Button from './Button';
import Input from './Input';

const mapStateToProps = state => {
  const accessToken = getAccessToken(state);
  const isUserLoggedIn = isLoggedIn(state);
  return { accessToken, isUserLoggedIn };

};

function MyListView({accessToken, isUserLoggedIn}) {
        
  const [items, setItems] = useState(false);
  const [listId, setListId] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [listLastChanged, setListLastChanged] = useState((new Date()).getTime());
  const [isCopied, setIsCopied] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios.get(
      'https://r70a0wupc9.execute-api.eu-west-2.amazonaws.com/testing/list-item/mine/',
      { headers: {"Authorization" : `Bearer ${accessToken}`} }
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setItems(response.data.items);
        setListId(response.data.listId);
        setLoading(false);
        //setTransactions(response.data.transactions.filter((transaction) => transaction.include_in_spending));
      })
    .catch(function (error) {
      // handle error
      //if(response.b)

      setLoading(false);
      console.log(error);
      console.log(error.response);
      console.log(error.response.data.code)
      
    });
  }, [listLastChanged]);

  const addItem = (description) => {
    axios.post(
      'https://r70a0wupc9.execute-api.eu-west-2.amazonaws.com/testing/list-item/',
      {
       "description": description 
      },
      { headers: {"Authorization" : `Bearer ${accessToken}`} }
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setListLastChanged((new Date()).getTime());
        //setList(response.data);
        //setLoading(false);
        //setTransactions(response.data.transactions.filter((transaction) => transaction.include_in_spending));
      })
    .catch(function (error) {
      // handle error
      //if(response.b)

      //setLoading(false);
      console.log(error);
      console.log(error.response);
      console.log(error.response.data.code)
      
    }); 
  }

  const deleteItem = (itemId) => {
    axios.delete(
      'https://r70a0wupc9.execute-api.eu-west-2.amazonaws.com/testing/list-item/'+itemId,
      { headers: {"Authorization" : `Bearer ${accessToken}`} }
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setListLastChanged((new Date()).getTime());
        //setList(response.data);
        //setLoading(false);
        //setTransactions(response.data.transactions.filter((transaction) => transaction.include_in_spending));
      })
    .catch(function (error) {
      // handle error
      //if(response.b)

      //setLoading(false);
      console.log(error);
      console.log(error.response);
      console.log(error.response.data.code)
      
    }); 
  }


  const onClickRemove = (event, itemId) => {
    event.preventDefault();
    deleteItem(itemId);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    addItem(event.target.description.value);
    event.target.description.value = '';
  }

  const copyToClipboard = (event) => {
    event.preventDefault();
    console.log(ref);

    ref.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    event.target.focus();
    setIsCopied(true);
    console.log('copied?');

  }

  const listUrl = `http://localhost:3000/list/${listId}`;
  const ref = React.createRef();
  return (
    <div>
      <h1>My Christmas List</h1>
       
      {items && items.length === 0 && <>
        <Tree/>
        <p className="empty-wishlist">Your wish list is empty.</p>
      </> }

      {items && items.length > 0 &&<>

        {listId && 
        <div className="share-list">
          <p style={{
            "fontWeight": "bold",
            "marginTop": 0
          }}>Share your list</p>
          <div className="copy-list-url">
              
              <span className="list-url">{listUrl}</span>

            {document.queryCommandSupported('copy') && <button onClick={copyToClipboard} style={{"width":"150px", "textAlign":"left"}}className="secondary green small">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                <rect width="14" height="14" x="3" y="3" rx="2" style={{"fill":"#499f68"}}></rect>
                  <rect width="14" height="14" x="7" y="7"  rx="2" style={{"fill":"hsl(141.6, 52.1%, 66.5%)"}}></rect>
                </svg>

                {!isCopied ? 'Copy to clipboard' : 'Copied!'}

              <textarea
                style={{"width":"1px", "height":"1px", "background":"none", "border":"none",
                "left": "-10px",
                "overflow": "hidden",
                "position": "absolute"}}
                tabIndex="-1"
                ref={ref}
                defaultValue={listUrl}
              />
            </button>
            }
          </div>
        </div>
        }
      

        <div className="list">
          <ol>
            {items.map((item) => {
              return (<li key={item.id} id={item.id}>
                <span>
                  <span className="item-description">{item.description}</span> 
                  <button className="secondary small red"  style={{"marginLeft":"20px"}} onClick={(ev)=>onClickRemove(ev, item.id)}>Remove</button>
                </span>
              </li>);
            })}
          </ol>
        </div>
        </>
      }

      <form className="add-item" onSubmit={onSubmit}>
        <Input style={{"margin":"auto"}} name="description" label="Item"/>
        <Button className="primary" style={{"margin":"auto", "marginTop":"20px"}} type="submit">Add something to your wish list</Button>
      </form>

    </div>
  );
}

export default connect(mapStateToProps)(MyListView);


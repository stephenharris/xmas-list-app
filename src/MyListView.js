import React, { useState, useEffect } from 'react';
import api from './services/api';
import Loading from './Loading';
import './MyListView.scss';
import Button from './Button';
import Input from './Input';
import Linkify from 'react-linkify';
import { useHistory } from "react-router-dom";

function MyListView({match}) {

  const listId = match.params.listId;
  let history = useHistory();
        
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [items, setItems] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [listLastChanged, setListLastChanged] = useState((new Date()).getTime());
  const [isCopied, setIsCopied] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    api
      .getMyList(listId)
      .then(function (response) {
        setItems(response.data.items);
        setName(response.data.name);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }, [listId, listLastChanged]);

  const addItem = (description) => {
    api
      .addToMyList(listId, description)
      .then(function (response) {
        setListLastChanged((new Date()).getTime());
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  const onSaveName = (event) => {
    event.preventDefault();
    setEditing(false);
    setName(event.target.name.value)
    api
    .updateMyList(listId, event.target.name.value)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  const onCancelEdit = (event) => {
    event.preventDefault();
    setEditing(false);
  }

  const deleteItem = (itemId) => {
    api
      .removeFromMyList(listId, itemId)
      .then((response) => {
        setListLastChanged((new Date()).getTime());
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  const onClickRemove = (event, itemId) => {
    event.preventDefault();
    deleteItem(itemId);
  }

  const onClickDeleteList = (event) => {
    event.preventDefault();
    api
      .deleteList(listId)
      .then((response) => {
        console.log(response);
        history.push('/')
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  const onSubmit = (event) => {
    event.preventDefault();
    addItem(event.target.description.value);
    event.target.description.value = '';
  }

  const copyToClipboard = (event) => {
    event.preventDefault();
    ref.current.select();
    document.execCommand('copy');
    event.target.focus();
    setIsCopied(true);
  }
  
  let url = window.location.href.replace(/\/mine\/.+$/, "");
  const listUrl = `${url}/list/${listId}`;
  const ref = React.createRef();
  return (
    <div>
      {!editing && <>
        <h1>
          {name}
          <Button variants={["primary", "small"]} onClick={() => setEditing(true)} type="submit">Edit list name</Button>
        </h1>
      </>}

      {editing && <form className="add-item" onSubmit={onSaveName}>
        <Input style={{"margin":"auto"}} name="name" label="List name" onChange={(event) => setName(event.value)} value={name}/>
        <div className="editTitleButtons">
          <Button variants={["secondary", "small"]} onClick={onCancelEdit}>Cancel</Button>
          <Button variants={["primary", "small"]} type="submit">Save</Button>
        </div>
      </form>}

      {isLoading && !listId && <Loading/>}

      {!isLoading && items && items.length === 0 && <>
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

            {document.queryCommandSupported('copy') && <Button onClick={copyToClipboard} style={{"width":"175px", "textAlign":"left"}} variants={["secondary", "green", "small"]}>
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
            </Button>
            }
          </div>
        </div>
        }
      

        <div className="list">
          <ol>
            {items.map((item) => {
              return (<li key={item.id} id={item.id}>
                <span>
                  <span className="item-description">
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key}>{decoratedText}</a>
                      )}>{item.description}</Linkify>
                  </span>
                  <Button variants={["secondary", "small", "red"]}  style={{"marginLeft":"20px"}} onClick={(ev)=>onClickRemove(ev, item.id)}>Remove</Button>
                </span>
              </li>);
            })}
          </ol>
        </div>
        </>
      }

      {!isLoading && <form className="add-item" onSubmit={onSubmit}>
        <Input style={{"margin":"auto"}} name="description" label="Item"/>
        <Button className="primary" style={{"margin":"auto", "marginBottom":"20px", "marginTop":"20px"}} type="submit">Add something to your wish list</Button>
      </form>}


      {!isLoading && items && items.length === 0 && <>
        <Button variants={["secondary", "small", "red"]}  style={{"marginLeft":"20px"}} onClick={(ev)=>onClickDeleteList(ev)}>Delete list</Button>
      </> }
      

    </div>
  );
}

export default MyListView;
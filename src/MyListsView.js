import React, { useState, useEffect } from 'react';
import api from './services/api';
import Loading from './Loading';
import './MyListView.scss';
import Button from './Button';
import Input from './Input';
import EditIcon from './EditIcon';
import { Link } from "react-router-dom";

function MyListsView({location}) {
        
  const [lists, setLists] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [listLastChanged, setListLastChanged] = useState((new Date()).getTime());

  useEffect(() => {
    setLoading(true);
    api
      .getMyLists()
      .then(function (response) {
        setLists(response.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
        console.log(response);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }, [listLastChanged]);

  const onSubmit = (event) => {
    event.preventDefault();
    api
      .createList(event.target.name.value)
      .then(function (response) {
        setListLastChanged((new Date()).getTime());
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  return (
    <div>

      <h1>My lists</h1>
      
      {isLoading && <Loading/>}

      {!isLoading && lists.length === 0 && <>
        <p className="empty-wishlist">You have no lists.</p>
      </> }

      {lists && lists.length > 0 &&<>
        <div className="list">
          <ol>
            {lists.map((list) => {
              return (<li key={list.id} id={list.id}>
                {list.name}
                <Link to={`/mine/${list.id}`} style={{float:"right", marginLeft:"1em"}}>
                  <EditIcon></EditIcon>
                </Link>
               </li>);
            })}
          </ol>
        </div>
        </>
      }

      {!isLoading && <form className="add-item" onSubmit={onSubmit}>
        <Input style={{"margin":"auto"}} name="name" label="List name"/>
        <Button className="primary" style={{"margin":"auto", "marginBottom":"20px", "marginTop":"20px"}} type="submit">Create new list</Button>
      </form>}
    </div>
  );
}

export default MyListsView;
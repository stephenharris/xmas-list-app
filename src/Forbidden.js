import React from 'react';
import SantaList from './SantaList';
import { Link } from "react-router-dom";


function Forbidden() {



  return (
    <div className="page">
      <h1>That's you on the naughty list...</h1>
      <SantaList/>
      <p style={{"fontSize":"24px", "color":"#fd4848"}}>You're not allowed to view your own list. <Link to="/">Edit your list here</Link>.</p>
    </div>
  );
}


export default Forbidden;
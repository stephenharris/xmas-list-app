import React from 'react';
import SantaList from './SantaList';
import { Link } from "react-router-dom";


function Forbidden() {



  return (
    <div className="page">
      { process.env.REACT_APP_THEME ==='xmas' ? 
      (<>
        <h1>That's you on the naughty list...</h1>
        <SantaList/>
      </>) : 
      (<>
        <h1>Ooops...</h1>
      </>)
      }
      <p style={{"textAlign":"center", "fontSize":"24px", "color":"#fd4848"}}>You're not allowed to view your own list. <Link to="/">Edit your list here</Link>.</p>
    </div>
  );
}


export default Forbidden;
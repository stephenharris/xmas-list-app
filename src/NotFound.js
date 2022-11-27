import React from 'react';
import SantaStuckInChimney from './SantaStuckInChimney';

function NotFound() {



  return (
    <div className="page">
      { process.env.REACT_APP_THEME ==='xmas' ? <h1>Ho! Ho! ...Oh</h1> : <h1>Page not found</h1> } 
      { process.env.REACT_APP_THEME ==='xmas' && <SantaStuckInChimney/>}
      <p style={{"textAlign":"center", "fontSize":"24px", "color":"#fd4848"}}>Sorry that page could not be found</p>
    </div>
  );
}


export default NotFound;
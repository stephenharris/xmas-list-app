import React from 'react';
import SantaStuckInChimney from './SantaStuckInChimney';

function NotFound() {



  return (
    <div className="page">
      <h1>Ho! Ho! ...Oh</h1>
      <SantaStuckInChimney/>
      <p style={{"textAlign":"center", "fontSize":"24px", "color":"#fd4848"}}>Sorry that page could not be found</p>
    </div>
  );
}


export default NotFound;
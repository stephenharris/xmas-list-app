import React from 'react';
import './Tree.css';

function App() {
  return (
    <div className="container">
      <div className="star star-light"></div>
      <div className="tree">
        <div className="base"> </div>
        <div className="layer">
        <div className="line"> </div>
        <div className="bauble one"></div>
        </div>
        <div className="layer two">
        <div className="line two"> </div>
        <div className="bauble two"></div>
        <div className="bauble bauble-red six"></div>
        </div>
        <div className="layer three">
        <div className="line three"></div>
        <div className="bauble three"></div>
        <div className="bauble bauble-red five"></div>
        </div>
        <div className="layer four">
        <div className="bauble four"></div>
        <div className="star two star-light"></div>
        <div className="line four"> </div>
        </div>
      </div>
    </div>
  );
}

export default App;
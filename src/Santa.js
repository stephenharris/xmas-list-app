import React from 'react';
import './Santa.css';

function Santa() {

  return (
    <div id="wavingSanta" className="santa">
      <div className="hat"></div>
      <div className="head">
        <div className="face"></div>
        <div className="eye"></div>
        <div className="eye right"></div>
        <div className="nose"></div>
      </div>
      <div className="body">
        <div className="hand left"></div>
        <div className="hand"></div>
        <div className="belt"></div>
        <div className="shoes"></div>
      </div>
    </div>
  );
}

export default Santa;
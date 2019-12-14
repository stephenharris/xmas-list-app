import React from 'react';
import './Loading.css';

function Loading() {

  return (
    <div id="loading">
        <div className="ball-wrapper">
            <div className="ring"></div>
            <div className="button"></div>
            <div className="red-ball"></div>
        </div>
        <div className="ball-wrapper">
            <div className="ring"></div>
            <div className="button"></div>
            <div className="green-ball"></div>
        </div> 
        <div className="ball-wrapper">
            <div className="ring"></div>
            <div className="button"></div>
            <div className="red-ball"></div>
        </div> 
        <div className="ball-wrapper">
            <div className="ring"></div>
            <div className="button"></div>
            <div className="green-ball"></div>
        </div>
    </div>
  );
}

export default Loading;
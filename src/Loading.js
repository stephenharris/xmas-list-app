import React from 'react';
import './Loading.css';

function Loading() {

  return (
    <div id="loading">
        <div class="ball-wrapper">
            <div class="ring"></div>
            <div class="button"></div>
            <div class="red-ball"></div>
        </div>
        <div class="ball-wrapper">
            <div class="ring"></div>
            <div class="button"></div>
            <div class="green-ball"></div>
        </div> 
        <div class="ball-wrapper">
            <div class="ring"></div>
            <div class="button"></div>
            <div class="red-ball"></div>
        </div> 
        <div class="ball-wrapper">
            <div class="ring"></div>
            <div class="button"></div>
            <div class="green-ball"></div>
        </div>
    </div>
  );
}

export default Loading;
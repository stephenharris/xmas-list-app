import React from 'react';
import './FavouriteButton.css';
import classNames from './class-names';

function FavouriteButton(props) {
  let isFavourite = props.isFavourite;
  return (
    <button className={classNames({
        "favouriteButton": true,
        "favouriteButton--higlighted": isFavourite
    })
    }onClick={props.onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path id="svg_1" d="m4.81732,15.13008a1.30696,1.30696 0 0 1 -1.89509,-1.37231l0.61427,-3.60721l-2.61392,-2.54857a1.30696,1.30696 0 0 1 0.71883,-2.22183l3.62028,-0.52278l1.60756,-3.28047a1.30696,1.30696 0 0 1 2.35253,0l1.60756,3.2674l3.62028,0.52278a1.30696,1.30696 0 0 1 0.71883,2.2349l-2.61392,2.54857l0.61427,3.60721a1.30696,1.30696 0 0 1 -1.89509,1.37231l-3.22819,-1.69905l-3.22819,1.69905z"/>
        </svg>
    </button>
  );
}

export default FavouriteButton;


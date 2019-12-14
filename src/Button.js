import React from 'react';
import './Button.css';

function Button(props) {

  let variants = props.variants ? props.variants : ['primary'];
  const className = ['button'].concat(variants.map((variant) => {return 'button--' + variant})).join(' ');
  return (
    <button {...props} className={className}>{props.children}</button>
  );
}

export default Button;


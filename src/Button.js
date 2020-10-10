import React from 'react';
import './Button.css';
import classNames from 'classnames';

function Button(props) {

  let variants = props.variants ? props.variants : ['primary'];
  const className = ['button'].concat(variants.map((variant) => {return 'button--' + variant})).join(' ');

  return (
    <button {...props} 
    className={classNames({
      "button": true,
      ["button--" + variant]: true,
      "button--disabled": props.disabled,
    })}
    >{props.children}</button>
  );
}

export default Button;


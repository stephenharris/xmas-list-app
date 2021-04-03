import React from 'react';
import './Button.scss';
import classNames from 'classnames';

function Button(props) {

  let variants = props.variants ? props.variants : ['primary'];

  return (
    <button {...props} 
    className={classNames(variants.reduce((classes, variant) => {
      classes["button--" + variant] = true;
      return classes;
    }, {
      "button": true,
      "button--disabled": props.disabled,
    }))}
    >{props.children}</button>
  );
}

export default Button;


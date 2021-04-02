import React from 'react';
import './Button.css';
import classNames from 'classnames';
import { Link } from "react-router-dom";
function ButtonLink(props) {

  let variants = props.variants ? props.variants : ['primary'];

  return (
    <Link {...props} 
    className={classNames(variants.reduce((classes, variant) => {
      classes["button--" + variant] = true;
      return classes;
    }, {
      "button": true,
      "button--disabled": props.disabled,
    }))}
    >{props.children}</Link>
  );
}

export default ButtonLink;


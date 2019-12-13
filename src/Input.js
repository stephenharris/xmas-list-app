import React, {useState} from "react";
import './Input.css';

const Input = ({ label, ...props }) => {
   const [hasValue, setHasValue] = useState((props.defaultValue && props.defaultValue !== '') || (props.value && props.value !== ''));
   const onChange = (ev) => {
      setHasValue(ev.target.value !== '');
      if (props.onChange) {
        props.onChange(ev);
      }
   }

   props.type = props.type ? props.type : 'text';
   
   return <label>
       <input {...props} onChange={onChange} className={hasValue ? 'hasValue' : ''} />
       <span>{label}</span>
    </label> ;
}

export default Input;

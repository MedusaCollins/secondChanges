import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faAddressCard, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Input = (props) => {
  return (
    <div className="relative container mx-auto">
      <input type={props.type} placeholder={props.text} value={props.value} onChange={props.onChange}
        className="w-full px-4 py-2 text-base rounded-xl outline-none bg-gray-300 focus:bg-white focus:ring-green-500 focus:ring-2 transition"/>
        <span className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'>
        {props.text==="Username"&&<FontAwesomeIcon icon={faAddressCard} className="w-4 h-4"/>}
        {props.text==="Email"&&<FontAwesomeIcon icon={faEnvelope} className="w-4 h-4"/>}
        </span>
      {props.togglePasswordVisibility&&(
        <button type="button" className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onMouseUp={props.togglePasswordVisibility}>
        <FontAwesomeIcon icon={props.formState.showPassword ? faEyeSlash : faEye} className="w-4 h-4"/>
      </button>
        )}
    </div>
  );
}

export default Input;

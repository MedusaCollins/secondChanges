import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const FilterTemplate = ({ name, openTab }) => {

  return (
    <div className='items-center flex gap-1 mx-2'>
      <span className='font-semibold text-slate-400' style={openTab===name? {color:'#1E293B'}: null}>{name}</span>
      <FontAwesomeIcon icon={faChevronDown} className='h-[0.6rem] font-bold text-slate-600' />
    </div>
  );
}

export default FilterTemplate;

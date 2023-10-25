import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const FilterTemplate = ({ name, openDiv }) => {

  return (
    <div className='items-center flex gap-1 mx-2 group'>
      <span className={`font-semibold text-slate-400 group-hover:text-slate-500 dark:text-[#909396] dark:group-hover:text-slate-200 ${openDiv===name? 'text-slate-500 dark:text-slate-200' : 'text-slate-400 dark:text-[#909396]'}`}>{name}</span>
      <FontAwesomeIcon icon={faChevronDown} className={`h-[0.6rem] font-bold text-slate-400 group-hover:text-slate-700 dark:group-hover:text-[#ced4da] ${openDiv===name? 'text-slate-500 dark:text-slate-200' : 'text-slate-400 dark:text-[#909396]'}`} />
    </div>
  );
}

export default FilterTemplate;

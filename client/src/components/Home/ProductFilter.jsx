import React, { useState } from 'react';
import FilterTemplate from '../templates/FilterTemplate';
import DetailFilter from './DetailFilter.jsx'

const Filter = () => {
  const [openDiv, setOpenDiv] = useState('');

  const toggleDiv = (divName) => {
    if (openDiv === divName) {
      setOpenDiv('');
    } else {
      setOpenDiv(divName);
    }
  };

  return (
    <>
      {/* <div className='w-full p-3 flex bg-slate-100 dark:bg-[#343a40] rounded-lg'>
        <div className='hidden sm:flex'>
        <button onClick={() => toggleDiv('Price')}>
          <FilterTemplate name="Price" openDiv={openDiv}/>
        </button>
        <button onClick={() => toggleDiv('Size')}>
          <FilterTemplate name="Size" openDiv={openDiv}/>
        </button>
        <button onClick={() => toggleDiv('Sale')}>
          <FilterTemplate name="Sale" openDiv={openDiv}/>
        </button>
        <button onClick={() => toggleDiv('Product Type')}>
          <FilterTemplate name="Product Type" openDiv={openDiv}/>
        </button>
        </div>
        <div className='sm:hidden flex'>
          <button onClick={() => toggleDiv('Filter')}>
            <FilterTemplate name="Filter" openDiv={openDiv}/>
          </button>
        </div>
      </div>

      <DetailFilter openDiv={openDiv}/> */}
    </>
  );
};

export default Filter;

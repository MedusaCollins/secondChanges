import React, { useState } from 'react';
import FilterTemplate from '../templates/FilterTemplate';
import DetailFilter from './DetailFilter.jsx'

const Filter = () => {
  const [openDiv, setOpenDiv] = useState(''); // State, hangi div açık olduğunu takip eder

  const toggleDiv = (divName) => {
    // Eğer tıklanan div zaten açıksa, kapat
    if (openDiv === divName) {
      setOpenDiv('');
    } else {
      // Değilse, tıklanan div'i aç
      setOpenDiv(divName);
    }
  };

  return (
    <>
      <div className='w-full p-3 flex bg-slate-100 rounded-lg'>
        <div className='hidden sm:flex'>
        <button onClick={() => toggleDiv('Price')}>
          <FilterTemplate name="Price"/>
        </button>
        <button onClick={() => toggleDiv('Size')}>
          <FilterTemplate name="Size" />
        </button>
        <button onClick={() => toggleDiv('Sale')}>
          <FilterTemplate name="Sale" />
        </button>
        <button onClick={() => toggleDiv('ProductType')}>
          <FilterTemplate name="Product Type" />
        </button>
        </div>
        <div className='sm:hidden flex'>
          <button onClick={() => toggleDiv('MoreFilter')}>
            <FilterTemplate name="Filter" />
          </button>
        </div>
      </div>

      <DetailFilter openDiv={openDiv}/>
    </>
  );
};

export default Filter;

import React from 'react';
import Filter from '../components/Filter.jsx';
import Promo from '../components/Promo.jsx';
import Products from '../components/Products.jsx';
const Woman = () => {
  return (
    <div className='p-5 mx-24 gap-4'>
      <h1 className='text-xl font-semibold'>Women <span className='text-gray-300'>(123)</span></h1>
      <div className='my-5'><Filter/></div>
      <div className='my-5'><Promo/></div>
      <Products/>
    </div>
  )
}

export default Woman
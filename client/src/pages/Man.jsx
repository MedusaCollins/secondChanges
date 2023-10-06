import {React, useState} from 'react';
import Filter from '../components/Filter.jsx';
import Promo from '../components/Promo.jsx';
import Products from '../components/Products.jsx';
const Man = () => {
  const [products] = useState([]);
  const [filters] = useState({
    gender: 'Man',
  });
  return (
    <div className='p-5 mx-24 gap-4'>
      <h1 className='text-xl font-semibold'>Man <span className='text-gray-300'>({products.length})</span></h1>
      <div className='my-5'><Filter/></div>
      <div className='my-5'><Promo/></div>
      <Products filter={filters}/>
    </div>
  )
}

export default Man
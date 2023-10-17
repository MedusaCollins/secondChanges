import {React, useEffect, useState} from 'react';
import Filter from '../components/ProductFilter.jsx';
import Promo from '../components/Promo.jsx';
import Products from '../components/Products.jsx';
import axios from 'axios';

const ShowProducts = (props) => {
    const [products, setProducts] = useState([]);
    const filters = props.filter;
    useEffect(() => {
      axios.post(`${process.env.REACT_APP_DB}/api/products`, filters)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.error(error));
    }, [filters]);
    return (
      <div className='p-5 mx-24 gap-4'>
        <h1 className='text-xl font-semibold'>{props.name} <span className='text-gray-300'>({products.length})</span></h1>
        <div className='my-5'><Filter/></div>
        <div className='my-5'><Promo/></div>
        <Products filter={filters} user={props.user} handleLogin={props.handleLogin}/>
      </div>
    )
  }
export default ShowProducts
import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Filter from '../components/Home/ProductFilter.jsx';
import Promo from '../components/Home/Promo.jsx';
import Products from '../components/Home/Products.jsx';
import axios from 'axios';


const SearchPage = (props) => {
    const [products, setProducts] = useState([]);
    const searchFor = useParams();
    useEffect(() => {
      axios.post(`${process.env.REACT_APP_DB}/api/products`, searchFor)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.error(error));
    }, [searchFor]);
    return (
      <div className='p-5 mx-24 gap-4'>
        <h1 className='text-xl font-semibold'>Searching for "<span  className='text-green-500'>{searchFor.name}</span>" <span className='text-gray-300'>({products.length})</span></h1>
        <div className='my-5'><Filter/></div>
        <div className='my-5'><Promo/></div>
        <Products filter={searchFor} user={props.user} handleLogin={props.handleLogin}/>
      </div>
    )
  }
export default SearchPage
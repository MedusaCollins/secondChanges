import {React, useEffect, useState} from 'react';
import ProductTemplate from '../components/templates/ProductTemplate.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LikesPage = (props) => {
    const [products, setProducts] = useState([]);
    const userName = useParams();
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_DB}/likes/${userName.userName}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.error(error));
    }, [props, userName]);
    if(products.length<1){
      return(
        <div className='p-5 text-center text-2xl'>
          <p>This user hasn't liked any products.</p>
        </div>
      )
    }
    return (
      <div className='p-5 sm:mx-24 mx-2 gap-5 flex flex-col'>
        <h1 className='text-xl font-semibold'>{userName.userName} likes <span className='text-green-500'>{products.length}</span> products.</h1>
        
        <div className='flex flex-wrap items-start justify-center gap-5'>
      {products.map((product) => (
        <ProductTemplate
        product={product}
        key={product._id}
        user={props.user}
        pUser={props.user}
        handleLogin={props.handleLogin}
      />
      ))}
    </div>

      </div>
    )
  }
export default LikesPage
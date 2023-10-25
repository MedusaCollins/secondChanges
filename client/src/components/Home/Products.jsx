import React, { useState, useEffect } from 'react';
import ProductTemplate from '../templates/ProductTemplate.jsx';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const Products = ({ filter, setIsModalOpen, handleLogin, user }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_DB}/api/products`, filter)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, [filter]);
  return (
    <div className='flex flex-wrap items-start justify-center gap-5'>
      {products.map((product) => (
        <ProductTemplate
          key={product._id}
          name={product.name}
          id={product._id}
          size={product.size}
          brand={product.brand}
          price={product.price}
          dprice={product.dprice}
          img={product.img[0]}
          likes={product.likes}
          user={user}
          handleLogin={handleLogin}
        />
      ))}
      {setIsModalOpen?
      (
        <button onClick={()=> setIsModalOpen(true)} className={`rounded-xl sm:w-[18rem] w-[14rem] h-[20rem] bg-cover bg-center relative bg-gray-600 hover:bg-gray-800 dark:bg-[#343a40] dark:hover:bg-[#24282c] hover:text-white transition cursor-pointer hover:border hover:border-separate border-slate-500 dark:border-[#495057] flex flex-col justify-center items-center`}>
        <div className='relative'>
          <FontAwesomeIcon icon={faFolder} className="w-16 h-16 text-green-500 " />
          <p className="text-xl">Add Product</p>
        </div>
      </button>
      ):null}
    </div>
  );
}

export default Products;

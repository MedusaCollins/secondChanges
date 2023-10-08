import { React, useState, useEffect } from 'react';
import ProductTemplate from './templates/ProductTemplate.jsx';
import axios from 'axios';

const Products = ({filter}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_DB}/api/products`, filter)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, [filter]);

  return (
    <div className='flex gap-5'>
      {products.map((product) => (
        <ProductTemplate
          key={product._id}
          name={product.name}
          id={product._id}
          size={product.size}
          brand={product.brand}
          price={product.price}
          img={product.img[0]}
        />
      ))}
    </div>
  );
}

export default Products;

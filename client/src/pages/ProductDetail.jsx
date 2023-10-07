import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Locator from '../components/Locator';
import Carousel from '../components/Carousel';
import About from '../components/About';
export default function ProductDetail(){
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DB}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [productId]);
  if (loading && !product) {
    return <div>Waiting for product...</div>;
  }


  return (
<div className='mx-24'>
  <Locator product={product} />
    <div className="flex justify-between pt-11">
      <Carousel slides={product.img} />
      <About product={product}/>
    </div>
  </div>
  );
};
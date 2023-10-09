import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Locator from '../components/Locator';
import Carousel from '../components/Carousel';
import About from '../components/About';
import Comments from '../components/Comments';
export default function ProductDetail(){
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams()
  const [rating, setRating] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DB}/products/${productId}`)
      .then((response) => {
        setProduct(response.data.product);
        setSeller(response.data.seller);
        setLoading(false);
        const ratings = response.data.product.seller.reviews.map(review => review.rating);
          if (ratings.length > 0) {
            const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
            const averageRating = totalRating / ratings.length;
            setRating(averageRating.toFixed(1))
          } else {
            console.log('Henüz hiç rating yok.');
          }
      })
      .catch((error) => console.error(error));
      

  }, [productId]);
  if (loading && !product) {
    return <div>Waiting for product...</div>;
  }
  return (
  <div className='mx-auto max-w-[1200px]'>
    <Locator product={product} />
    <div className="flex flex-col justify-between pt-11">
      <div className='flex justify-between mb-12 px-5'>
        <Carousel slides={product.img} />
        <About product={product} rating={rating}/>
      </div>
        
      <div className='border-t-2 p-5'>
        <Comments product={product} seller={seller}/>
      </div>
    </div>
  </div>
  );
};
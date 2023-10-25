import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Carousel from '../components/ProductDetail/Carousel';
import About from '../components/ProductDetail/About';
import Comments from '../components/ProductDetail/Comments';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

export default function ProductDetail({user}){
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams()
  const [rating, setRating] = useState();
  const [comments, setComments] = useState([]);

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
      

  }, [productId, comments]);
  if (loading && !product) {
    return (
<div className="absolute bottom-[40%] left-0 right-0 items-center justify-center px-6">
    <div className="flex flex-col items-center">
        <p className="text-6xl font-semibold text-green-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
    </div>
</div>
  )}

  return (
  <div className='mx-auto max-w-[1200px]'>

    <div className='text-slate-700 dark:text-gray-400 text-lg font-medium m-5 sm:block hidden'>
        <span className='underline underline-offset-2'>Home</span>
        <span className='text-slate-700 dark:text-slate-400 mx-3'>/</span>
        <span className='underline underline-offset-2'>{product.gender}</span>
        <span className='text-slate-700 dark:text-slate-400 mx-3'>/</span>
        <span className='underline underline-offset-2'>{product.type}</span>
        <span className='text-slate-700 dark:text-slate-400 mx-3'>/</span>
        <span className='text-slate-500 dark:text-gray-300'>{product.name}</span> 
    </div>

    <div className="flex flex-col justify-between pt-11">
      <div className='flex lg:flex-row flex-col gap-5 justify-between mb-12 px-5'>
        <Carousel slides={product.img} />
        <About product={product} rating={rating} user={user} comments={comments} setComments={setComments}/>
      </div>
      {"buyers" in product?(
      <div className='flex flex-col gap-5 m-5 sm:m-0'>
        <div className='flex gap-3 mb-16 border dark:border-[#495057] p-5 rounded-xl'>
          <img src={product.buyers._id.img} alt="comment user profile pic" className='w-12 h-12 mt-2 rounded-full'/>
          <div className='flex flex-col'>
            <span className='font-semibold text-xl'>{product.buyers._id.username}</span>
            <div>
               {[...Array(5)].map((_, index) => (
               <FontAwesomeIcon key={index} icon={product.buyers.rating >= index + 1 ? solidStar : regularStar} className='w-min text-orange-500'/>
               ))}
              <span className='text-lg flex mt-2'>{product.buyers.comment}</span>
            </div>
          </div>
        </div>
      </div>
      ):null}
      <div className='border-t-2 dark:border-[#495057] p-5'>
        <Comments product={product} seller={seller} user={user} comment={comments}/>
      </div>
    </div>
  </div>
  );
};
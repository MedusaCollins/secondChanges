import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Locator from '../components/Locator';
import Carousel from '../components/Carousel';
import About from '../components/About';
import Comments from '../components/Comments';

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
        console.log(response.data.product)
        setProduct(response.data.product);
        setSeller(response.data.seller);
        console.log(response.data.product)
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
    return <div>Waiting for product...</div>;
  }
  return (
  <div className='mx-auto max-w-[1200px]'>
    <Locator product={product} />
    <div className="flex flex-col justify-between pt-11">
      <div className='flex justify-between mb-12 px-5'>
        <Carousel slides={product.img} />
        <About product={product} rating={rating} user={user} comments={comments} setComments={setComments}/>
      </div>
      {"buyers" in product?(
      <div className='flex flex-col gap-5'>
            <div className='flex gap-3 mb-16 border p-5 rounded-xl'>
                <img src={product.buyers._id.img} alt="comment user profile pic" className='w-12 h-12 mt-2 rounded-full'/>
                <div className='flex flex-col'>
                  <span className='font-semibold text-xl'>{product.buyers._id.username}</span>
                  <div>
                             {[...Array(5)].map((_, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={product.buyers.rating >= index + 1 ? solidStar : regularStar}
                                className='w-min text-orange-500'
                              />
                            ))}
                  <span className='text-lg flex mt-2'>{product.buyers.comment}</span>
                    </div>
                  </div>
                  </div>
            </div>
      ):null}
      <div className='border-t-2 p-5'>
        <Comments product={product} seller={seller} user={user} comment={comments}/>
      </div>
    </div>
  </div>
  );
};
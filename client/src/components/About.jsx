import React, { useState, useEffect } from 'react'
import ProductAbout from './templates/ProductAbout.jsx'
import ProductPrice from './templates/ProductPrice.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

const About = ({product}) => {
  const [rating, setRating] = useState();

  useEffect(()=>{

    const ratings = product.seller.reviews.map(review => review.rating);
    if (ratings.length > 0) {
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      setRating(averageRating.toFixed(1))
    } else {
      console.log('Henüz hiç rating yok.');
    }
  }, [product.seller.reviews])
  return (
    <div className='w-1/2 text-xl'>
      <div className='flex justify-between mr-12'>
        <div>
          <h1 className='mb-5 text-2xl font-semibold'>{product.name}</h1>
          <ProductAbout text="Usability" value={product.usability}/>
          <ProductAbout text="Type" value={product.type}/>
          <ProductAbout text="Gender" value={product.gender}/>
          <ProductAbout text="Size" value={product.size}/>
          <ProductAbout text="Brand" value={product.brand}/>
        </div>

        <div className='flex flex-col rounded-xl border  p-5'>
          <div className='m-auto'>
          <img src={product.seller.img} alt="seller" className='w-16 h-16 rounded-full mb-1'/>
          {product.seller.username}
          </div>
          <div className='p-2'>
            <FontAwesomeIcon icon={faStar} className='text-orange-500 text-left'/> {rating}<span className='text-gray-500'>/5 ({product.seller.reviews.length} reviews)</span>
          </div>
        </div>

      </div>
        <p className='text-base my-10'>{product.description}</p>
        <ProductPrice price={product.price} dprice={product.dprice}/>
        <div className='text-xl font-semibold'>
          <button className='rounded-lg border border-green-600 text-green-600 p-2 mr-5 w-32'>Teklif ver</button> <button className='rounded-lg border border-green-600 bg-green-600 text-white p-2 mr-5 w-32'>Satın al</button>
        </div>
    </div>
  )
}

export default About
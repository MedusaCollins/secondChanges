import React from 'react'
import ProductAbout from './templates/ProductAbout.jsx'
import ProductPrice from './templates/ProductPrice.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const About = ({product, rating}) => {

  return (
    <div className='w-1/2 text-xl'>
      <div className='flex justify-between'>
        <div>
          <h1 className='mb-5 text-2xl font-semibold'>{product.name}</h1>
          <ProductAbout text="Usability" value={product.usability}/>
          <ProductAbout text="Type" value={product.type}/>
          <ProductAbout text="Gender" value={product.gender}/>
          <ProductAbout text="Size" value={product.size}/>
          <ProductAbout text="Brand" value={product.brand}/>
        </div>

        <div className='flex flex-col rounded-xl border p-5 min-w-[200px]'>
          <div className='m-auto'>
          <img src={product.seller.img} alt="seller" className='w-16 h-16 rounded-full mb-1 border mx-auto border-gray-300'/>
          {product.seller.username}
          </div>
          <div className='p-2 text-center'>
            {product.seller.reviews.length>=1?(
              <>
              <FontAwesomeIcon icon={solidStar} className='text-orange-500 text-left'/> {rating}<span className='text-gray-500'>/5 ({product.seller.reviews.length} reviews)</span>
              </>
            ):<span className='text-gray-500'>{product.seller.reviews.length} reviews</span>}
          </div>
        </div>

      </div>
        <p className='text-base my-10'>{product.description}</p>
        <ProductPrice price={product.price} dprice={product.dprice}/>
        <div className='flex flex-col text-xl gap-5 mt-16 font-semibold'>
          {"buyers" in product?(
              <div className='rounded-lg border border-gray-600 bg-gray-600 text-center text-white p-2 '>Satıldı</div>
          ):(
            <>
            <button className='rounded-lg border border-green-600 bg-green-600 text-white p-2 '>Satın al</button>
            <div className='w-full justify-between flex'>
              <button className='rounded-lg border border-blue-400 text-blue-400 p-2 w-[45%]'>Yorum Yap</button>
              <button className='rounded-lg border border-green-600 text-green-600 p-2 w-[45%]'>Teklif ver</button> 
            </div>
            </>
          )}
          </div>
    </div>
  )
}

export default About
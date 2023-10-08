import React from 'react'
import ProductAbout from './templates/ProductAbout.jsx'
import ProductPrice from './templates/ProductPrice.jsx'

const About = ({product}) => {
  console.log(product)
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
        <div>
          Satıcı Bilgileri(seller.name, seller.review, seller.image)
        </div>
      </div>
        <p className='text-base my-10'>{product.description}</p>
        <ProductPrice price={product.price} dprice={product.dprice}/>
        <div className='text-xl font-semibold'>
          <button className='rounded-lg border border-green-500 text-green-500 p-2 mr-5 w-32'>Teklif ver</button> <button className='rounded-lg border border-green-500 bg-green-500 text-white p-2 mr-5 w-32'>Satın al</button>
        </div>
    </div>
  )
}

export default About
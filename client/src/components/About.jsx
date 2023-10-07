import React from 'react'

const About = ({product}) => {
    console.log(product)
  return (
    <div className='bg-gray-100 w-1/2'>
        <h1 className='text-xl font-bold'>{product.name}</h1>
        <p className=''>{product.description}</p>
    </div>
  )
}

export default About
import React from 'react'

const ProductAbout = ({text,value}) => {
  return (
    <p className=' mb-1'>{text}: <span className='text-slate-500'>{value}</span></p>
  )
}

export default ProductAbout
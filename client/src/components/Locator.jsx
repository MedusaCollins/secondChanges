import React from 'react'

const Locator = ({product}) => {
  return (
    <div className='text-slate-700 text-lg font-medium my-5'>
        <span className='underline underline-offset-2'>Home</span>
        <span className='text-slate-700 mx-3'>/</span>
        <span className='underline underline-offset-2'>{product.gender}</span>
        <span className='text-slate-700 mx-3'>/</span>
        <span className='underline underline-offset-2'>{product.type}</span>
        <span className='text-slate-700 mx-3'>/</span>
        <span className='text-slate-500'>{product.name}</span> 
    </div>
  )
}

export default Locator
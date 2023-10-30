import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

const Promo = () => {
  return (
    <div className='w-full bg-[#D2B6A0] p-5 rounded-lg text-white'>
        <FontAwesomeIcon icon={faCertificate} className='text-sm'/> <span className='text-sm'>Promo</span>
        <h1 className='font-semibold text-3xl'>Super Discount Days Are Here!</h1>
        <p>It's the perfect time to grab your favorite items at fantastic discounts.<br/>In our new campaign, you can find many products at discounted prices. Don't miss out on the latest deals!</p>
    </div>
  )
}

export default Promo
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

const Promo = () => {
  return (
    <div className='w-full bg-[#D2B6A0] p-5 rounded-lg text-white'>
        <FontAwesomeIcon icon={faCertificate} className='text-sm'/> <span className='text-sm'>Promo</span>
        <h1 className='font-semibold text-3xl'>Get 25% Cash Back <br/>On %200</h1>
        <p>Shopping is a bit of a relaxing hobby for me, which is<br/>sometimes troubling for the bank balance.</p>
    </div>
  )
}

export default Promo
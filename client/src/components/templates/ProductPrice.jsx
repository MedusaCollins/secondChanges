import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

const ProductPrice = ({price,dprice}) => {
  return (
    <div className="relative inline-flex items-center rounded-xl p-2 mb-5">
    {dprice!==""?<>
      <span className="text-3xl font-semibold pr-2">
        <FontAwesomeIcon icon={faDollarSign} className='text-3xl' />
        {dprice},00
      </span>
      <span className="text-red-500 text-xl rounded-md px-2 line-through align-bottom">
        <FontAwesomeIcon icon={faDollarSign} className='text-xl' />
        {price},00
      </span>
      </>:
      <><span className="text-3xl font-semibold pr-2">
        <FontAwesomeIcon icon={faDollarSign} className='text-3xl' />
        {price},00
      </span>
      </>}
  </div>
  )
}

export default ProductPrice
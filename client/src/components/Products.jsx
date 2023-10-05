import React from 'react'
import ProductTemplate from './templates/ProductTemplate.jsx'

const Products = () => {
  return (
    <div className='flex gap-5'>
        <ProductTemplate name="Skipper Collar Rayon Blouse" star="5" review="123" price="100,00" img="https://dolap.dsmcdn.com/dlp_231003_1/product/org/kadin/bluz/s-36-h-m_1244524095.jpg"/>
    </div>
  )
}

export default Products
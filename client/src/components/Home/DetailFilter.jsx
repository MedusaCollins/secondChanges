import React from 'react'

const DetailFilter = ({openDiv}) => {
  return (
    <div>
        {openDiv === 'MoreFilter' && (
          <div>
            <p>Ekstra filtreler burada görüntülenebilir.</p>
          </div>
        )}
        {openDiv === 'Price' && (
          <div>
            <p>Price</p>
          </div>
        )}
        {openDiv === 'Size' && (
          <div>
            <p>Size</p>
          </div>
        )}
        {openDiv === 'Sale' && (
          <div>
            <p>Sale</p>
          </div>
        )}
        {openDiv === 'ProductType' && (
          <div>
            <p>ProductType</p>
          </div>
        )}
      </div>
  )
}

export default DetailFilter
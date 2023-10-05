import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductTemplate = ({ name, img, star, review, price }) => {
  const maxTextLength = 19; // İstediğiniz maksimum karakter uzunluğunu burada belirtin
  const [isHovered, setIsHovered] = useState(false);

  let displayName = name;
  let displayEllipsis = '';

  if (name.length > maxTextLength) {
    displayName = name.substring(0, maxTextLength);
    displayEllipsis = '...';
  }

  return (
    <div
      className={`rounded-xl w-[17rem] bg-[${img}] relative cursor-pointer hover:border hover:border-separate border-black`}
      onMouseEnter={() => setIsHovered(true)} // Hover başladığında
      onMouseLeave={() => setIsHovered(false)} // Hover sona erdiğinde
    >
      <img src={img} alt="" className='rounded-xl' />
      <div className='absolute top-0 right-0 m-5 p-2 w-8 h-8 bg-white rounded-full'>
        <FontAwesomeIcon icon={faHeart} className='text-slate-700 transform -translate-y-[0.15rem]' />
      </div>
      <div className="absolute bottom-0 left-0 right-0 m-5 p-3 flex flex-col bg-white text-slate-700 font-semibold rounded-lg">
        <h2 className="text-xl">
          {displayName}
          <span className="text-gray-500">{displayEllipsis}</span>
        </h2>
        <p>
          <FontAwesomeIcon icon={faStar} color='orange' /> {star}{' '}
          <span className='text-gray-500'>({review} reviews)</span>
        </p>
        <p className="">${price}</p>
        {isHovered && ( // Hoverlandığında görünmesi gereken buton
          <button className='bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600'>
            <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductTemplate;

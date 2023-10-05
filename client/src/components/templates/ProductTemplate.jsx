import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductTemplate = ({ name, img, star, review, price }) => {
  const maxTextLength = 19;
  const [isHovered, setIsHovered] = useState(false);

  let displayName = name;

  if (name.length > maxTextLength) {
    displayName = name.substring(0, maxTextLength) + '...';
  }

  return (
    <div
      className={`rounded-xl w-[18rem] h-[20rem] mx-auto bg-cover bg-center relative cursor-pointer hover:border hover:border-separate border-slate-500`}
      style={{ backgroundImage: `url(${img})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='absolute top-0 right-0 m-5 p-2 w-8 h-8 bg-white rounded-full'>
        <FontAwesomeIcon icon={faHeart} className='text-slate-700 transform -translate-y-[0.15rem]' />
      </div>
      <div className="absolute bottom-0 left-0 right-0 m-5 p-3 flex flex-col bg-white text-slate-700 font-semibold rounded-lg">
        <h2 className="text-xl">
          {displayName}
        </h2>
        <p>
          <FontAwesomeIcon icon={faStar} color='orange' /> {star}{' '}
          <span className='text-gray-500'>({review} reviews)</span>
        </p>
        <p className="">${price}</p>
        {isHovered && (
          <button className='bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600'>
            <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductTemplate;

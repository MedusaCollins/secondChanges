import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductTemplate = ({ name, img, brand, review, price, id, size }) => {
  const maxTextLength = 19;
  const [isHovered, setIsHovered] = useState(false);
  const [variable, setVariable] = useState({
    isHoverable: false,
    color: '#334155'
  });
  let displayName = name;

  if (name.length > maxTextLength) {
    displayName = name.substring(0, maxTextLength) + '...';
  }

  const handleHeartClick = (e) => {
    e.preventDefault();
    setVariable({ color: '#22c55e' });
  };

  const handleCartClick = (e) => {
    e.preventDefault();
  };
  return (
    <Link
      key={id} // Burada "key" prop'u eklenmiş
      className={`rounded-xl w-[18rem] h-[20rem] mx-auto bg-cover bg-center relative cursor-pointer hover:border hover:border-separate border-slate-500`}
      style={{ backgroundImage: `url(${img})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={`/products/${id}`}
    >
      <div role="button" tabIndex={0} className='absolute top-0 right-0 m-5 p-2 w-8 h-8 bg-white hover:bg-gray-100 rounded-full'>
        <div onClick={handleHeartClick}>
          <FontAwesomeIcon icon={faHeart} className='text-slate-700 transform -translate-y-[0.15rem]' style={{ color: variable.color }} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 m-5 p-3 flex flex-col bg-white text-slate-700 font-semibold rounded-lg">
        <h2 className="text-xl">
          {displayName}
        </h2>
        <p className='text-gray-500 text-l'>{brand}{' '}(<span className='text-slate-400'>{size}</span>)</p>
        <p className="">${price}</p>
        {isHovered && (
          <div role="button" tabIndex={0} href="#" onClick={handleCartClick} className='mx-auto mt-2'>
            <button className='bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600'>
              <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductTemplate;

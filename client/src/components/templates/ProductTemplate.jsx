import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Popup from '../Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductTemplate = ({ name, img, brand, price, id, size, user, handleLogin }) => {
  const maxTextLength = 19;
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [variable, setVariable] = useState({
    isHoverable: false,
    color: '#334155'
  });

  useEffect(()=>{
    if (user.favoriteProducts && id) {
    if(user.favoriteProducts.includes(id)){
      setVariable({color: '#22c55e'});
    }
  }else{
    setVariable({color: '#334155'});
  }
  }, [user.favoriteProducts, id])


  let displayName = name;

  async function handleHeartClick(e) {
    e.preventDefault();
    if(user._id){
      setVariable((prevState) => ({
        ...prevState,
        color: prevState.color === '#22c55e' ? '#334155' : '#22c55e',
      }));
      if(variable.color!=="#22c55e"){
        await axios.post(`${process.env.REACT_APP_DB}/like`, {productId: id, userId: user._id, reqType: 1})
      }else{
        await axios.post(`${process.env.REACT_APP_DB}/like`, {productId: id, userId: user._id, reqType: 0})
      }
    }else{
      setPopupOpen(true);
    }
  }
  
  const handleCartClick = (e) => {
    e.preventDefault();
  };


  const closePopup = () => {
    setPopupOpen(false);
  };


  if (name.length > maxTextLength) {
    displayName = name.substring(0, maxTextLength) + '...';
  }
  return (
    <>
    <Link
      key={id}
      className={`rounded-xl w-[18rem] h-[20rem] bg-cover bg-center relative cursor-pointer hover:border hover:border-separate border-slate-500`}
      style={{ backgroundImage: `url(${img})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={`/products/${id}`}>
        
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
              <FontAwesomeIcon icon={faCartShopping} />Add to Cart
            </button>
          </div>
        )}
      </div>
    </Link>
    <Popup isOpen={isPopupOpen} onClose={closePopup} handleLogin={handleLogin} user={user}/>
    </>
  );
};

export default ProductTemplate;

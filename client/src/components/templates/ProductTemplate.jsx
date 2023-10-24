import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Popup from '../Global/Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link} from 'react-router-dom';
import { faHeart, faCartShopping, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const ProductTemplate = ({ name, img,likes, brand, price, id, size,dprice, user, handleLogin }) => {
  const maxTextLength = 19;
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [variable, setVariable] = useState({
    isHoverable: false,
    color: '#334155',
    cartItem: [],
  });


  useEffect(()=>{
    const cartItemJSON = localStorage.getItem("cart");
    if (cartItemJSON) {
      const parsedCartItem = JSON.parse(cartItemJSON);
      setVariable((prevState) => ({ ...prevState, cartItem: parsedCartItem }));
    }

    if(likes.includes(user._id)){
        setVariable((prevState)=>({...prevState, color:'#22c55e'}));
      }
    else{
      setVariable((prevState)=>({...prevState, color:'#334155'}));
    }

  }, [likes, user._id])

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
  function handleCartOperation(e,id,reqType) {
    e.preventDefault();
    setVariable((prevState)=>({...prevState, cartItem: prevState.cartItem+id}))
    const savedCartJSON= localStorage.getItem("cart");
    let updatedCart=[];
    if(savedCartJSON){
      try {
        updatedCart=JSON.parse(savedCartJSON);
      } catch (error) {
        console.log(error)
      }
    }
    if(reqType==="adding"){
      updatedCart.push(id)
    }else{
      updatedCart = updatedCart.filter(item => item !== id)
    }
    setVariable((prevState)=>({...prevState, cartItem: updatedCart}))
    const updatedCartJSON = JSON.stringify(updatedCart)
    localStorage.setItem("cart", updatedCartJSON)
  }


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
      className={`rounded-xl sm:w-[18rem] w-[14rem] h-[20rem] bg-cover bg-center relative cursor-pointer hover:border hover:border-separate border-slate-500`}
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
        <div className="relative justify-between inline-flex items-center rounded-xl p-2">
          {dprice!==""?<>
            <span className=" font-semibold pr-2">
              <FontAwesomeIcon icon={faDollarSign} />
              {dprice},00
            </span>
            <span className="text-red-500 px-2 line-through align-bottom">
              <FontAwesomeIcon icon={faDollarSign} />
              {price},00
            </span>
            </>:
            <><span className=" font-semibold pr-2">
              <FontAwesomeIcon icon={faDollarSign} />
              {price},00
            </span>
            </>}
        </div>
        {isHovered && (
          <div role="button" tabIndex={0} className="mx-auto mt-2">
              {variable.cartItem.includes(id)?(
                <>
                <button  onClick={(e)=> handleCartOperation(e,id,"removing")} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full">
                <FontAwesomeIcon icon={faCartShopping} /> Remove From the Cart
                </button>
                </>
              ):(
                <>
                <button onClick={(e)=> handleCartOperation(e,id,"adding")} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full ">
                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                </button>
                </>
              )}                
          </div>
        )}

      </div>
    </Link>
    <Popup isOpen={isPopupOpen} onClose={closePopup} handleLogin={handleLogin} user={user}/>
    </>
  );
};

export default ProductTemplate;

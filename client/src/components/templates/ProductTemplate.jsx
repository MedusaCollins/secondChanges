import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Popup from '../Global/Popup';
import EditProduct from '../Global/EditProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link} from 'react-router-dom';
import { faHeart, faCartShopping, faDollarSign, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

  const ProductTemplate = (props) => {
  const maxTextLength = 19;
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditOpen, setEditOpen]= useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [variable, setVariable] = useState({
    isHoverable: false,
    color: 'text-slate-700 dark:text-[#dee2e6]',
    cartItem: [],
  });





  useEffect(()=>{
    const cartItemJSON = localStorage.getItem("cart");
    if (cartItemJSON) {
      const parsedCartItem = JSON.parse(cartItemJSON);
      setVariable((prevState) => ({ ...prevState, cartItem: parsedCartItem }));
    }

    if(props.product.likes.includes(props.user._id)){
        setVariable((prevState)=>({...prevState, color:'text-green-500'}));
      }

  }, [props.product.likes, props.user._id])

  let displayName = props.product.name;

  async function handleHeartClick(e) {
    e.preventDefault();
    if(props.user._id){
      setVariable((prevState) => ({
        ...prevState,
        color: prevState.color === 'text-slate-700 dark:text-[#dee2e6]' ? 'text-green-500' : 'text-slate-700 dark:text-[#dee2e6]',
      }));
      if(variable.color!=="text-green-500"){
        await axios.post(`${process.env.REACT_APP_DB}/like`, {productId: props.product._id, userId: props.user._id, reqType: 1})
      }else{
        await axios.post(`${process.env.REACT_APP_DB}/like`, {productId: props.product._id, userId: props.user._id, reqType: 0})
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

  if (props.product.name.length > maxTextLength) {
    displayName = props.product.name.substring(0, maxTextLength) + '...';
  }
  return (
    <>
    <Link
      key={props.product._id}
      className={`rounded-xl sm:w-[18rem] w-[14rem] h-[20rem] bg-cover bg-center relative cursor-pointer hover:border hover:border-separate border-slate-500`}
      style={{ backgroundImage: `url(${props.product.img[0]})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={`/products/${props.product._id}`}>
        
      <div role="button" tabIndex={0} className='absolute top-0 right-0 m-5 p-2 w-8 h-8 bg-white dark:bg-[#212529] hover:bg-gray-100 rounded-full'>
        <div onClick={handleHeartClick}>
          <FontAwesomeIcon icon={faHeart} className={` ${variable.color} transform -translate-y-[0.15rem]`}/>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 m-5 p-3 flex flex-col bg-white dark:bg-[#212529] text-slate-700 dark:text-[#dee2e6] font-semibold rounded-lg">
        <h2 className="text-xl">
          {displayName}
        </h2>
        <p className='text-gray-500 dark:text-gray-400 text-l'>{props.product.brand}{' '}(<span className='text-slate-400 dark:text-slate-500'>{props.product.size}</span>)</p>
        <div className="relative justify-between inline-flex items-center rounded-xl p-2">
          {props.product.dprice!==""?<>
            <span className=" font-semibold pr-2">
              <FontAwesomeIcon icon={faDollarSign} />
              {props.product.dprice},00
            </span>
            <span className="text-red-500 px-2 line-through align-bottom">
              <FontAwesomeIcon icon={faDollarSign} />
              {props.product.price},00
            </span>
            </>:
            <><span className=" font-semibold pr-2">
              <FontAwesomeIcon icon={faDollarSign} />
              {props.product.price},00
            </span>
            </>}
        </div>
        {isHovered && (
          <div role="button" tabIndex={0} className="mx-auto mt-2">
            {props.product.seller===props.pUser._id?(
              <>
                <button onClick={(e)=> {e.preventDefault();setEditOpen(1)}} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
                <FontAwesomeIcon icon={faPenToSquare} /> Edit Product
                </button>
              </>
            ):
            (<>
              {"buyers" in props.product?(
                <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-full">
                  Sold Out
                </button>
              ):
              (<>              
                {variable.cartItem.includes(props.product._id)?(
                  <>
                  <button  onClick={(e)=> handleCartOperation(e,props.product._id,"removing")} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full">
                  <FontAwesomeIcon icon={faCartShopping} /> Remove From the Cart
                  </button>
                  </>
                ):(
                  <>
                  <button onClick={(e)=> handleCartOperation(e,props.product._id,"adding")} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full ">
                  <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                  </button>
                  </>
                )}  
              </>)}
            </>
            )}  

          </div>
        )}

      </div>
    </Link>
    <Popup isOpen={isPopupOpen} onClose={closePopup} handleLogin={props.handleLogin} user={props.user}/>
    {isEditOpen&&
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className='fixed inset-0 bg-black opacity-50' onClick={()=>setEditOpen(false)}></div>
        <div className="relative bg-white dark:bg-[#212529] w-96 rounded-lg p-4">

          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-[#dee2e6]">Edit Product</h2>
          <EditProduct isModalOpen={setEditOpen} product={props.product}/>
        </div>
      </div>}
    </>
  );
};
export default ProductTemplate;

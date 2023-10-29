import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCreditCard, faDollarSign, faTimes } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/templates/Input';
import Popup from '../components/Global/Popup';

const Cart = (props) => {
  const [errorMessage, setErrorMessage]=useState('')
  const [variable, setVariable] = useState({
    cartItem: [],
    taxEstimate: 8.32,
    shippingEstimate: 5.52,
    check:1,
    checkout:0,
    popUp:0
  });
  const [formState, setFormState]=useState({
    cardHolderName:'',
    cardNumber:'',
    expireYear:'',
    expireMonth:'',
    cvc:'',

    contactName:'',
    phoneNumber:'',
    city:'',
    country:'',
    address:'',
    state:'',
    zipCode:'',

    user: '',
  })



  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Shipping Detail",
    "Card Detail"
  ];



  useEffect(() => {
    const cartItemJSON = localStorage.getItem("cart");
    let updatedCart = [];

    if (cartItemJSON && variable.check) {
      setVariable((prevState)=>({...prevState, check:0}))
      const parsedCartItems = JSON.parse(cartItemJSON);
      const productPromises = parsedCartItems.map(productId =>
        axios.get(`${process.env.REACT_APP_DB}/products/${productId}`)
      );

      Promise.all(productPromises)
        .then(responses => {
          updatedCart = responses.map(response => response.data.product);
          setVariable(prevState => ({ ...prevState, cartItem: updatedCart }));
        })
        .catch(error => console.error(error));
    }
  }, [variable.check]);

  function handleCartOperation(id) {
    const savedCartJSON = localStorage.getItem("cart");
    let updatedCart = [];
    if (savedCartJSON) {
      updatedCart = JSON.parse(savedCartJSON);
      updatedCart = updatedCart.filter(item => item !== id);
      const updatedCartJSON = JSON.stringify(updatedCart);
      localStorage.setItem("cart", updatedCartJSON);

      // Ürün silindikten sonra state'i güncelle
      setVariable(prevState => ({ ...prevState, cartItem: updatedCart,check:1 }));
    }
  }

  function handleFormChange(e,type) {
    setFormState((prevState) => ({ ...prevState, [type]: e.target.value }));
  }


  function calculateTotalPrice(cartItems) {
    let totalPrice = 0;
    for (const product of cartItems) {
      totalPrice += product.dprice > 0 ? parseFloat(product.dprice) : parseFloat(product.price);
    }
    return totalPrice;
  }


  async function handlePayment(){
    // const response = await axios.post(`${process.env.REACT_APP_DB}/payment`, {
    //   cardHolderName:formState.cardHolderName,
    //   cardNumber: formState.cardNumber,
    //   expireYear: formState.expireYear,
    //   expireMonth: formState.expireMonth,
    //   cvc: formState.cvc,
  
    //   contactName: formState.contactName,
    //   phoneNumber: formState.phoneNumber,
    //   city: formState.city,
    //   country: formState.country,
    //   address: formState.address,
    //   state: formState.state,
    //   zipCode: formState.zipCode,
  
    //   user: props.user,
    //   cardItem: variable.cartItem
    // })
    // if(response.data.status==='failure'){
    //   setErrorMessage(response.data.errorMessage)
    // }else{
      const response2 = await axios.post(`${process.env.REACT_APP_DB}/paymentConfirm`, {
        cardItems: variable.cartItem,
        user: props.user
      })
      console.log(response2.data)
    // }
  }



  const checkRequiredFields = () => {
    switch (steps[currentStep]) {
      case "Shipping Adress":
        return true;
      case "Card Detail":
        return formState.cardHolderName && formState.cardNumber && formState.expireYear && formState.expireMonth && formState.cvc;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (checkRequiredFields()) {
      setErrorMessage("");
      setCurrentStep(currentStep + 1);
      setFormState(prevState => ({ ...prevState, user: props.user }));
    } else {
      setErrorMessage("Lütfen gerekli alanları doldurun.");
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = (stepTitle) => {
    switch (stepTitle) {
      case "Shipping Detail":
        return (
      <>
        <div className="text-black dark:text-[#dee2e6] text-center flex flex-col gap-5">
          <h1 className='text-2xl text-left'>Address</h1>
          <div className='flex gap-5'>
            <Input text="Full Name" type="text" value={formState.contactName} onChange={(e)=> handleFormChange(e,"contactName")} formState={formState} />
            <Input text="Phone Number" type="text" value={formState.phoneNumber} onChange={(e)=> handleFormChange(e,"phoneNumber")} formState={formState} />
          </div>

          <Input text="Address Line" type="text" value={formState.address} onChange={(e)=> handleFormChange(e,"address")} formState={formState} />
          
          <div className='flex gap-5'>
            <Input text="Country" type="text" value={formState.country} onChange={(e)=> handleFormChange(e,"country")} formState={formState} />
            <Input text="State" type="text" value={formState.state} onChange={(e)=> handleFormChange(e,"state")} formState={formState} />
          </div>

          <div className='flex gap-5'>
            <Input text="City" type="text" value={formState.city} onChange={(e)=> handleFormChange(e,"city")} formState={formState} />
            <Input text="Zip Code" type="text" value={formState.zipCode} onChange={(e)=> handleFormChange(e,"zipCode")} formState={formState} />
          </div>

        </div>
        <button
  type="submit"
  className='bg-green-600 hover:bg-green-700 text-white p-1.5 w-full rounded-2xl transition mt-4'
  onClick={() => handleNext()}>
        Next
      </button>
      </>);
      case "Card Detail":
        return (
          <>
        <div className="text-black dark:text-[#dee2e6] text-center flex flex-col gap-5">
          <div className='flex justify-between'>
            <div className='flex gap-x-2 mt-1'>
              <input type="radio" className='mb-1' defaultChecked/> <h1>Pay by debit / Credit Card</h1>
            </div>
            <div className='text-2xl text-slate-700'>
            <FontAwesomeIcon icon={faCreditCard}/>
            </div>
          </div>
          <Input text="Card Holder Name" type="text" value={formState.cardHolderName} onChange={(e)=> handleFormChange(e,"cardHolderName")} formState={formState} />
          <Input text="Card Number" type="text" value={formState.cardNumber} onChange={(e)=> handleFormChange(e,"cardNumber")} formState={formState} />
          <div className='flex gap-5'>
            <Input text="Expire Month" type="text" value={formState.expireMonth} onChange={(e)=> handleFormChange(e,"expireMonth")} formState={formState} />
            <Input text="Expire Year" type="text" value={formState.expireYear} onChange={(e)=> handleFormChange(e,"expireYear")} formState={formState} />
          </div>
          <Input text="CVC" type="text" value={formState.cvc} onChange={(e)=> handleFormChange(e,"cvc")} formState={formState} />
        </div>
          <p className='text-red-500 text-right my-2 mb-0'>{errorMessage}</p>
        <div className='flex gap-5'>
        <button
  type="submit"
  className='bg-red-600 hover:bg-red-700 text-white p-1.5 w-1/2 rounded-2xl transition mt-4'
  onClick={() => handlePrevious()}>
        back
      </button>
      <button
  type="submit"
  className='bg-green-600 hover:bg-green-700 text-white p-1.5 w-full rounded-2xl transition mt-4'
  onClick={() => handlePayment()}>
        Pay Now
      </button>
      </div>

      </>);
      default:
        return null;
    }
  };



  return (
    <div className="p-5 lg:mx-32 mx-5 gap-x-12 grid grid-cols-5">
      <div className="sm:text-4xl text-3xl font-bold my-5 py-10 col-span-5">
        <span>Shopping Cart</span>
      </div>
      {variable.cartItem.length>0?(<>
        <div className="border-t dark:border-[#495057] pt-5 lg:col-span-3 col-span-5">
        {variable.cartItem.map((product, i) => (
          <div key={i} className="relative flex sm:flex-row flex-col border-b dark:border-[#495057] p-5 gap-5">
            {product.img && product.img.length > 0 && (
              <img src={product.img[0]} alt="" className="w-32 h-44 mx-auto sm:mx-0" />
            )}
            <div className="flex flex-col sm:justify-normal justify-between">
              <span className="font-medium">{product.name}</span>

              <div className="sm:flex my-2 hidden">
                <span>{product.gender}</span>
                <span className="border-x dark:border-[#495057] mx-2 px-2">{product.type}</span>
                <span>{product.brand}</span>
              </div>

              <span className="font-medium sm:block flex gap-1 justify-end items-center">
                <FontAwesomeIcon icon={faDollarSign} />
                {product.dprice > 0
                  ? `${product.dprice},00`
                  : `${product.price},00`}
              </span>
            </div>
            <div
              className="absolute right-0 text-slate-400 hover:text-slate-600 p-3 hover:cursor-pointer"
              onClick={() => handleCartOperation(product._id)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        ))}
      </div>

      <div className='lg:col-span-2 col-span-5'>
        <div className='bg-gray-100 dark:bg-[#343a40] dark:border-[#495057] rounded-xl p-5'>
          <p className='text-xl font-semibold mb-5'>Order summary</p>

          <div className='flex justify-between  border-b dark:border-[#495057] py-3'>
            <span>Subtotal</span>
            <span className='text-slate-700 dark:text-white font-semibold'><FontAwesomeIcon icon={faDollarSign} />{" "}{calculateTotalPrice(variable.cartItem).toFixed(2)}</span>
          </div>

          <div className='flex justify-between  border-b dark:border-[#495057] py-3'>
            <span>Shipping estimate</span>
            <span className='text-slate-700 dark:text-white font-semibold'><FontAwesomeIcon icon={faDollarSign} />{" "}{variable.shippingEstimate}</span>
          </div>

          <div className='flex justify-between  border-b dark:border-[#495057] py-3'>
            <span>Tax estimate</span>
            <span className='text-slate-700 dark:text-white font-semibold'><FontAwesomeIcon icon={faDollarSign} />{" "}{variable.taxEstimate}</span>
          </div>

          <div className='flex justify-between py-5 text-slate-700 dark:text-white text-xl font-medium'>
            <span>Order total</span>
            <span><FontAwesomeIcon icon={faDollarSign} />{" "}{(calculateTotalPrice(variable.cartItem)+parseFloat(variable.taxEstimate)+parseFloat(variable.shippingEstimate)).toFixed(2)}</span>
          </div>

          <button className='bg-green-500 hover:bg-green-600 text-white font-semibold text-xl w-full p-3 rounded-xl' onClick={()=> {  if (props.islogging){setVariable((prevState)=>({...prevState, checkout:1}))}else{setVariable((prevState)=>({...prevState, popUp:1}))}}}>Checkout</button>
        </div>
      </div>
      </>):(      
      <div className="col-span-5 text-center">
        <p>Your shopping cart is empty.</p>
      </div>)}
      {variable.checkout?(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50" onClick={()=> setVariable((prevState)=>({...prevState, checkout:0}))}>
      <div className="relative bg-white dark:bg-[#212529] p-5 rounded-xl shadow-md mx-5" onClick={(e) => e.stopPropagation()}>
      {renderStep(steps[currentStep])}
      </div>
    </div>
    ):null}
<Popup isOpen={variable.popUp} onClose={() => setVariable((prevState)=> ({...prevState, popUp: 0}))} handleLogin={props.handleLogin} user={props.user}/>
    </div>
    
  );
};

export default Cart;

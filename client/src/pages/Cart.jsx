import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDollarSign, faTimes } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const [variable, setVariable] = useState({
    cartItem: [],
    taxEstimate: 8.32,
    shippingEstimate: 5.52,
    check:1
  });

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


  function calculateTotalPrice(cartItems) {
    let totalPrice = 0;
    for (const product of cartItems) {
      totalPrice += product.dprice > 0 ? parseFloat(product.dprice) : parseFloat(product.price);
    }
    return totalPrice;
  }

  console.log(variable.cartItem);

  return (
    <div className="p-5 lg:mx-32 mx-5 gap-x-12 grid grid-cols-5">
      <div className="sm:text-4xl text-3xl font-bold my-5 py-10 col-span-5">
        <span>Shopping Cart</span>
      </div>
      {variable.cartItem.length>0?(<>
        <div className="border-t pt-5 lg:col-span-3 col-span-5">
        {variable.cartItem.map((product, i) => (
          <div key={i} className="relative flex sm:flex-row flex-col border-b p-5 gap-5">
            {product.img && product.img.length > 0 && (
              <img src={product.img[0]} alt="" className="w-32 h-44 mx-auto sm:mx-0" />
            )}
            <div className="flex flex-col sm:justify-normal justify-between">
              <span className="font-medium">{product.name}</span>

              <div className="sm:flex my-2 hidden">
                <span>{product.gender}</span>
                <span className="border-x mx-2 px-2">{product.type}</span>
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
        <div className='bg-gray-100 rounded-xl p-5'>
          <p className='text-xl font-semibold mb-5'>Order summary</p>

          <div className='flex justify-between  border-b py-3'>
            <span>Subtotal</span>
            <span className='text-slate-700 font-semibold'><FontAwesomeIcon icon={faDollarSign} />{" "}{calculateTotalPrice(variable.cartItem).toFixed(2)}</span>
          </div>

          <div className='flex justify-between  border-b py-3'>
            <span>Shipping estimate</span>
            <span className='text-slate-700 font-semibold'><FontAwesomeIcon icon={faDollarSign} />{" "}{variable.shippingEstimate}</span>
          </div>

          <div className='flex justify-between  border-b py-3'>
            <span>Tax estimate</span>
            <span className='text-slate-700 font-semibold'><FontAwesomeIcon icon={faDollarSign} />{" "}{variable.taxEstimate}</span>
          </div>

          <div className='flex justify-between py-5 text-slate-700 text-xl font-medium'>
            <span>Order total</span>
            <span><FontAwesomeIcon icon={faDollarSign} />{" "}{(calculateTotalPrice(variable.cartItem)+parseFloat(variable.taxEstimate)+parseFloat(variable.shippingEstimate)).toFixed(2)}</span>
          </div>

          <button className='bg-green-500 hover:bg-green-600 text-white font-semibold text-xl w-full p-3 rounded-xl'>Checkout</button>
        </div>
      </div>
      </>):(      
      <div className="col-span-5 text-center">
        <p>Your shopping cart is empty.</p>
      </div>)}
    </div>
  );
};

export default Cart;

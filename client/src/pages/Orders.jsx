import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductSelect from '../components/templates/ProductSelect.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faShoppingBag, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import ProductInput from '../components/templates/ProductInput.jsx';
import { Link } from 'react-router-dom';


const Orders = (props) => {
  const [Purchased, setPurchased] = useState([]);
  const [Sold, setSold] = useState([]);
  const [selectValues, setSelectValues] = useState({});
  const [reviewBox, setReviewBox] = useState({
    rating:'',
    comment:'',
    show:0
  })
  useEffect(() => {
    if (props.islogging) {
      const purchased = { buyers: props.user._id };
      const sold = { seller: props.user._id, card:1 };
      axios.post(`${process.env.REACT_APP_DB}/api/products`, purchased)
        .then((response) => {
          setPurchased(response.data);
        })
        .catch((error) => console.error(error));
      axios.post(`${process.env.REACT_APP_DB}/api/products`, sold)
        .then((response) => {
          const initialSelectValues = {};
          response.data.forEach((product) => {
            initialSelectValues[product._id] = product.buyers.status;
          });
          setSelectValues(initialSelectValues);
          setSold(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [props.user._id, props.islogging]);

  async function handleSelectChange(productId,product, selectedValue){
    setSelectValues((prevSelectValues) => ({
      ...prevSelectValues,
      [productId]: selectedValue,
    }));
    
    const response2 = await axios.post(`${process.env.REACT_APP_DB}/productStatusChange`, {
      updateItems: [product],
      updateBuyer: {
        _id: product.buyers._id,
        status: selectedValue,
      }
    })
    console.log([product])
    console.log(response2.data)
  };
  const [openDiv, setOpenDiv] = useState('Purchased Products'); 


  async function handleSendReview(){
    await axios.post(`${process.env.REACT_APP_DB}/productStatusChange`, {
      updateItems: [reviewBox.product],
      updateBuyer: {
        _id: reviewBox.product.buyers._id,
        status: reviewBox.product.buyers.status,
        rating: reviewBox.rating,
        comment: reviewBox.comment
      }
    })
    window.location.href = '/orders';
  }
  return (
    <div className='p-5 lg:mx-24 flex flex-col'>
      <div className='flex flex-row justify-around'>
          <div className={`${openDiv==="Purchased Products"&&'bg-[#E5E7EB] dark:bg-[#495057]'} border  w-full text-center p-5 lg:text-xl text-2xl dark:border-[#495057] hover:cursor-pointer`} onClick={() => setOpenDiv("Purchased Products")}><FontAwesomeIcon icon={faShoppingBag} className='' /> Purchased Products</div>
          <div className={`${openDiv==="Sold Products"&&'bg-[#E5E7EB] dark:bg-[#495057]'} border w-full text-center p-5 lg:text-xl text-2xl dark:border-[#495057] hover:cursor-pointer`} onClick={() => setOpenDiv("Sold Products")}><FontAwesomeIcon icon={faMoneyBillWave} /> Sold Products</div>
      </div>

      <div className='min-w-[283px]'>
        {openDiv === 'Purchased Products' ? (
          <>
          {Purchased.length>0?(
            <>
            {Purchased.map((product, i) => (
              <div key={i} className="relative flex flex-col lg:flex-row border-x border-b dark:border-[#495057] p-5 gap-5">
                {product.img && product.img.length > 0 && (
                  <Link to={`/products/${product._id}`}>
                  <img src={product.img[0]} alt="" className="w-32 h-44 mx-auto lg:mx-0" />
                  </Link>
                )}
                <div className="flex flex-col sm:justify-normal justify-between">
                  <span className="font-medium">{product.name}</span>
                  <div className="lg:flex my-2 hidden">
                    <span>{product.gender}</span>
                    <span className="border-x dark:border-[#495057] mx-2 px-2">{product.type}</span>
                    <span>{product.brand}</span>
                  </div>
                  <span className="font-medium lg:block flex gap-1 justify-end items-center">
                    <FontAwesomeIcon icon={faDollarSign} />
                    {product.dprice > 0
                      ? `${product.dprice},00`
                      : `${product.price},00`}
                  </span>
                </div>
                <div className="lg:absolute right-0 relative text-center lg:text-left flex flex-col px-5">
                  <div>
                    Sipariş Durumu:
                  </div>
                  <div className='font-semibold lg:font-medium lg:text-xl flex flex-col gap-5'>
                  {product.buyers.status}
                  {(product.buyers.status==="Ürün teslim edildi.") && (!product.buyers.comment)?(
                  <div>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white w-full max-w-xs p-2 rounded-xl transition-colors' onClick={() =>  setReviewBox((prevState)=>({...prevState, show:1, product: product}))}>Yorum yaz</button>
                  </div>):null}
                  </div>
                </div>
              </div>
            ))}
            </>
          ):(
            <div className='text-2xl absolute left-0 right-0 text-center mt-32 mx-2'>We couldn't find any products you've purchased.</div>
          )}
          </>
        ) : (
          <>
          {Sold.length>0?(
            <>
            {Sold.map((product, i) => (
              <div key={i} className="relative flex flex-col lg:flex-row border dark:border-[#495057] p-5 gap-5">
                {product.img && product.img.length > 0 && (
                  <img src={product.img[0]} alt="" className="w-32 h-44 mx-auto lg:mx-0" />
                )}
                <div className="flex flex-col sm:justify-normal justify-between">
                  <span className="font-medium">{product.name}</span>
                  <div className="lg:flex my-2 hidden">
                    <span>{product.gender}</span>
                    <span className="border-x dark:border-[#495057] mx-2 px-2">{product.type}</span>
                    <span>{product.brand}</span>
                  </div>
                  <span className="font-medium lg:block flex gap-1 justify-end items-center">
                    <FontAwesomeIcon icon={faDollarSign} />
                    {product.dprice > 0
                      ? `${product.dprice},00`
                      : `${product.price},00`}
                  </span>
                </div>
                <div className="lg:absolute right-0 relative text-center lg:text-left flex flex-col px-5">
                  <div>
                    Sipariş Durumu:
                  </div>
                  <div className='font-semibold lg:font-medium lg:text-xl'>
                    {selectValues[product._id]==="Ürün teslim edildi."?(selectValues[product._id]):(<ProductSelect
                      options={['Ürününüz hazırlanıyor.', 'Ürün kargoya verildi.', 'Ürün teslim edildi.']}
                      value={selectValues[product._id]}
                      onChange={(e) => handleSelectChange(product._id,product, e.target.value)}
                    />)}
                  </div>
                </div>
              </div>
            ))}
            </>
          ):(<div className='text-2xl absolute left-0 right-0 text-center mt-32 mx-2'>We couldn't find any products you've sold.</div>)}

          </>
        )}
      </div>

      {reviewBox.show?(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setReviewBox((prevState)=>({...prevState, show:0}))}>
        <div className="relative bg-white dark:bg-[#212529] p-4 rounded-xl shadow-md mx-5" onClick={(e) => e.stopPropagation()}>
  
          <div className="p-4 text-black dark:text-[#dee2e6] text-center flex flex-col gap-5 sm:w-96">
            <div className='flex gap-5 justify-around'>
              <button className={`bg-gray-300 dark:bg-[#343a40] ${reviewBox.rating===1&&'ring-green-500 ring-2'} dark:hover:bg-[#41484e] px-5 py-3 rounded-full`} onClick={()=> setReviewBox((prevState)=> ({...prevState, rating:1}))}>1</button>
              <button className={`bg-gray-300 dark:bg-[#343a40] ${reviewBox.rating===2&&'ring-green-500 ring-2'} dark:hover:bg-[#41484e] px-5 py-3 rounded-full`} onClick={()=> setReviewBox((prevState)=> ({...prevState, rating:2}))}>2</button>
              <button className={`bg-gray-300 dark:bg-[#343a40] ${reviewBox.rating===3&&'ring-green-500 ring-2'} dark:hover:bg-[#41484e] px-5 py-3 rounded-full`} onClick={()=> setReviewBox((prevState)=> ({...prevState, rating:3}))}>3</button>
              <button className={`bg-gray-300 dark:bg-[#343a40] ${reviewBox.rating===4&&'ring-green-500 ring-2'} dark:hover:bg-[#41484e] px-5 py-3 rounded-full`} onClick={()=> setReviewBox((prevState)=> ({...prevState, rating:4}))}>4</button>
              <button className={`bg-gray-300 dark:bg-[#343a40] ${reviewBox.rating===5&&'ring-green-500 ring-2'} dark:hover:bg-[#41484e] px-5 py-3 rounded-full`} onClick={()=> setReviewBox((prevState)=> ({...prevState, rating:5}))}>5</button>
            </div>
            <div>
            <ProductInput placeholder="Review the product." type="textarea" value={reviewBox.comment} onChange={(e)=> setReviewBox((prevState)=> ({...prevState, comment:e.target.value}))} formState={reviewBox} />
            </div>
          </div>
          <button className='w-full bg-green-500 hover:bg-green-600 p-2 rounded-full' onClick={()=> handleSendReview()}>Send</button>
        </div>
      </div>
      ):null}
    </div>
  );
};

export default Orders
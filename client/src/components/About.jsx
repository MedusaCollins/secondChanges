import React, { useState, useEffect } from 'react'
import ProductAbout from './templates/ProductAbout.jsx'
import ProductPrice from './templates/ProductPrice.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import ProductInput from '../components/templates/ProductInput.jsx';
import axios from 'axios'

const About = ({product, rating, user, comments, setComments}) => {
  const [popUp, setPopUp] = useState(0);
  const [formData, setFormData] = useState({
    userId: '',
    productId: product._id,
    comment: '',
    reqType: ''
  });

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, userId: user._id }));
  }, [user._id]);

  async function handleSendComment() {
    const response = await axios.post(`${process.env.REACT_APP_DB}/addComment`, formData);
    if (response.data.error) {
      console.log(response.data.error);
    } else {
      // Yeni yorumu comments durumuna ekleyin
      setComments([...comments, response.data]);
      setPopUp(0);
      console.log(response.data);
    }
  }

  return (
    <div className='w-1/2 text-xl'>
      <div className='flex justify-between'>
        <div>
          <h1 className='mb-5 text-2xl font-semibold'>{product.name}</h1>
          <ProductAbout text="Usability" value={product.usability}/>
          <ProductAbout text="Type" value={product.type}/>
          <ProductAbout text="Gender" value={product.gender}/>
          <ProductAbout text="Size" value={product.size}/>
          <ProductAbout text="Brand" value={product.brand}/>
        </div>

        <div className='flex flex-col rounded-xl border p-5 min-w-[200px]'>
          <div className='m-auto'>
          <img src={product.seller.img} alt="seller" className='w-16 h-16 rounded-full mb-1 border mx-auto border-gray-300'/>
          {product.seller.username}
          </div>
          <div className='p-2 text-center'>
            {product.seller.reviews.length>=1?(
              <>
              <FontAwesomeIcon icon={solidStar} className='text-orange-500 text-left'/> {rating}<span className='text-gray-500'>/5 ({product.seller.reviews.length} reviews)</span>
              </>
            ):<span className='text-gray-500'>{product.seller.reviews.length} reviews</span>}
          </div>
        </div>

      </div>
        <p className='text-base my-10'>{product.description}</p>
        <ProductPrice price={product.price} dprice={product.dprice}/>
        <div className='flex flex-col text-xl gap-5 mt-16 font-semibold'>
          {"buyers" in product?(
              <div className='rounded-lg border border-gray-600 bg-gray-600 text-center text-white p-2 '>Satıldı</div>
          ):(
            <>
            <button className='rounded-lg border border-green-600 bg-green-600 text-white p-2 '>Satın al</button>
            <div className='w-full justify-between flex'>
              <button className='rounded-lg border border-blue-400 text-blue-400 p-2 w-[45%]' onClick={()=> {setPopUp(1); setFormData({...formData, reqType: 'asks'})}}>Soru sor</button>
              <button className='rounded-lg border border-green-600 text-green-600 p-2 w-[45%]'onClick={()=> {setPopUp(1); setFormData({...formData, reqType: 'offers'})}}>Teklif ver</button> 
            </div>
            </>
          )}

          </div>
        {popUp? (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
                  <div className='fixed inset-0 bg-black opacity-50 transition' onClick={()=>setPopUp(0)}></div>
                  <div className="relative bg-white w-96 h-48 rounded-lg p-4">
                    <ProductInput name={formData.reqType==='asks'?"Your Question":"Your Offer"}type="textarea" placeholder={formData.reqType==='asks'?"You can ask anything that comes to your mind about the product.":"You can make an offer for the product."} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} />
                    <button onClick={()=>handleSendComment()} className="bg-blue-500 hover:bg-blue-700 text-white p-2 text-sm rounded-lg transition absolute bottom-3 right-5">{formData.reqType==='asks'?"Ask a Question":"Submit an Offer"}</button>
                  </div>
                </div>
              ):null}
    </div>
  )
}

export default About
import React, { useState } from 'react';
import FilterTemplate from './templates/FilterTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Comments = ({product, seller}) => {
  const [openDiv, setOpenDiv] = useState('Asks'); // State, hangi div açık olduğunu takip eder
  const toggleDiv = (divName) => {
    // Eğer tıklanan div zaten açıksa, kapat
    if (openDiv === divName) {
      setOpenDiv('Asks');
      console.log(seller)
    } else {
      // Değilse, tıklanan div'i aç
      setOpenDiv(divName);
    }
  };

  return (
    <>
      <div className='w-full p-3 flex bg-slate-100 rounded-lg'>
        <button onClick={() => toggleDiv('Asks')}>
          <FilterTemplate name="Asks"/>
        </button>
        <button onClick={() => toggleDiv('Offers')}>
          <FilterTemplate name="Offers" />
        </button>
        <div className='relative flex ml-auto'>
          <button onClick={() => toggleDiv('SellerComments')}>
            <FilterTemplate name="Seller Comments" />
          </button>
        </div>
      </div>

      <div>
        {openDiv === 'Asks' && (
          <div className='my-8'>
            <h1 className='font-semibold text-xl mb-5'>Kullanıcılar tarafından satıcıya sorulan sorular</h1>
            {product.asks.map((e, i)=>(
              <div key={i} className='flex gap-3 my-12'>
                <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 rounded-full'/>
                <div className='flex flex-col'>
                  <span className='font-semibold text-xl'>{e._id.username}</span>
                  <span className='text-lg'>{e.comment}</span>
                  <button className='w-12 my-2 text-left text-green-600 font-bold text-lg'>reply</button>

                  <div className='border-l-2 pl-2 border-green-500 flex flex-col my-2'>
                  {e.replies.map((e,i)=>(
                  <div key={i} className='flex gap-3 ml-5'>
                    <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 rounded-full'/>
                    <div className='flex flex-col'>
                      <span className='font-semibold text-xl'>{e._id.username}</span>
                      <span className='text-lg'>{e.comment}</span>
                      <button className='w-12 my-2 text-left text-green-600 font-bold text-lg'>reply</button>
                    </div>
                  </div>
                  ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {openDiv === 'Offers' && (
          <div className='my-8'>
          <h1 className='font-semibold text-xl mb-5'>Kullanıcıların bu ürüne yapmış olduğu teklifler</h1>
          {product.offers.map((e, i)=>(
            <div key={i} className='flex gap-3 my-12'>
              <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 rounded-full'/>
              <div className='flex flex-col'>
                <span className='font-semibold text-xl'>{e._id.username}</span>
                <span className='text-lg'>{e.comment}</span>
                <button className='w-12 my-2 text-left text-green-600 font-bold text-lg'>reply</button>

                <div className='border-l-2 pl-2 border-green-500 flex flex-col my-2'>
                {e.replies.map((e,i)=>(
                <div key={i} className='flex gap-3 ml-5'>
                  <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 rounded-full'/>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-xl'>{e._id.username}</span>
                    <span className='text-lg'>{e.comment}</span>
                    <button className='w-12 my-2 text-left text-green-600 font-bold text-lg'>reply</button>
                  </div>
                </div>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
        {openDiv === 'SellerComments' && (
          <div className='my-8'>
          <h1 className='font-semibold text-xl mb-5'>Satıcının sattığı başka ürünlere gelen yorumlar</h1>
          {seller.reviews.map((e,i)=>(
            <div key={i} className='flex gap-3 my-12'>
              <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 rounded-full'/>
              <div className='flex flex-col'>
                <span className='font-semibold text-xl'>{e._id.username}</span>
                {/* <div className=''><FontAwesomeIcon icon={faStar} className='w-min text-orange-500'/></div> */}
                <span className='text-lg'>{e.comment}</span>
              </div>
            </div>
          ))}
          {/* {seller.reviews.map((e, i)=>(
            <div key={i} className='flex gap-3 my-12'>
              <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 rounded-full'/>
              <div className='flex flex-col'>
                <span className='font-semibold text-xl'>{e._id.username}</span>
                <span className='text-lg'>{e.comment}</span>
                <button className='w-12 my-2 text-left text-green-600 font-bold text-lg'>reply</button>

                <div className='border-l-2 pl-2 border-green-500 flex flex-col my-2'>
                {e.replies.map((e,i)=>(
                <div key={i} className='flex gap-3 ml-5'>
                  <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 rounded-full'/>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-xl'>{e._id.username}</span>
                    <span className='text-lg'>{e.comment}</span>
                    <button className='w-12 my-2 text-left text-green-600 font-bold text-lg'>reply</button>
                  </div>
                </div>
                ))}
              </div>
              </div>
            </div>
          ))} */}
        </div>
        )}
      </div>
    </>
  );
};

export default Comments;

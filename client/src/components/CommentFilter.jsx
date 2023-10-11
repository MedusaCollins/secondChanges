import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const CommentFilter = ({filter,product}) => {
  return (
    <div className='my-8'>
            <h1 className='font-semibold text-xl mb-5'>
                {filter==="asks"&&'Kullanıcılar tarafından satıcıya sorulan sorular'}
                {filter==="offers"&&'Kullanıcıların bu ürüne yapmış olduğu teklifler'}
                {filter==="Seller Comments"&&'Satıcının sattığı başka ürünlere gelen yorumlar'}
            </h1>
            {product.map((e, i)=>(
              <div key={i} className='flex gap-3 my-12'>
                <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 mt-2 rounded-full'/>
                <div className='flex flex-col'>
                  <span className='font-semibold text-xl'>{e._id.username}</span>
                  {filter==="Seller Comments"?(
                  <div>
                             {[...Array(5)].map((_, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={e.rating >= index + 1 ? solidStar : regularStar}
                                className='w-min text-orange-500'
                              />
                            ))}
                  <span className='text-lg flex mt-2'>{e.comment}</span>
                    </div>)
                  :<>
                  <span className='text-lg flex mt-2'>{e.comment}</span>
                  <button className='w-12 my-2 text-left text-green-600 font-bold text-lg'>reply</button>
                  </>}

                {filter!=="Seller Comments"?(
                    <div className='border-l-2 pl-2 border-green-500 flex flex-col my-2'>
                    {e.replies.map((e,i)=>(
                    <div key={i} className='flex gap-3 ml-5'>
                      <img src={e._id.img} alt="comment user profile pic" className='w-12 h-12 mt-2 rounded-full'/>
                      <div className='flex flex-col'>
                        <span className='font-semibold text-xl'>{e._id.username}</span>
                        <span className='text-lg'>{e.comment}</span>
                        <button className='w-12 my-2 text-left text-green-600 font-bold text-lg'>reply</button>
                      </div>
                    </div>
                    ))}
                    </div>
                ):null}
                </div>
              </div>
            ))}
    </div>)}

export default CommentFilter
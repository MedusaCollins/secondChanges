import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

import ProductInput from '../templates/ProductInput';
// import Popup from './Popup';
import axios from 'axios';


const CommentFilter = ({filter,product,user,pId}) => {
  const [popUp, setPopUp] = useState(0);
  const [comments, setComments] = useState(product);
  const addReply = (newReply, askIndex) => {
    const updatedComments = [...comments];
    updatedComments[askIndex].replies.push(newReply);
    setComments(updatedComments);
  };
  const [formData, setFormData] = useState({
    userId: '',
    productId: '',
    comment: '',
    reqType: ''
  })


  function handleReply(e,i){
    console.log(e)
    setPopUp(1)
    setFormData({
      userId: user._id,
      productId: pId,
      askIndex: i,
      filter: filter
    })
  }
  async function sendReplies() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_DB}/addReplies`, formData);
      if(response.data.error){
        console.log(response.data.errror)
      }else{
        addReply(response.data, formData.askIndex);
        setPopUp(0)
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className='my-8'>
            <h1 className='font-semibold text-xl mb-5'>
                {filter==="asks"&&'Kullanıcılar tarafından satıcıya sorulan sorular'}
                {filter==="offers"&&'Kullanıcıların bu ürüne yapmış olduğu teklifler'}
                {filter==="Seller Comments"&&'Satıcının sattığı başka ürünlere gelen yorumlar'}
            </h1>
            {product.slice().map((e, i)=>(
              <div key={i} className='flex gap-3 my-12'>
                <img src={e.userId.img} alt="comment user profile pic" className='w-12 h-12 mt-2 rounded-full'/>
                <div className='flex flex-col'>
                  <span className='font-semibold text-xl'>{e.userId.username}</span>
                  {filter==="Seller Comments"?(
                  <div>
                    {[...Array(5)].map((_, index) => ( <FontAwesomeIcon key={index} icon={e.rating >= index + 1 ? solidStar : regularStar} className='w-min text-orange-500' /> ))}
                  <span className='text-lg flex mt-2'>{e.comment}</span>
                  </div>)
                  :<>
                  <span className='text-lg flex mt-2'>{e.comment}</span>
                  <button className='w-12 my-2 text-left text-green-600 font-bold text-lg' onClick={()=>handleReply(e, i)}>reply</button>
                  </>}

                  {filter !== 'Seller Comments' ? (
                  <div className='border-l-2 pl-2 border-green-500 flex flex-col'>
                    {e.replies.map((e, i) => (
                        <div key={i} className='flex gap-3 ml-5'>
                          <img src={e.userId.img} alt='comment user profile pic' className='w-12 h-12 mt-2 rounded-full' />
                          <div className='flex flex-col'>
                            <span className='font-semibold text-xl'>{e.userId.username}</span>
                            <span className='text-lg'>{e.comment}</span>
                            <button onClick={()=> console.log("test")} className='w-12 my-2 text-left text-green-600 font-bold text-lg'>
                              reply
                            </button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : null}
                </div>
              </div>
            )).reverse()}

            {popUp? (
              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
                <div className='fixed inset-0 bg-black opacity-50 transition' onClick={()=>setPopUp(0)}></div>
                <div className="relative bg-white w-96 h-48 rounded-lg p-4">
                  <ProductInput type="textarea" placeholder="Add a reply." onChange={(e) => setFormData({ ...formData, comment: e.target.value })} 
                  />
                  <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 text-sm rounded-lg transition absolute bottom-3 right-5" onClick={()=>sendReplies()}>Send Reply</button>
                </div>
              </div>
            ):null}
    </div>)}

export default CommentFilter
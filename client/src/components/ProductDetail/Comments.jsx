import React, { useState } from 'react';
import FilterTemplate from '../templates/FilterTemplate';
import CommentFilter from './CommentFilter';

const Comments = ({product, user, seller}) => {
  const [openDiv, setOpenDiv] = useState('Asks'); 
  const toggleDiv = (divName) => {
    if (openDiv === divName) {
      setOpenDiv('Asks');
    } else {
      setOpenDiv(divName);
    }
  };

  return (
    <>
      <div className='w-full p-3 flex bg-slate-100 dark:bg-[#343a40] rounded-lg'>
        <button onClick={() => toggleDiv('Asks')}>
          <FilterTemplate name="Asks" openDiv={openDiv}/>
        </button>
        <button onClick={() => toggleDiv('Offers')}>
          <FilterTemplate name="Offers" openDiv={openDiv}/>
        </button>
        <div className='relative flex ml-auto'>
          <button onClick={() => toggleDiv('Seller Comments')}>
            <FilterTemplate name="Seller Comments" openDiv={openDiv}/>
          </button>
        </div>
      </div>

      <div>
        {openDiv === 'Asks' && <CommentFilter product={product.asks} pId={product._id} user={user} filter='asks'/>}
        {openDiv === 'Offers' && <CommentFilter product={product.offers} pId={product._id} user={user} filter='offers'/>}
        {openDiv === 'Seller Comments' && <CommentFilter product={seller.reviews} filter='Seller Comments'/>}
      </div>
    </>
  );
};

export default Comments;

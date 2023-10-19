import React, { useState } from 'react';
import FilterTemplate from '../templates/FilterTemplate';
import CommentFilter from './CommentFilter';

const Comments = ({product, user, seller, comments}) => {
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
      <div className='w-full p-3 flex bg-slate-100 rounded-lg'>
        <button onClick={() => toggleDiv('Asks')}>
          <FilterTemplate name="Asks" openTab={openDiv}/>
        </button>
        <button onClick={() => toggleDiv('Offers')}>
          <FilterTemplate name="Offers" openTab={openDiv}/>
        </button>
        <div className='relative flex ml-auto'>
          <button onClick={() => toggleDiv('Seller Comments')}>
            <FilterTemplate name="Seller Comments" openTab={openDiv}/>
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

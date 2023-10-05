import {React } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const location = useLocation()
  return (
    <div className='flex top-0 left-0 right-0 px-5 border-b-slate-100 border-b-[2px]'>
      <Link to="/" className='text-green-500 font-semibold text-xl my-2'>secondChanges</Link>
      <div className='ml-12 items-center flex text-gray-700 font-medium'>
        <Link to="/" className={`mx-3 ${location.pathname ==='/'&& 'text-green-500'}`}>Home</Link>
        <Link to="/man" className={`mx-3 ${location.pathname ==='/man'&& 'text-green-500'}`}>Man</Link>
        <Link to="/woman" className={`mx-3 ${location.pathname ==='/woman'&& 'text-green-500'}`}>Woman</Link>
        <Link to="/kids" className={`mx-3 ${location.pathname ==='/kids'&& 'text-green-500'}`}>Kids</Link>
      </div>

      <div className='relative flex right-0 ml-auto text-gray-700'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='m-4'/>
        <FontAwesomeIcon icon={faBell} className='m-4'/>
        <FontAwesomeIcon icon={faHeart} className='m-4'/>
        <FontAwesomeIcon icon={faCartShopping} className='m-4'/>
        <img
          src="https://cdn.discordapp.com/attachments/734241879050420264/1159118118216552448/image.png?ex=652fdbde&is=651d66de&hm=7ff7ca47d94f5f6e8d844400d9efadfed9d873407cf67eff9c44e8e0fca3f77f&"
          alt="userimg"
          className='w-8 h-8 rounded-full m-2'
        />
      </div>
    </div>
  );
};

export default Header;

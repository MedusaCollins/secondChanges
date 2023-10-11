import {React, useState, useEffect, useRef } from 'react';
import Popup from './Popup';

import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faHeart, faCartShopping, faGear, faUser, faMoon } from '@fortawesome/free-solid-svg-icons';

const Header = ({handleLogin, user, islogging}) => {
  const location = useLocation()
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



    const [isChecked, setIsChecked] = useState(false)
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
    }
    
  
  const logOut = ()=>{
    handleLogin(false, {})
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div className='flex top-0 left-0 right-0 px-5 border-b-slate-100 border-b-[2px]'>
        <Popup isOpen={isPopupOpen} onClose={closePopup} handleLogin={handleLogin} user={user}/>
      <Link to="/" className='text-green-500 font-semibold text-xl my-2'>secondChanges</Link>
      <div className='ml-12 items-center flex text-gray-700 font-medium'>
        <Link to="/" className={`mx-3 ${location.pathname ==='/'&& 'text-green-500'}`}>Home</Link>
        <Link to="/man" className={`mx-3 ${location.pathname ==='/man'&& 'text-green-500'}`}>Man</Link>
        <Link to="/woman" className={`mx-3 ${location.pathname ==='/woman'&& 'text-green-500'}`}>Woman</Link>
      </div>

      <div className='relative flex right-0 ml-auto text-gray-700'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='m-4'/>
        <FontAwesomeIcon icon={faBell} className='m-4'/>
        <FontAwesomeIcon icon={faHeart} className='m-4'/>
        <FontAwesomeIcon icon={faCartShopping} className='m-4'/>
        
        {islogging?(
        <button onClick={()=> toggleMenu()}>{user.username}</button>
        ):(
        <button className='border rounded-lg w-16 m-2 px-auto' onClick={openPopup}>Login</button>
        )}
        {isMenuOpen && (
          <div className="absolute -right-0 mt-12 min-w-[16rem] bg-white text-center border rounded-md shadow-lg flex-col-reverse z-30" ref={menuRef}>
          <ul>
            <li className="p-2 flex gap-2 border-b-2 border-dotted items-center">
              <img src={user.img} alt="" className="w-8 h-8 rounded-full" />
              <div className="text-left">
                <p className="font-semibold">{user.username}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </li>
            <li className='flex flex-col border-b-2 border-dotted items-center'>
              <Link to="/settings" className="w-full hover:bg-gray-200 p-2 transition-all flex items-center" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
              </Link>
              <Link to="/settings" className="w-full hover:bg-gray-200 p-2 transition-all flex items-center" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Offers
              </Link>
              <Link to="/myproducts" className="w-full hover:bg-gray-200 p-2 transition-all flex items-center" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Manage my products
              </Link>
              <Link to="/settings" className="w-full hover:bg-gray-200 p-2 transition-all flex items-center" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faGear} className="mr-2" /> User settings
              </Link>
            </li>

            <li className='flex gap-2 border-b-2 border-dotted items-center'>
              <div className='flex w-full hover:bg-gray-200'>
                <Link className="w-full p-2 transition-all flex items-center">
                  <FontAwesomeIcon icon={faMoon} className="mr-2" /> Dark Mode
                </Link>
                <label className='flex cursor-pointer select-none items-center'>
                  <div className='relative'>
                    <input
                      type='checkbox'
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className='sr-only'
                    />
                    <div
                      className={`box block h-5 w-9 mx-5 rounded-full ${isChecked ? 'bg-gray-500' : 'bg-gray-500'}`}
                    ></div>
                    
                    <div
                      className={`absolute right-10 top-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                        isChecked ? 'translate-x-[10%] ' : 'translate-x-[115%]'
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </li>
          </ul>
          <button onClick={logOut} className="block w-full text-left hover:bg-gray-200 p-2 transition-all">Log out</button>
        </div>
        
        )}


        {/* <img
          src="https://cdn.discordapp.com/attachments/734241879050420264/1159118118216552448/image.png?ex=652fdbde&is=651d66de&hm=7ff7ca47d94f5f6e8d844400d9efadfed9d873407cf67eff9c44e8e0fca3f77f&"
          alt="userimg"
          className='w-8 h-8 rounded-full m-2'
        /> */}
      </div>
    </div>
  );
};

export default Header;

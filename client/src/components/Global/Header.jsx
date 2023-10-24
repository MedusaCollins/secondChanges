import {React, useState, useEffect, useRef } from 'react';
import Popup from './Popup';
import axios from 'axios';

import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHeart, faCartShopping, faUser, faMoon, faCog, faTruckFast, faBagShopping, faCircleXmark, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({handleLogin, user, islogging}) => {
  const location = useLocation()
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState({
    searchbar: 0,
    navbar: 0,
  });
  const [value, setValue] = useState({
    searchbar: '',
  })
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

  useEffect(()=>{
    async function autoLogin() {
      const storedEmailorusername = localStorage.getItem('emailorusername');
      const storedPassword = localStorage.getItem('password');

      if (storedEmailorusername && storedPassword) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_DB}/login`, {
            emailorusername: storedEmailorusername,
            password: storedPassword,
          });
          if (!response.data.error) {
            handleLogin(true, response.data);
          }
        } catch (error) {
          console.error('Hata oluştu: ', error);
        }
      } else {
        console.log("Hesap yok")
      }
    }
    autoLogin()
  }, [handleLogin])
  const logOut = ()=>{
    localStorage.removeItem('emailorusername');
    localStorage.removeItem('password');
    setIsMenuOpen(!isMenuOpen);
    handleLogin(false, {})
  }
  


  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function openNavbar(){
    setIsOpen((prevState)=>({...prevState, navbar:1}))
  }

  const [isChecked, setIsChecked] = useState(false)
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  return (
  <>
    <div className='flex top-0 left-0 right-0 px-5 border-b-slate-100 border-b-[2px]'>
        <Popup isOpen={isPopupOpen} onClose={closePopup} handleLogin={handleLogin} user={user}/>
      <Link to="/" className='text-green-500 font-semibold text-xl my-2 max-sm:hidden'>secondChanges</Link>
      <div className='ml-12 items-center flex text-gray-700 font-medium max-sm:ml-0 max-[470px]:hidden'>
        <Link to="/" className={`mx-3 ${location.pathname ==='/'&& 'text-green-500'}`}>Home</Link>
        <Link to="/man" className={`mx-3 ${location.pathname ==='/man'&& 'text-green-500'}`}>Man</Link>
        <Link to="/woman" className={`mx-3 ${location.pathname ==='/woman'&& 'text-green-500'}`}>Woman</Link>
      </div>
      <div className='items-center text-gray-700 font-medium hidden max-[470px]:flex' onClick={()=> setIsOpen((prevState)=>({...prevState, navbar:1}))}><FontAwesomeIcon icon={faBars}/></div>

      <div className='relative flex right-0 ml-auto text-gray-700'>
        <div className='hover:cursor-pointer' onClick={()=> setIsOpen((prevState)=>({...prevState, searchbar:1}))}><FontAwesomeIcon icon={faMagnifyingGlass} className='m-4'/></div>
        {islogging&&(
          <Link to={`/likes/${user.username}`}><FontAwesomeIcon icon={faHeart} className={`m-4 ${location.pathname ===`/likes/${user.username}` && 'text-green-500'}`}/></Link>
        )}
        <div className='relative'>
        <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} className={`m-4 ${location.pathname ===`/cart` && 'text-green-500'}`}/></Link>
        </div>

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
              <Link to={`/profiles/${user.username}`} className="w-full hover:bg-gray-200 p-2 transition-all flex items-center" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUser} className="mr-2" /> My Profile
              </Link>
              <Link to="/myproducts" className="w-full hover:bg-gray-200 p-2 transition-all flex items-center" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBagShopping} className="mr-2" /> Product Management
              </Link>
              <Link to="/orders" className="w-full hover:bg-gray-200 p-2 transition-all flex items-center" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faTruckFast} className="mr-2" /> My Orders
              </Link>
              <Link to="/settings" className="w-full hover:bg-gray-200 p-2 transition-all flex items-center" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
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
      </div>
    </div>

    {isOpen.searchbar?(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50" onClick={()=> setIsOpen((prevState)=>({...prevState, searchbar:0}))}>
      <div className="relative bg-white p-2 rounded-xl shadow-md" onClick={(e) => e.stopPropagation()}>
        <div className="text-black text-center max-sm:w-64 w-[500px]">

            <div className="relative mx-auto flex border-b-2 p-2">
                <p type="button" className=" inset-y-0 pt-2 left-0 items-center text-gray-600">
                  <FontAwesomeIcon icon={faSearch} className="w-4 h-4"/>
                </p>
                <input type="text" placeholder="Search a products" name="deneme" value={value.searchbar} 
                onChange={(e)=> setValue((prevState)=>({...prevState, searchbar: e.target.value}))} 
                className="w-full p-2 text-base outline-none focus:ring-green-500 focus:ring-0 transition"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.location.href = "/search/"+value.searchbar;
                  }
                }}/>
                <button type="button" onClick={() => setValue((prevState)=>({...prevState, searchbar: ''}))} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-300 hover:text-gray-400 focus:ring-0">
                  <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5"/>
                </button>
            </div>

        </div>
      </div>
    </div>
    ):null}
    {isOpen.navbar?(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50" onClick={()=> setIsOpen((prevState)=>({...prevState, navbar:0}))}>
      <div className="relative bg-white p-2 rounded-xl shadow-md" onClick={(e) => e.stopPropagation()}>
        <div className="text-black text-center w-[200px] flex flex-col">
        <Link to="/" className='w-full p-2' onClick={()=> setIsOpen((prevState)=>({...prevState, navbar:0}))}>Home</Link>
        <Link to="/man" className='w-full p-2' onClick={()=> setIsOpen((prevState)=>({...prevState, navbar:0}))}>Man</Link>
        <Link to="/woman" className='w-full p-2' onClick={()=> setIsOpen((prevState)=>({...prevState, navbar:0}))}>Woman</Link>
        </div>
      </div>
    </div>
    ):null}
  </>
  );
};

export default Header;

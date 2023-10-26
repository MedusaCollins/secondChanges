import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import MultiStepForm from '../components/ProductEdit/MultiStepForm.jsx';
import Products from '../components/Home/Products.jsx';
import axios from 'axios';

const MyProduct = ({ user, handleLogin }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters] = useState({ seller: user._id });

  const [products, setProducts] = useState([]); // State değişkeni düzgün sıralamada

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_DB}/api/products`, filters)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, [filters]);

  useEffect(() => {
    async function autoLogin() {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
  
      if (storedUsername && storedPassword) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_DB}/login`, {
            email: storedUsername,
            password: storedPassword,
          });
          if (!response.data.error) {
            handleLogin(true, response.data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Hata oluştu: ', error);
        }
      } else {
        setIsLoading(false);
      }
    }
  
  
    autoLogin();
  }, [filters, handleLogin]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      {products.length > 0? (
        <div className='flex gap-5 justify-center mt-12'>
          <Products filter={filters} setIsModalOpen={setModalOpen} user={user} pUser={user} handleLogin={handleLogin}/>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center h-screen -mt-12">
            <FontAwesomeIcon icon={faFolder} className="w-16 h-16 text-green-500" />
            <p className="text-xl">Add Products</p>
            <button onClick={()=>setModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white p-2 text-sm rounded-lg mt-5 transition">
              <FontAwesomeIcon icon={faPlus} /> New Product
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
          <div className='fixed inset-0 bg-black opacity-50' onClick={()=>setModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-[#212529] w-96 rounded-lg p-4">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={()=>setModalOpen(false)}>
              <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
            </div>

            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-[#dee2e6]">New Product</h2>
            <MultiStepForm user={user} handleLogin={handleLogin} isModalOpen={setModalOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default MyProduct;
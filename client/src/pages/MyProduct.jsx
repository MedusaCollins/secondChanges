import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import MultiStepForm from '../components/MultiStepForm.jsx'
import Products from '../components/Products.jsx';
import axios from 'axios';

const MyProduct = ({ isLogging, user, handleLogin }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filters] = useState({ seller: user._id});
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_DB}/api/products`, filters)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data)
      })
      .catch((error) => console.error(error));
  }, [filters]);

  
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(user)
  return (
    <>
    {user.products.length!==0?(
      <div className='flex gap-5 justify-center mt-12'>
      <Products filter={filters} setIsModalOpen={setModalOpen} />
    </div>
    ):(

      <div>
      <div className="flex flex-col items-center justify-center h-screen -mt-12">
        <FontAwesomeIcon icon={faFolder} className="w-16 h-16 text-green-500" />
        <p className="text-xl">Add Products</p>
        <button onClick={openModal} className="bg-green-500 hover:bg-green-600 text-white p-2 text-sm rounded-lg mt-5 transition">
          <FontAwesomeIcon icon={faPlus} /> New Product
        </button>
      </div>
    </div>
    )}

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
        <div className='fixed inset-0 bg-black opacity-50' onClick={closeModal}></div>
        <div className="relative bg-white w-96 rounded-lg p-4">
          <div className="absolute top-2 right-2 cursor-pointer" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </div>

          <h2 className="text-base font-semibold leading-7 text-gray-900">New Product</h2>
          <MultiStepForm user={user} handleLogin={handleLogin} isModalOpen={setModalOpen}/>
        </div>
      </div>
    )}
    </>
  );
};

export default MyProduct;

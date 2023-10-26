import React, { useState } from 'react';
import ProductInput from '../templates/ProductInput';
import axios from 'axios';
import ProductSelect from '../templates/ProductSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MultiStepForm = ({ user, handleLogin, isModalOpen }) => {
  const [errorMessage, setErrorMessage]=useState('')
  const [files, setFiles] = useState([]); // Dosyaları saklamak için state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    size: '',
    usability: '',
    brand: '',
    img: [],
    price: '',
    dprice: '',
    gender: '',
    seller: user._id,
    asks: [],
    offers: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Product basic",
    "Product Details",
    "Product Image",
    "Pricing"
  ];

  const checkRequiredFields = () => {
    switch (steps[currentStep]) {
      case "Product basic":
        return formData.name && formData.description;
      case "Product Details":
        return formData.type && formData.size && formData.usability && formData.brand;
      case "Product Image":
        return formData.img.length > 0;
      case "Pricing":
        return formData.price && formData.dprice;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (checkRequiredFields()) {
      setErrorMessage("");
      setCurrentStep(currentStep + 1);
    } else {
      setErrorMessage("Lütfen gerekli alanları doldurun.");
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormDataChange = (newData) => {
    setFormData({
      ...formData,
      ...newData,
    });
  };

  async function handleReviewSubmit() {
    try {
      const formDataWithImages = new FormData();

      for (const key in formData) {
        formDataWithImages.append(key, formData[key]);
      }

      console.log(formData.img)
      const response = await axios.post(`${process.env.REACT_APP_DB}/createProduct`, formData);
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        handleLogin(true, response.data);
        isModalOpen(false);
        window.top.location.reload(true);
      }
    } catch (error) {
      console.error('Hata oluştu: ', error);
    }
  }

  async function handleFileChange(e) {
    try {
      const uploadedFiles = e.target.files;
  
      for (let i = 0; i < uploadedFiles.length; i++) {
        const formData = new FormData();
        formData.append("file", uploadedFiles[i]);
  
        const uploadResponse = await axios.post(
          `${process.env.REACT_APP_DB}/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        if (uploadResponse.data) {
          const filePath = process.env.REACT_APP_DB + uploadResponse.data.filePath;
          
          setFormData((prevState) => ({
            ...prevState,
            img: [
              ...(prevState.img || []),
              filePath,
            ],
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const removeImage = (i) => {
    setFiles(files.filter(file => file.name !== i));
    setFormData((prevFormData) => ({
      ...prevFormData,
      img: prevFormData.img.filter(file => file.name !== i),
    }));
  };

  const renderStep = (stepTitle) => {
    switch (stepTitle) {
      case "Product basic":
        return (
          <div>
            <ProductInput name="Product name" type="input" placeholder="Enter your product name." value={formData.name} onChange={(e) => handleFormDataChange({ ...formData, name: e.target.value })} />
            <ProductInput name="Product Detail" type="textarea" value={formData.description} placeholder="Write a few sentences about the product." onChange={(e) => handleFormDataChange({ ...formData, description: e.target.value })} />
          </div>
        );
      case "Product Details":
        return (
          <div>
            <div className='flex gap-5 justify-between'>
              <ProductSelect name="Type" options={['Select Type', 'Apparel', 'Accessories', 'Cosmetics', 'Home Goods', 'Others']} value={formData.type} onChange={(e) => handleFormDataChange({ ...formData, type: e.target.value })} />
              <ProductSelect name="Gender" options={['Select Gender', 'Unisex', 'Man', 'Woman']} value={formData.gender} onChange={(e) => handleFormDataChange({ ...formData, gender: e.target.value })} />
            </div>
            <div className='flex gap-5'>
              <ProductSelect name="Size" options={['Select Size', 'Small', 'Medium', 'Large', 'X-Large', 'None']} value={formData.size} onChange={(e) => handleFormDataChange({ ...formData, size: e.target.value })} />
              <ProductSelect name="Usability" options={['Select Usability', 'New', 'Like New', 'Lightly Used', 'Used']} value={formData.usability} onChange={(e) => handleFormDataChange({ ...formData, usability: e.target.value })} />
              <ProductInput name="Brand" type="input" value={formData.brand} onChange={(e) => handleFormDataChange({ ...formData, brand: e.target.value })} />
            </div>
          </div>
        );
      case "Product Image":
        return (
          <div className="h-fit flex justify-center items-center px-2">
            <div className="p-3 md:w-full text-black rounded-md">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-[#495057] px-6 py-10 hover:cursor-pointer" onClick={() => document.getElementById('file-upload').click()}>
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <span className='font-semibold text-indigo-600 dark:text-blue-500'>Upload a file</span>
                    <label htmlFor="file-upload">
                      <input id="file-upload" onChange={handleFileChange} multiple="multiple" name="files[]" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.img.map((file, key) => {
                  const fileName = file.split('/').pop();

                  return (
                    <div key={key} className='w-full h-16 flex items-center justify-between rounded p-3 bg-white dark:bg-[#212529]'>
                      <div className="flex flex-row items-center gap-2">
                        <div className="h-12 w-12">
                          <img className="w-full h-full rounded border dark:border-[#495057]" src={file} alt={key} />
                        </div>
                        <span className="truncate w-44 dark:text-white">{fileName}</span>
                      </div>
                      <div onClick={() => { removeImage(file.name) }} className="h-6 w-6 bg-red-400 hover:bg-red-500 flex items-center cursor-pointer justify-center rounded-sm">
                        <i className="text-white text-[14px]"><FontAwesomeIcon icon={faTrash} /></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case "Pricing":
        return (
          <div className='flex gap-5'>
            <ProductInput
              name="Price"
              type="number"
              value={formData.price}
              onChange={(e) => handleFormDataChange({ ...formData, price: e.target.value })}
            />
            <ProductInput
              name="Discounted Price"
              type="number"
              value={formData.dprice}
              onChange={(e) => handleFormDataChange({ ...formData, dprice: e.target.value })}
            />
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep(steps[currentStep])}
      <p className='text-red-500 text-right mb-5'>{errorMessage}</p>
      <div className='flex justify-between '>
        {currentStep > 0 && (
          <button onClick={handlePrevious} className="bg-red-500 hover-bg-red-700 text-white p-2 text-sm rounded-lg transition">Previous</button>
        )}
        {currentStep < steps.length - 1 && (
          <button onClick={handleNext} className="bg-green-500 hover-bg-green-700 text-white p-2 text-sm rounded-lg transition ml-auto">Next</button>
        )}
        {currentStep === steps.length - 1 && (
          <button onClick={handleReviewSubmit} className="bg-blue-500 hover-bg-blue-700 text-white p-2 text-sm rounded-lg transition ml-auto">Submit</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;

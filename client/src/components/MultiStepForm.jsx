import React, { useState } from 'react';
import ProductInput from './templates/ProductInput';
import axios from 'axios';
const MultiStepForm = ({ images,user }) => {
  const [formData, setFormData] = useState({
    name: 'name',
    description: 'detail',
    type: 'type',
    size: 'S',
    usability: 'Yeni',
    brand: 'Zara',
    img: 'https://cdn.dribbble.com/userupload/5977515/file/original-41bd824ef1a0898ae58ec7ff2e82a04f.png?resize=1024x768',
    price: '50',
    dprice: '35',
    gender: 'women',
    seller: user._id,
    asks: [],
    offers: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Product basic",
    "Product Details",
    "Pricing",
    "Review",
  ];
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
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
      ...newData
    });
  };

  async function handleReviewSubmit(){
    try {
        const response = await axios.post(`${process.env.REACT_APP_DB}/createProduct`, formData);
        if (response.data.error) {
          console.log(response.data.eror)
        } else {
          console.log(response.data)
        }
      } catch (error) {
        console.error('Hata oluştu: ', error);
      }
  };
  const renderStep = (stepTitle) => {
    switch (stepTitle) {
      case "Product basic":
        return (
            <div>
              <ProductInput name="Product name" type="input" value={formData.name} onChange={(e) =>handleFormDataChange({ ...formData, name: e.target.value })}/>
              <ProductInput name="Product Detail" type="textarea" value={formData.about} placeholder="Write a few sentences about product." onChange={(e) =>setFormData({ ...formData, description: e.target.value })}/>
            </div>
        );
      case "Product Details":
        return (
            <div>
                <div className='flex gap-5'>
                <ProductInput name="Type" type="input" value={formData.type} onChange={(e) =>handleFormDataChange({ ...formData, type: e.target.value })}/>
                <ProductInput name="Gender" type="input" value={formData.about} onChange={(e) =>handleFormDataChange({ ...formData, gender: e.target.value })}/>
                </div>
                <div className='flex gap-5'>
                <ProductInput name="Size" type="input" value={formData.size} onChange={(e) =>handleFormDataChange({ ...formData, size: e.target.value })}/>
                <ProductInput name="Usability" type="input" value={formData.usability} onChange={(e) =>handleFormDataChange({ ...formData, usability: e.target.value })}/>
                <ProductInput name="Brand" type="input" value={formData.brand} onChange={(e) =>handleFormDataChange({ ...formData, brand: e.target.value })}/>
                </div>
            </div>
        );
      case "Pricing":
        return (
                <div className='flex gap-5'>
                    <ProductInput name="Price" type="input" value={formData.price} onChange={(e) =>handleFormDataChange({ ...formData, price: e.target.value })}/>
                    <ProductInput name="Discounted Price" type="input" value={formData.dprice} onChange={(e) =>handleFormDataChange({ ...formData, dprice: e.target.value })}/>
                </div>
        );
      case "Review":
        return (
          <div>
            <h2>Review Your Information</h2>
            <p>Product Name: {formData.name}</p>
            <p>Product Description: {formData.description}</p>
            <p>Product Type: {formData.type}</p>
            <p>Gender: {formData.gender}</p>
            <p>Size: {formData.size}</p>
            <p>Usability: {formData.usability}</p>
            <p>Brand: {formData.brand}</p>
            <p>Price: {formData.price}</p>
            <p>Discounted Price: {formData.dprice}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep(steps[currentStep])}
      <div className='flex justify-between '>
        {currentStep > 0 && (
            <button onClick={handlePrevious} className="bg-red-500 hover:bg-red-800 text-white p-2 text-sm rounded-lg transition">Previous</button>
        )}
        {currentStep < steps.length - 1 && (
            <button onClick={handleNext} className="bg-green-500 hover:bg-green-700 text-white p-2 text-sm rounded-lg transition ml-auto">Next</button>
        )}
        {currentStep === steps.length - 1 && (
            <button onClick={handleReviewSubmit} className="bg-blue-500 hover:bg-blue-700 text-white p-2 text-sm rounded-lg transition ml-auto">Submit</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;

import React, { useState } from 'react';
import ProductInput from './templates/ProductInput';
import axios from 'axios';

const MultiStepForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: 'name',
    description: 'detail',
    type: 'type',
    size: 'S',
    usability: 'Yeni',
    brand: 'Zara',
    img: [],
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
    "Product Image",
    "Pricing",
    "Review",
  ];

  const handleNext = () => {
      if (formData.img.some(url => url.trim() === '')) {
        return;
      }
      setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (formData.img.some(url => url.trim() === '')) {
      return;
    }
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

  const addImageField = () => {
    if (formData.img.some(url => url.trim() === '')) {
      return;
    }
  
    // Yeni bir giriş alanı ekleyin
    setFormData({
      ...formData,
      img: [...formData.img, ''],
    });
  };

  const handleImageChange = (index, value) => {
    if (value !== '') {
      const updatedImages = [...formData.img];
      updatedImages[index] = value;
      setFormData({
        ...formData,
        img: updatedImages,
      });
    }
  };

  const removeImageField = (index) => {
    const updatedImages = [...formData.img];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      img: updatedImages,
    });
  };
  async function handleReviewSubmit() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_DB}/createProduct`, formData);
      if (response.data.error) {
        console.log(response.data.eror);
      } else {
        console.log(response.data);
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
            <ProductInput name="Product name" type="input" value={formData.name} onChange={(e) => handleFormDataChange({ ...formData, name: e.target.value })} />
            <ProductInput name="Product Detail" type="textarea" value={formData.about} placeholder="Write a few sentences about the product." onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
        );
      case "Product Details":
        return (
          <div>
            <div className='flex gap-5'>
              <ProductInput name="Type" type="input" value={formData.type} onChange={(e) => handleFormDataChange({ ...formData, type: e.target.value })} />
              <ProductInput name="Gender" type="input" value={formData.about} onChange={(e) => handleFormDataChange({ ...formData, gender: e.target.value })} />
            </div>
            <div className='flex gap-5'>
              <ProductInput name="Size" type="input" value={formData.size} onChange={(e) => handleFormDataChange({ ...formData, size: e.target.value })} />
              <ProductInput name="Usability" type="input" value={formData.usability} onChange={(e) => handleFormDataChange({ ...formData, usability: e.target.value })} />
              <ProductInput name="Brand" type="input" value={formData.brand} onChange={(e) => handleFormDataChange({ ...formData, brand: e.target.value })} />
            </div>
          </div>
        );
        case "Product Image":
          return (
            <div className='flex flex-col gap-5'>
              {formData.img.map((url, index) => (
                <div key={index}>
                  <ProductInput
                    name={`Image URL ${index + 1}`}
                    type="input"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                  <button onClick={() => removeImageField(index)} className="bg-red-500 hover:bg-red-700 text-white p-2 text-sm rounded-lg transition ml-auto">
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={addImageField} className="bg-blue-500 hover:bg-blue-700 my-5 text-white p-2 text-sm rounded-lg transition">
              Add Image
            </button>
          </div>
        )
      case "Pricing":
        return (
          <div className='flex gap-5'>
            <ProductInput
              name="Price"
              type="input"
              value={formData.price}
              onChange={(e) => handleFormDataChange({ ...formData, price: e.target.value })}
            />
            <ProductInput
              name="Discounted Price"
              type="input"
              value={formData.dprice}
              onChange={(e) => handleFormDataChange({ ...formData, dprice: e.target.value })}
            />
          </div>
        );
      case "Review":
        console.log(formData)
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
            <p>Images:</p>
            <ul>
              {formData.img.map((url, index) => (
                <li key={index}>{url}</li>
              ))}
            </ul>
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
          <button onClick={handlePrevious} className="bg-red-500 hover-bg-red-800 text-white p-2 text-sm rounded-lg transition">Previous</button>
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

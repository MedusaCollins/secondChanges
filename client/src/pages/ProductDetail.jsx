import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams() 

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DB}/woman/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [productId]);

  console.log(product)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <img src={product.img[0]} alt={product.name} />
      {/* Diğer ürün detaylarını buraya ekleyin */}
    </div>
  );
};

export default ProductDetail;

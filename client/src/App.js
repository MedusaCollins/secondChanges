import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Home from "./pages/Home.jsx";
import Man from "./pages/Man.jsx";
import Woman from "./pages/Woman.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
function App() {
  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/man" element={<Man/>}/>
          <Route path="/woman" element={<Woman/>}/>
          <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </>
)}

export default App;

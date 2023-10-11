import React, {useCallback, useState} from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Home from "./pages/Home.jsx";
import Man from "./pages/Man.jsx";
import Woman from "./pages/Woman.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ManageProduct from "./pages/ManageProduct.jsx";
function App() {
  const [user, setUser] = useState({})
  const [isLogging, setIsLogging] = useState(false);
  const handleLogin = useCallback((loggedIn, userData) => {
    setIsLogging(loggedIn);
    setUser(userData)
  }, []);
  return (
    <>
      <Header handleLogin={handleLogin} user={user} islogging={isLogging}/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/man" element={<Man/>}/>
          <Route path="/woman" element={<Woman/>}/>
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/myproduct/" element={<ManageProduct />} />
          
      </Routes>
    </>
)}

export default App;

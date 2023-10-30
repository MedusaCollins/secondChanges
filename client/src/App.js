import React, {useCallback, useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Global/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import MyProduct from "./pages/MyProduct.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import LikesPage from "./pages/LikesPage.jsx";
import SearchPage  from  "./pages/SearchPage.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";

function App() {
  const [user, setUser] = useState({})
  const [isLogging, setIsLogging] = useState(false);
  const [globalVariable, setGlobalVariable] = useState({
    darkmode: null
  })
  
  const handleLogin = useCallback((loggedIn, userData) => {
    setIsLogging(loggedIn);
    setUser(userData)
  }, []);

  useEffect(() => {
    const local = localStorage.getItem('darkmode');
    const isDarkMode=local==='true';
    setGlobalVariable({darkmode:isDarkMode});

    if(globalVariable.darkmode){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
  }, [globalVariable.darkmode]);

  return (
    <div className={`min-h-screen dark:bg-[#212529] dark:text-[#dee2e6] transition-all`}>
      <Header handleLogin={handleLogin} user={user} islogging={isLogging} globalVariable={globalVariable} setGlobalVariable={setGlobalVariable}/>
      <Routes>
          <Route path="/" element={<HomePage user={user} name="Home" handleLogin={handleLogin}/>}/>
          <Route path="/man" element={<HomePage user={user} filter={{gender: 'Man'}} name="Man" handleLogin={handleLogin}/>}/>
          <Route path="/woman" element={<HomePage user={user} filter={{gender: 'Women'}} name="Women" handleLogin={handleLogin}/>}/>
          <Route path="/cart" element={<Cart user={user} handleLogin={handleLogin} islogging={isLogging}/>}/>
          <Route path="/products/:productId" element={<ProductDetail user={user} islogging={isLogging} handleLogin={handleLogin}/>} />
          <Route path="/orders" element={<Orders user={user} islogging={isLogging}/>} />
          <Route path="/profiles/:userName" element={<UserDetail handleLogin={handleLogin} pUser={user}/>} />
          <Route path="/search/:name" element={<SearchPage user={user} handleLogin={handleLogin}/>}/>
          <Route path="/likes/:userName" element={<LikesPage user={user} handleLogin={handleLogin}/>}/>
          
          
          {Object.keys(user).length === 0?(<Route path="/myproducts/" element={<HomePage user={user} name="Home" handleLogin={handleLogin}/>}/>):(<Route path="/myproducts/" element={<MyProduct user={user} islogging={isLogging} handleLogin={handleLogin}/>} />)}
      </Routes>
    </div>
)}

export default App;

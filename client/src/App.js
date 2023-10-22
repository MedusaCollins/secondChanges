import React, {useCallback, useState} from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Global/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import MyProduct from "./pages/MyProduct.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import LikesPage from "./pages/LikesPage.jsx";

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
          <Route path="/" element={<HomePage user={user} name="Home" handleLogin={handleLogin}/>}/>
          <Route path="/man" element={<HomePage user={user} filter={{gender: 'Man'}} name="Man" handleLogin={handleLogin}/>}/>
          <Route path="/woman" element={<HomePage user={user} filter={{gender: 'Women'}} name="Women" handleLogin={handleLogin}/>}/>
          <Route path="/products/:productId" element={<ProductDetail user={user}/>} />
          <Route path="/profiles/:userName" element={<UserDetail handleLogin={handleLogin} pUser={user}/>} />
          <Route path="/likes/:userName" element={<LikesPage user={user} name="Home" handleLogin={handleLogin}/>}/>
          
          {Object.keys(user).length === 0?(<Route path="/myproducts/" element={<HomePage user={user} name="Home" handleLogin={handleLogin}/>}/>):(<Route path="/myproducts/" element={<MyProduct user={user} islogging={isLogging} handleLogin={handleLogin}/>} />)}
      </Routes>
    </>
)}

export default App;

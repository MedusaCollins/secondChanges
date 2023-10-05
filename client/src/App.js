import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Home from "./pages/Home.jsx";
import Man from "./pages/Man.jsx";
import Woman from "./pages/Woman.jsx";
import Kids from "./pages/Kids.jsx"
function App() {
  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/man" element={<Man/>}/>
          <Route path="/woman" element={<Woman/>}/>
          <Route path="/kids" element={<Kids/>} />
      </Routes>
    </>
)}

export default App;

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
const App = () => {
  return (
    <>
         <Routes>
 <Route path="/" element={< Homepage/>} />

<Route path="/signup" element={< Signup/>} />



         </Routes>

    </>
  )
}

export default App

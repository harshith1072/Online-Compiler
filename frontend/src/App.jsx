 import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProblemList from "./components/ProblemList";
import FetchSingleProblem from "./components/FetchSingleProblem";
import CodeEditor from "./components/CodeEditor";
import Solutions from "./components/Solutions";
import ProtectedRoute from "./components/ProtectedRoute";
import Submissions from "./components/Submissions";
import Footer from "./components/Footer";
import './Styles/App.css'; 

const App = () => {
  return (
    <div className="app-container">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/problems" element={<ProtectedRoute><ProblemList /></ProtectedRoute>} />
          <Route path="/codeEditor" element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
          <Route path="/problems/:id" element={<ProtectedRoute><FetchSingleProblem /></ProtectedRoute>} />
          <Route path="/solutions/:id" element={<ProtectedRoute><Solutions /></ProtectedRoute>} />
          <Route path="/submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
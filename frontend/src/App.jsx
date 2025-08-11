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
import Submissions from "./components/Submissions"; // ✅ Import the new component
import SubmissionDetail from "./components/SubmissionDetail";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* ✅ Wrap your protected routes with ProtectedRoute */}
      <Route path="/problems" element={<ProtectedRoute><ProblemList /></ProtectedRoute>} />
      <Route path="/codeEditor" element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
      <Route path="/problems/:id" element={<ProtectedRoute><FetchSingleProblem /></ProtectedRoute>} />
      <Route path="/solutions/:id" element={<ProtectedRoute><Solutions /></ProtectedRoute>} />
      
      {/* ✅ Add the new route for My Submissions */}
      <Route path="/submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} />
   <Route path="/submissions/:id" element={<ProtectedRoute><SubmissionDetail /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
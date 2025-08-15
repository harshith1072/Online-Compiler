 
// import { Routes, Route } from "react-router-dom";

// import Homepage from "./components/Homepage";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import NotFound from "./components/NotFound";
// import ProblemList from "./components/ProblemList";
// import FetchSingleProblem from "./components/FetchSingleProblem";
// import CodeEditor from "./components/CodeEditor";
// import Solutions from "./components/Solutions";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Submissions from "./components/Submissions"; // ✅ Import the new component
// import SubmissionDetail from "./components/SubmissionDetail";
// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Homepage />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
      
//       {/* ✅ Wrap your protected routes with ProtectedRoute */}
//       <Route path="/problems" element={<ProtectedRoute><ProblemList /></ProtectedRoute>} />
//       <Route path="/codeEditor" element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
//       <Route path="/problems/:id" element={<ProtectedRoute><FetchSingleProblem /></ProtectedRoute>} />
//       <Route path="/solutions/:id" element={<ProtectedRoute><Solutions /></ProtectedRoute>} />
      
//       {/* ✅ Add the new route for My Submissions */}
//       <Route path="/submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} />
//    <Route path="/submissions/:id" element={<ProtectedRoute><SubmissionDetail /></ProtectedRoute>} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;











// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Homepage from "./components/Homepage";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import NotFound from "./components/NotFound";
// import ProblemList from "./components/ProblemList";
// import FetchSingleProblem from "./components/FetchSingleProblem";
// import CodeEditor from "./components/CodeEditor";
// import Solutions from "./components/Solutions";
// import Submissions from "./components/Submissions";
// import './Styles/App.css';

// const App = () => {
//   return (
//     <div className="app-container">
//       <div className="main-content">
//         <Routes>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/problems" element={<ProblemList />} />
//           <Route path="/codeEditor" element={<CodeEditor />} />
//           <Route path="/problems/:id" element={<FetchSingleProblem />} />
//           <Route path="/solutions/:id" element={<Solutions />} />
//           <Route path="/submissions" element={<Submissions />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;

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
import Submissions from "./components/Submissions";
import SubmissionDetail from "./components/SubmissionDetail";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminDashboard from "./components/AdminDashboard"; // Import the new AdminDashboard component
 import Edit from "./components/Edit";
import CreateProblem  from "./components/CreateProblem";
import CreateTestcase  from "./components/CreateTestcase";

import './Styles/App.css';

const App = () => {
    return (
        <div className="app-container">
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/problems" element={<ProblemList />} />
                    <Route path="/codeEditor" element={<CodeEditor />} />
                    <Route path="/problems/:id" element={<FetchSingleProblem />} />
                    <Route path="/solutions/:id" element={<Solutions />} />
                    <Route path="/submissions" element={<Submissions />} />
                 
                    <Route path="/submissions/:id" element={<SubmissionDetail />} /> 
                    {/* Admin Routes */}
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin-register" element={<AdminRegister />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* New dashboard route */}
               <Route path="/admin/edit/:id" element={<Edit />} /> 
                   <Route path="/admin/create" element={<CreateProblem/>} /> 
                    <Route path="/admin/create-testcase" element={<CreateTestcase/>} /> 

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;

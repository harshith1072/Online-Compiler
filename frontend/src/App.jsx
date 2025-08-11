// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Homepage from "./components/Homepage";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import NotFound from "./components/NotFound";
// import ProblemList from "./components/ProblemList";
// import FetchSingleProblem from "./components/FetchSingleProblem";
// import CodeEditor from "./components/CodeEditor"; 

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Homepage />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/problems" element={<ProblemList />} />
//       <Route path="/codeEditor" element={<CodeEditor />} />
//       <Route path="/problems/:id" element={<FetchSingleProblem />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/problems" element={<ProblemList />} />
      <Route path="/codeEditor" element={<CodeEditor />} />
      <Route path="/problems/:id" element={<FetchSingleProblem />} />
      <Route path="/solutions/:id" element={<Solutions />} /> 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
 

// export default ProblemList;
import React from "react";
import "../Styles/ProblemList.css";
// import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ProblemList = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="container-problem-list">
        <div className="title">
          <h1> Problems List</h1>
        </div>
        <div className="problem-list">
          <ul className="problem-items">
            <li className="easy"><Link to="/problems/0">Binary Search</Link></li>
            <li className="medium"><Link to="/problems/1"> Next Greater Element I</Link></li>
            <li className="hard"><Link to="/problems/2">Median Of Two Sorted Arrays</Link></li>
            <li className="easy"><Link to="/problems/3">Valid Parenthesis</Link></li>
            {/* <li className="medium"><Link to="/problems/4">Valid Sudoku</Link></li> */}
            <li className="hard"><Link to="/problems/5"> House Robber 2</Link></li>
            <li className="easy"><Link to="/problems/6">Jump Game II</Link></li>
            <li className="medium"><Link to="/problems/7">Minimum Number of Days to Make m Bouquets</Link></li>
            <li className="hard"><Link to="/problems/8">Koko Eating Bananas</Link></li>
           
             <li className="hard"><Link to="/problems/9">Subarray Sum Equals K</Link></li>


          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProblemList;





 
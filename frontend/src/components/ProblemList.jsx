 

// // export default ProblemList;
// import React from "react";
// import "../Styles/ProblemList.css";
// // import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Link } from "react-router-dom";

// const ProblemList = () => {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className="container-problem-list">
//         <div className="title">
//           <h1> Problems List</h1>
//         </div>
//         <div className="problem-list">
//           <ul className="problem-items">
//             <li className="easy"><Link to="/problems/0">Binary Search</Link></li>
//             {/* <li className="medium"><Link to="/problems/1"> Next Greater Element I</Link></li>
//             <li className="hard"><Link to="/problems/2">Median Of Two Sorted Arrays</Link></li> */}
//             {/* <li className="easy"><Link to="/problems/3">Valid Parenthesis</Link></li> */}
//             {/* <li className="medium"><Link to="/problems/4">Valid Sudoku</Link></li> */}
//             <li className="hard"><Link to="/problems/5"> House Robber 2</Link></li>
//             <li className="easy"><Link to="/problems/6">Jump Game II</Link></li>
//             <li className="medium"><Link to="/problems/7">Minimum Number of Days to Make m Bouquets</Link></li>
//             {/* <li className="hard"><Link to="/problems/8">Koko Eating Bananas</Link></li> */}
           
//              <li className="hard"><Link to="/problems/9">Subarray Sum Equals K</Link></li>


//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProblemList;



import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../Styles/ProblemList.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ProblemList = () => {
    const [problems, setProblems] = useState([]); // State to store the problems
    const [loading, setLoading] = useState(true); // State for loading indicator

    // Fetch problems from the backend when the component mounts
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                // Adjust this URL if your problems route is different (e.g., /api/problems)
                const response = await axios.get("http://localhost:9000/problems");
                setProblems(response.data); // Store the fetched data in state
            } catch (error) {
                console.error("Error fetching problems:", error);
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchProblems();
    }, []); // Empty dependency array ensures this runs only once

    if (loading) {
        return <div className="loading">Loading problems...</div>;
    }

    return (
        <>
            <div className="container-problem-list">
                <div className="title">
                    <h1> Problems List</h1>
                </div>
                <div className="problem-list">
                    <ul className="problem-items">
                        {problems.map((problem) => (
                            <li key={problem._id} className={problem.difficulty}>
                                {/* The difficulty level is used as the class name */}
                                <Link to={`/problems/${problem._id}`}>
                                    {problem.title}
                                </Link>
                                {/* Display other data like difficulty and tags */}
                                <div className="problem-details">
                                    <span className="problem-difficulty">{problem.difficulty}</span>
                                    {problem.tags && problem.tags.length > 0 && (
                                        <span className="problem-tags">{problem.tags.join(', ')}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProblemList;





 
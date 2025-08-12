import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../Styles/ProblemList.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ProblemList = () => {
  const [problems, setProblems] = useState([]); 
 const [loading, setLoading] = useState(true); 

 useEffect(() => {
 const fetchProblems = async () => {
 try {
  const response = await axios.get("http://localhost:9000/problems");
 setProblems(response.data); 
 } catch (error) {
 console.error("Error fetching problems:", error);
 } finally {
 setLoading(false); 
 }
 };
 fetchProblems();
 }, []); 

 if (loading) {
 return <div className="loading">Loading problems...</div>;
 }

 return (
 <>
            <div className="container-problem-list">
                <div className="problem-list-header">
                    <div className="title">
                        <h1>Problems List</h1>
                    </div>
                    <div className="list-buttons">
                        <Link to="/submissions" className="list-button">View Submissions</Link>
                        {/* Feedback button removed */}
                    </div>
                </div>
                <div className="problem-list">
                    <ul className="problem-items">
                        {problems.map((problem) => (
                            <li key={problem._id} className={problem.difficulty}>
                                <Link to={`/problems/${problem._id}`}>
                                    {problem.title}
                                </Link>
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

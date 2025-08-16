 
 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Submissions.css";
 
import { FiTrash2 } from 'react-icons/fi'; // ✅ Imported a delete icon
// const SERVER_URL = "http://localhost:9000";
const SERVER_URL = "https://codejudge-lfe8.onrender.com";
const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDeleteSubmission = async (e, submissionId) => {
        // Prevent the link from being clicked
        e.preventDefault(); 
        
        if (window.confirm("Are you sure you want to delete this submission?")) {
            try {
                // ✅ Make a DELETE request to your backend
                const response = await axios.delete(
                    `https://codejudge-lfe8.onrender.com/${submissionId}`, 
                    { withCredentials: true }
                );
                             
                
//                 const response = await axios.delete(
//     `${SERVER_URL}/submissions/${submissionId}`,
//     { withCredentials: true }
// );
               
                
                if (response.status === 200) {
                    // Update state to remove the deleted submission from the UI
                    setSubmissions(prevSubmissions => 
                        prevSubmissions.filter(sub => sub._id !== submissionId)
                    );
                    alert("Submission deleted successfully!");
                }
            } catch (error) {
                console.error("Error deleting submission:", error);
                alert("Failed to delete submission.");
            }
        }
    };

    useEffect(() => {
        const fetchUserSubmissions = async () => {
            try {
                const response = await axios.get("https://codejudge-lfe8.onrender.com/submissions/user", {
                    withCredentials: true,
                });
//                                const response = await axios.get(
//     `${SERVER_URL}/submissions/user`,
//     { withCredentials: true }
// );
                setSubmissions(response.data);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserSubmissions();
    }, []);

    if (loading) {
        return <div className="submissions-page-container">Loading submissions...</div>;
    }

    return (
        <>
            <div className="submissions-page-container">
                <div className="submissions-header">
                    <h1>My Submissions</h1>
                </div>
                <div className="submissions-list-container">
                    {submissions.length > 0 ? (
                        <ul className="submissions-list">
                            {submissions.map((sub) => (
                                <li key={sub._id} className={`submission-item ${sub.status}`}>
                                    <Link to={`/submissions/${sub._id}`} className="submission-link">
                                        <div className="submission-title">
                                            Problem: {sub.problem_id?.title || "Unknown Problem"}
                                        </div>
                                        <div className="submission-details">
                                            <span className="submission-language">Lang: {sub.language}</span>
                                            <span className={`submission-status`}>{sub.status}</span>
                                            <span className="submission-time">
                                                Time: {new Date(sub.submission_time).toLocaleString()}
                                            </span>
                                        </div>
                                    </Link>
                                    {/* ✅ Added the delete button */}
                                    <button 
                                        className="delete-button" 
                                        onClick={(e) => handleDeleteSubmission(e, sub._id)}
                                        title="Delete Submission"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-submissions">No submissions found.</div>
                    )}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Submissions;





















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../Styles/Submissions.css";
// import Footer from "./Footer";
// import { FiTrash2 } from 'react-icons/fi'; // ✅ Imported a delete icon
//   const SERVER_URL = config.SERVER_URL;
// const Submissions = () => {
//     const [submissions, setSubmissions] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const handleDeleteSubmission = async (e, submissionId) => {
//         // Prevent the link from being clicked
//         e.preventDefault(); 
        
//         if (window.confirm("Are you sure you want to delete this submission?")) {
//             try {
//                 // ✅ Make a DELETE request to your backend
//                 // const response = await axios.delete(
//                 //     `http://localhost:9000/submissions/${submissionId}`, 
//                 //     { withCredentials: true }
//                 // );
//                  const response = await axios.delete(
//     `${SERVER_URL}/submissions/${submissionId}`,
//     { withCredentials: true }
// );
                
//                 if (response.status === 200) {
//                     // Update state to remove the deleted submission from the UI
//                     setSubmissions(prevSubmissions => 
//                         prevSubmissions.filter(sub => sub._id !== submissionId)
//                     );
//                     alert("Submission deleted successfully!");
//                 }
//             } catch (error) {
//                 console.error("Error deleting submission:", error);
//                 alert("Failed to delete submission.");
//             }
//         }
//     };

//     useEffect(() => {
//         const fetchUserSubmissions = async () => {
//             try {
//                 // const response = await axios.get("http://localhost:9000/submissions/user", {
//                 //     withCredentials: true,
//                 // });
//                 const response = await axios.get(
//     `${SERVER_URL}/submissions/user`,
//     { withCredentials: true }
// );
//                 setSubmissions(response.data);
//             } catch (error) {
//                 console.error("Error fetching submissions:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUserSubmissions();
//     }, []);

//     if (loading) {
//         return <div className="submissions-page-container">Loading submissions...</div>;
//     }

//     return (
//         <>
//             <div className="submissions-page-container">
//                 <div className="submissions-header">
//                     <h1>My Submissions</h1>
//                 </div>
//                 <div className="submissions-list-container">
//                     {submissions.length > 0 ? (
//                         <ul className="submissions-list">
//                             {submissions.map((sub) => (
//                                 <li key={sub._id} className={`submission-item ${sub.status}`}>
//                                     <Link to={`/submissions/${sub._id}`} className="submission-link">
//                                         <div className="submission-title">
//                                             Problem: {sub.problem_id?.title || "Unknown Problem"}
//                                         </div>
//                                         <div className="submission-details">
//                                             <span className="submission-language">Lang: {sub.language}</span>
//                                             <span className={`submission-status`}>{sub.status}</span>
//                                             <span className="submission-time">
//                                                 Time: {new Date(sub.submission_time).toLocaleString()}
//                                             </span>
//                                         </div>
//                                     </Link>
//                                     {/* ✅ Added the delete button */}
//                                     <button 
//                                         className="delete-button" 
//                                         onClick={(e) => handleDeleteSubmission(e, sub._id)}
//                                         title="Delete Submission"
//                                     >
//                                         <FiTrash2 size={20} />
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <div className="no-submissions">No submissions found.</div>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Submissions;
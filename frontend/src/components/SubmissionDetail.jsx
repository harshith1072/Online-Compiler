// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// const SubmissionDetail = () => {
//     const { id } = useParams();
//     const [submission, setSubmission] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSubmission = async () => {
//             try {
//                 // ✅ Fetch a single submission by its ID
//                 const response = await axios.get(
//                     `http://localhost:9000/submissions/${id}`, 
//                     { withCredentials: true }
//                 );
//                 setSubmission(response.data);
//             } catch (error) {
//                 console.error("Error fetching submission details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchSubmission();
//     }, [id]);

//     if (loading) {
//         return <div>Loading submission details...</div>;
//     }

//     if (!submission) {
//         return <div>Submission not found.</div>;
//     }

//     return (
//         <div className="submission-detail-container">
//             <h1>Submission for {submission.problem_id?.title || "Unknown Problem"}</h1>
//             <div className="submission-metadata">
//                 <p>Status: <span className={submission.status}>{submission.status}</span></p>
//                 <p>Language: {submission.language}</p>
//                 <p>Submitted On: {new Date(submission.submission_time).toLocaleString()}</p>
//             </div>
//             <div className="submission-code">
//                 <h3>Your Code:</h3>
//                 <SyntaxHighlighter language={submission.language} style={docco}>
//                     {submission.submission_code}
//                 </SyntaxHighlighter>
//             </div>
//         </div>
//     );
// };

// export default SubmissionDetail;



































import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
  const SERVER_URL = "http://localhost:9000";
const SubmissionDetail = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                // ✅ Fetch a single submission by its ID
                // const response = await axios.get(
                //     `http://localhost:9000/submissions/${id}`, 
                //     { withCredentials: true }
                // );
              
                     const response = await axios.get(
                           `${SERVER_URL}/submissions/${id}`,
                                { withCredentials: true }
                                 );



                setSubmission(response.data);
            } catch (error) {
                console.error("Error fetching submission details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [id]);

    if (loading) {
        return <div>Loading submission details...</div>;
    }

    if (!submission) {
        return <div>Submission not found.</div>;
    }

    return (
        <div className="submission-detail-container">
            <h1>Submission for {submission.problem_id?.title || "Unknown Problem"}</h1>
            <div className="submission-metadata">
                <p>Status: <span className={submission.status}>{submission.status}</span></p>
                <p>Language: {submission.language}</p>
                <p>Submitted On: {new Date(submission.submission_time).toLocaleString()}</p>
            </div>
            <div className="submission-code">
                <h3>Your Code:</h3>
                <SyntaxHighlighter language={submission.language} style={docco}>
                    {submission.submission_code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default SubmissionDetail;
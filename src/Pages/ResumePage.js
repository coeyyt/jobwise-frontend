// import { React, useState, useEffect } from "react";

// import ResumeForm from "../Components/ResumeForm";
// import { BACKEND_URL } from "../constants.js";
// import axios from "axios";

// const ResumePage = () => {
//   const [resumes, setResumes] = useState([]);

//   useEffect(() => {
//     getResume();
//     return;
//   }, []);
//   const getResume = async () => {
//     const response = await axios.get(`${BACKEND_URL}/resumes/1`);
//     setResumes([response.data]); // or setResumes(response.data) based on the expected data structure
//     console.log(response.data);
//   };

//   const originalResume = <div> {resumes[0]?.resume_content}</div>;

//   return (
//     <div>
//       <ResumeForm />
//       {originalResume}
//     </div>
//   );
// };
// export default ResumePage;
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ResumeForm from "../Components/ResumeForm";
import { BACKEND_URL } from "../constants";

const ResumePage = () => {
  const [resume, setResume] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchResume();
    }
  }, [user, isAuthenticated]);

  const fetchResume = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/resumes/user/${user.sub}`
      );
      if (response.data) {
        setResume(response.data);
      }
    } catch (err) {
      console.error("Error fetching resume:", err);
      // Handle no resume found or other errors
    }
  };

  const handleFormSubmit = async (resumeData) => {
    // Handle resume form submission
    try {
      await axios.post(`${BACKEND_URL}/resumes`, {
        ...resumeData,
        user_auth0_user_id: user.sub,
      });
      fetchResume(); // Re-fetch the resume
    } catch (err) {
      console.error("Error submitting resume:", err);
      // Handle submission error
    }
  };

  return (
    <div>
      {resume ? (
        <div className="OriginalResume">{resume.resume_content}</div>
      ) : (
        <div className="ResumeFormContainer">
          <ResumeForm onFormSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default ResumePage;

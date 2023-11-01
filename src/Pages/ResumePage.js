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
import { useAuth0 } from "@auth0/auth0-react";

import { React, useState, useEffect } from "react";
import ResumeForm from "../Components/ResumeForm";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const ResumePage = () => {
  const [resumes, setResumes] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { user } = useAuth0();
  useEffect(() => {
    // Check if the form has been submitted before from local storage
    const formStatus = localStorage.getItem("formSubmitted");
    if (formStatus) {
      setFormSubmitted(true);
    }
  }, []);

  useEffect(() => {
    setFormSubmitted(false); // Reset the formSubmitted state when user changes
  }, [user]);

  useEffect(() => {
    getResume();
  }, [formSubmitted]);

  const getResume = async () => {
    const response = await axios.get(`${BACKEND_URL}/resumes/1`);
    setResumes([response.data]);
    console.log(response.data);
  };

  const handleFormSubmit = () => {
    // Set formSubmitted state to true
    setFormSubmitted(true);
    // Store the form submission status to local storage
    localStorage.setItem("formSubmitted", "true");
  };

  const originalResume = formSubmitted ? (
    <div className="OriginalResume">{resumes[0]?.resume_content}</div>
  ) : null;

  return (
    <div>
      {!formSubmitted && (
        <div className="ResumeFormContainer">
          <ResumeForm onFormSubmit={handleFormSubmit} />
        </div>
      )}
      {originalResume}
    </div>
  );
};

export default ResumePage;

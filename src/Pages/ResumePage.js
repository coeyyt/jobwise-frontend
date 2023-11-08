// import React, { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";
// import ResumeForm from "../Components/ResumeForm";
// import { BACKEND_URL } from "../constants";

// const ResumePage = () => {
//   const [resume, setResume] = useState(null);
//   const { user, isAuthenticated } = useAuth0();
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       fetchResume();
//     }
//   }, [user, isAuthenticated]);

//   const fetchResume = async () => {
//     try {
//       const response = await axios.get(
//         `${BACKEND_URL}/resumes/user/${user.sub}`
//       );
//       console.log("Fetched resume data:", response.data);

//       if (response.data) {
//         setResume(response.data);
//       }
//     } catch (err) {
//       console.error("Error fetching resume:", err);
//       // Handle no resume found or other errors
//     }
//   };

//   const handleFormSubmit = async (resumeData) => {
//     try {
//       const resumeResponse = await axios.get(
//         `${BACKEND_URL}/resumes/id/user/${user.sub}`
//       );
//       const resume_id = resumeResponse.data.resume_id;
//       console.log("Resume id from backend", resume_id);

//       if (!resume || !resume_id) {
//         console.error("Invalid resume data. Cannot update.");
//         return;
//       }

//       const method = "put"; // Since you are updating, it should always be 'put'
//       const url = `${BACKEND_URL}/resumes/${resume_id}`;

//       await axios[method](url, {
//         ...resumeData,
//         user_auth0_user_id: user.sub,
//       });

//       fetchResume(); // Re-fetch the resume
//       setIsEditing(false); // Exit editing mode
//     } catch (err) {
//       console.error("Error submitting resume:", err);
//       // Handle submission error
//     }
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <div className="ResumeFormContainer">
//           <ResumeForm
//             onFormSubmit={handleFormSubmit}
//             initialData={resume ? resume.resume_content : ""}
//           />
//         </div>
//       ) : resume ? (
//         <div className="OriginalResume">
//           {resume.resume_content}
//           <button onClick={handleEditClick}>Edit</button>
//         </div>
//       ) : (
//         <div>No resume found. Please add one.</div>
//       )}
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
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(""); // New state for editable content

  const handleContentChange = (newContent) => {
    setEditableContent(newContent);
  };

  const toggleEdit = () => {
    setEditableContent(resume.resume_content); // Set editable content to current resume content
    setIsEditing(!isEditing);
  };

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
      console.log("Fetched resume data:", response.data);

      if (response.data) {
        setResume(response.data);
      }
    } catch (err) {
      console.error("Error fetching resume:", err);
      // Handle no resume found or other errors
    }
  };

  const handleFormSubmit = async (resumeData) => {
    try {
      const resumeResponse = await axios.get(
        `${BACKEND_URL}/resumes/id/user/${user.sub}`
      );
      const resume_id = resumeResponse.data.resume_id;
      console.log("Resume id from backend", resume_id);

      if (!resume || !resume_id) {
        console.error("Invalid resume data. Cannot update.");
        return;
      }

      const method = "put"; // Since you are updating, it should always be 'put'
      const url = `${BACKEND_URL}/resumes/${resume_id}`;

      await axios[method](url, {
        ...resumeData,
        user_auth0_user_id: user.sub,
      });

      fetchResume(); // Re-fetch the resume
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      console.error("Error submitting resume:", err);
      // Handle submission error
    }
  };

  return (
    <div>
      {resume && !isEditing ? (
        <div className="OriginalResume">
          {resume.resume_content}
          <button onClick={toggleEdit}>Edit</button> {/* Edit button */}
        </div>
      ) : (
        <div className="ResumeFormContainer">
          <ResumeForm
            onFormSubmit={handleFormSubmit}
            initialData={editableContent}
            onContentChange={handleContentChange} // Prop to handle content change
          />
          {resume && (
            <button onClick={toggleEdit}>Cancel</button> // Button to cancel editing
          )}
        </div>
      )}
    </div>
  );
};

export default ResumePage;

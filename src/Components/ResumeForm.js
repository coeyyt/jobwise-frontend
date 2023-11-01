import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

const ResumeForm = ({ onFormSubmit }) => {
  const [resumeContent, setresumeContent] = useState("");
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleChange = (event) => {
    if (event.target.name === "resume_content") {
      setresumeContent(event.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/resumes`, {
        resumeContent,
      });
      setresumeContent("");
      onFormSubmit();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-resume-form">
      <h2>Add Resume</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Resume Content:</label>
          <input
            type="string"
            name="resume_content"
            value={resumeContent}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;

import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react"; // Import the hook from Auth0

const JDForm = ({ setResumeResponse }) => {
  const [company_name, setcompanyName] = useState("");
  const [job_title, setjobTitle] = useState("");
  const [job_description, setjobDescription] = useState("");
  const [resume_id, setresumeId] = useState("");

  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Destructure methods from Auth0

  const handleChange = (event) => {
    switch (event.target.name) {
      case "company_name":
        setcompanyName(event.target.value);
        break;
      case "job_title":
        setjobTitle(event.target.value);
        break;
      case "job_description":
        setjobDescription(event.target.value);
        break;
      case "resume_id":
        setresumeId(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        loginWithRedirect();
        return;
      }

      // Send post req
      const response = await axios.post(`${BACKEND_URL}/jobapplications`, {
        company_name,
        job_title,
        job_description,
        resume_id,
      });

      console.log("Response from backend:", response.data);
      if (response.data && response.data.customizedResume) {
        setResumeResponse(response.data.customizedResume);
      }
      console.log(
        "customized resume from backend:",
        response.data.customizedResume
      );
    } catch (err) {
      console.log(err);
    }

    setcompanyName("");
    setjobTitle("");
    setjobDescription("");
    setresumeId("");
  };

  return (
    <div className="add-job-form">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Comapny Name:</label>
          <input
            type="string"
            name="company_name"
            value={company_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Job Title:</label>
          <input
            type="string"
            name="job_title"
            value={job_title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Job Description</label>
          <input
            type="string"
            name="job_description"
            value={job_description}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>resumeId</label>
          <input
            type="number"
            name="resume_id"
            value={resume_id}
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

export default JDForm;

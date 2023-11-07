import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

const JDForm = ({ setResumeResponse }) => {
  const [company_name, setcompanyName] = useState("");
  const [job_title, setjobTitle] = useState("");
  const [job_description, setjobDescription] = useState("");
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "company_name") setcompanyName(value);
    else if (name === "job_title") setjobTitle(value);
    else if (name === "job_description") setjobDescription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    try {
      // Fetch the resume ID based on the Auth0 user ID
      console.log(
        "Making request to URL:",
        `${BACKEND_URL}/resumes/id/user/${user.sub}`
      );

      const resumeResponse = await axios.get(
        `${BACKEND_URL}/resumes/id/user/${user.sub}`
      );
      const resume_id = resumeResponse.data.resume_id;
      console.log("Resume id from backend", resume_id);
      // Send post request for job application
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
    } catch (err) {
      console.error("Error fetching resume ID:", err);
      if (err.response) {
        // The server responded with a status code outside the 2xx range
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      }
    }

    // Reset form fields
    setcompanyName("");
    setjobTitle("");
    setjobDescription("");
  };

  return (
    <div className="add-job-form">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Company Name:</label>
          <input
            type="text"
            name="company_name"
            value={company_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Job Title:</label>
          <input
            type="text"
            name="job_title"
            value={job_title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Job Description:</label>
          <input
            type="text"
            name="job_description"
            value={job_description}
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

import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

const JDForm = ({ setResumeResponse }) => {
  const [company_name, setcompanyName] = useState("");
  const [job_title, setjobTitle] = useState("");
  const [job_description, setjobDescription] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(false); // New state variable
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true); // Set loading to true when starting the request

      return;
    }
    setIsLoading(true); // Set loading to true when starting the request

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
        user_auth0_user_id: user.sub,
      });
      setSubmissionStatus(true);

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
    setIsLoading(false); // Set loading to false when request is complete

    setcompanyName("");
    setjobTitle("");
    setjobDescription("");
    setSubmissionStatus(false); // Reset submission status
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
          <input type="submit" value="Submit" disabled={isLoading} />
          {isLoading && <div>Loading...</div>} {/* Loading indicator */}
        </div>
      </form>
      {/* Conditionally display submission message */}
      {submissionStatus && (
        <div className="submission-message">
          Your JD has been submitted successfully.
        </div>
      )}
    </div>
  );
};

export default JDForm;

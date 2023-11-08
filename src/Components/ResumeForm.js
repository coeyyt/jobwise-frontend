import React, { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const ResumeForm = ({ onFormSubmit, initialData, onContentChange }) => {
  const [resumeContent, setResumeContent] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  // Update local state when initialData changes
  useEffect(() => {
    setResumeContent(initialData);
  }, [initialData]);

  const handleChange = (event) => {
    setResumeContent(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (!user || !user.sub) {
      console.error("User ID not available");
      return;
    }

    try {
      await onFormSubmit({ resume_content: resumeContent });
      setResumeContent("");
      setFeedbackMessage("Resume submitted successfully.");
      setIsError(false);
    } catch (err) {
      console.error(err);
      setFeedbackMessage(
        err.response?.data?.message ||
          "An error occurred while submitting the resume."
      );
      setIsError(true);
    }
  };

  return (
    <div className="add-resume-form">
      <h2>{initialData ? "Edit Resume" : "Add Resume"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Resume Content:</label>
          <textarea
            name="resume_content"
            value={resumeContent}
            onChange={handleChange}
            placeholder="Paste your resume content here"
          />
        </div>

        <div className="form-field">
          <button type="submit">
            {initialData ? "Save Changes" : "Submit"}
          </button>
        </div>

        {feedbackMessage && (
          <div className={isError ? "error-message" : "success-message"}>
            {feedbackMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default ResumeForm;

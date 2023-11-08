// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import JDForm from "../Components/JDForm";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import { useAuth0 } from "@auth0/auth0-react";
// import { BACKEND_URL } from "../constants";

// const CustomizedResumePage = () => {
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const { isAuthenticated, loginWithRedirect } = useAuth0();
//   const [resumeContent, setResumeContent] = useState("");
//   const [jdFormHistory, setJdFormHistory] = useState([]);
//   const { getAccessTokenSilently, user } = useAuth0();
//   const [selectedJobApplication, setSelectedJobApplication] = useState(null);
//   const [applicationStatus, setApplicationStatus] = useState({});
//   const applicationStatusOptions = [
//     "Draft",
//     "Submitted",
//     "Under Review",
//     "Interview",
//     "Offer Extended",
//     "Accepted Offer",
//     "Rejected",
//     "Withdrawn",
//   ];

//   // Function to fetch the current status
//   const fetchApplicationStatus = async (jdFormId) => {
//     if (!user || !jdFormId) {
//       console.error("User or jdFormId is undefined. Skipping fetch.");
//       return;
//     }
//     console.log(
//       `Fetching status for job application ID: ${jdFormId} and user: ${user.sub}`
//     );

//     try {
//       const statusResponse = await axios.get(
//         `${BACKEND_URL}/status/getStatus/${jdFormId}/${user.sub}`
//       );
//       console.log(`Status response:`, statusResponse);

//       if (statusResponse.status === 200) {
//         setApplicationStatus((prevStatus) => ({
//           ...prevStatus,
//           [jdFormId]: statusResponse.data.application.status,
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching status:", error);
//     }
//   };

//   // Function to update the status
//   const updateApplicationStatus = async () => {
//     if (!selectedJobApplication) return;

//     try {
//       const token = await getAccessTokenSilently();
//       await axios.post(
//         `${BACKEND_URL}/status/updateStatus`,
//         {
//           status: applicationStatus,
//           job_application_id: selectedJobApplication.id,
//           user_auth0_user_id: user.sub,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // Handle successful update (e.g., fetch updated JD forms or show a message)
//     } catch (error) {
//       console.error("Error updating application status:", error);
//     }
//   };

//   const fetchCustomizedResume = async ({ jdFormId }) => {
//     if (!jdFormId) {
//       console.error("jdFormId is undefined. Skipping fetch.");
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `${BACKEND_URL}/customizedresumes/${jdFormId}`
//       );
//       if (response.status === 200) {
//         console.log("Fetched Customized Resume:", response.data);
//         setResumeContent(response.data.content);
//       }
//     } catch (error) {
//       console.error("Error fetching customized resume:", error);
//     }
//   };

//   const addNewJDToHistory = (newJDForm) => {
//     setJdFormHistory((prevJDForms) => [...prevJDForms, newJDForm]);
//   };

//   const fetchJDForms = async () => {
//     if (!isAuthenticated) return;

//     try {
//       const token = await getAccessTokenSilently();
//       const history = await axios.get(
//         `${BACKEND_URL}/jobapplications/${user.sub}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (history.status === 200) {
//         setJdFormHistory(history.data);
//       }
//     } catch (error) {
//       console.error("Error fetching JDForms:", error);
//     }
//   };

//   useEffect(() => {
//     fetchJDForms();
//   }, [isAuthenticated]); // Re-fetch when authentication status changes

//   useEffect(() => {
//     if (isFormVisible && !isAuthenticated) {
//       loginWithRedirect();
//     }
//   }, [isFormVisible, isAuthenticated, loginWithRedirect]);

//   return (
//     <div className="app">
//       <section className="side-bar">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setIsFormVisible(true)}
//         >
//           + New Job
//         </Button>

//         <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)}>
//           <DialogContent>
//             <JDForm
//               setResumeResponse={setResumeContent}
//               addNewJDToHistory={addNewJDToHistory}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsFormVisible(false)} color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* JD Forms History */}
//         <ul className="history">
//           {jdFormHistory.map((jdForm) => (
//             <li
//               key={jdForm.id} // Using the 'id' property for the key
//               onClick={() => {
//                 fetchCustomizedResume({ jdFormId: jdForm.id });
//                 fetchApplicationStatus(jdForm.id);
//                 setSelectedJobApplication(jdForm);
//               }}
//               style={{ cursor: "pointer" }}
//             >
//               <strong>Company:</strong> {jdForm.company_name} <br />
//               <strong>Title:</strong> {jdForm.job_title} <br />
//               <strong>Status:</strong>{" "}
//               {applicationStatus[jdForm.id] || "Not set"}
//             </li>
//           ))}
//         </ul>

//         <nav>
//           <p>jobwise</p>
//         </nav>
//       </section>
//       <section className="main">
//         {selectedJobApplication && (
//           <div>
//             <h2>Update Application Status</h2>
//             <select
//               value={applicationStatus}
//               onChange={(e) => setApplicationStatus(e.target.value)}
//             >
//               {applicationStatusOptions.map((status) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//             <button onClick={updateApplicationStatus}>Update Status</button>
//           </div>
//         )}
//         <div className="resume-content">{resumeContent}</div>
//         <ul className="feed"></ul>
//         <div className="bottom-section"></div>
//       </section>
//     </div>
//   );
// };

// export default CustomizedResumePage;
import axios from "axios";
import React, { useState, useEffect } from "react";
import JDForm from "../Components/JDForm";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";

const CustomizedResumePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [resumeContent, setResumeContent] = useState("");
  const [jdFormHistory, setJdFormHistory] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const [selectedJobApplication, setSelectedJobApplication] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState({});
  const applicationStatusOptions = [
    "Draft",
    "Submitted",
    "Under Review",
    "Interview",
    "Offer Extended",
    "Accepted Offer",
    "Rejected",
    "Withdrawn",
  ];

  // Function to fetch the current status
  const fetchApplicationStatus = async (jdFormId) => {
    if (!user || !jdFormId) {
      console.error("User or jdFormId is undefined. Skipping fetch.");
      return;
    }
    console.log(
      `Fetching status for job application ID: ${jdFormId} and user: ${user.sub}`
    );

    try {
      const statusResponse = await axios.get(
        `${BACKEND_URL}/status/getStatus/${jdFormId}/${user.sub}`
      );
      console.log(`Status response:`, statusResponse);

      if (statusResponse.status === 200) {
        setApplicationStatus((prevStatus) => ({
          ...prevStatus,
          [jdFormId]: statusResponse.data.application.status,
        }));
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  // Function to update the status
  const updateApplicationStatus = async () => {
    if (!selectedJobApplication) return;

    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        `${BACKEND_URL}/status/updateStatus`,
        {
          status: applicationStatus,
          job_application_id: selectedJobApplication.id,
          user_auth0_user_id: user.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the application status in the jdFormHistory state
      const updatedJdFormHistory = jdFormHistory.map((jdForm) => {
        if (jdForm.id === selectedJobApplication.id) {
          return {
            ...jdForm,
            status: applicationStatus[selectedJobApplication.id],
          };
        }
        return jdForm;
      });
      setJdFormHistory(updatedJdFormHistory);

      // Optionally, show a success message or handle the UI response
    } catch (error) {
      console.error("Error updating application status:", error);
      // Handle the error case
    }
  };

  const fetchCustomizedResume = async ({ jdFormId }) => {
    if (!jdFormId) {
      console.error("jdFormId is undefined. Skipping fetch.");
      return;
    }
    try {
      const response = await axios.get(
        `${BACKEND_URL}/customizedresumes/${jdFormId}`
      );
      if (response.status === 200) {
        console.log("Fetched Customized Resume:", response.data);
        setResumeContent(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching customized resume:", error);
    }
  };

  const addNewJDToHistory = (newJDForm) => {
    setJdFormHistory((prevJDForms) => [...prevJDForms, newJDForm]);
  };

  const fetchJDForms = async () => {
    if (!isAuthenticated) return;

    try {
      const token = await getAccessTokenSilently();
      const history = await axios.get(
        `${BACKEND_URL}/jobapplications/${user.sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (history.status === 200) {
        setJdFormHistory(history.data);
      }
    } catch (error) {
      console.error("Error fetching JDForms:", error);
    }
  };

  useEffect(() => {
    fetchJDForms();
  }, [isAuthenticated]); // Re-fetch when authentication status changes

  useEffect(() => {
    if (isFormVisible && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isFormVisible, isAuthenticated, loginWithRedirect]);

  return (
    <div className="app">
      <section className="side-bar">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormVisible(true)}
        >
          + New Job
        </Button>

        <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)}>
          <DialogContent>
            <JDForm
              setResumeResponse={setResumeContent}
              addNewJDToHistory={addNewJDToHistory}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsFormVisible(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* JD Forms History */}
        <ul className="history">
          {jdFormHistory.map((jdForm) => (
            <li
              key={jdForm.id} // Using the 'id' property for the key
              onClick={() => {
                fetchCustomizedResume({ jdFormId: jdForm.id });
                fetchApplicationStatus(jdForm.id);
                setSelectedJobApplication(jdForm);
              }}
              style={{ cursor: "pointer" }}
            >
              <strong>Company:</strong> {jdForm.company_name} <br />
              <strong>Title:</strong> {jdForm.job_title} <br />
              <strong>Status:</strong>{" "}
              {applicationStatus[jdForm.id] || "Not set"}
            </li>
          ))}
        </ul>

        <nav>
          <p>jobwise</p>
        </nav>
      </section>
      <section className="main">
        {selectedJobApplication && (
          <div>
            <h2>Update Application Status</h2>
            <select
              value={applicationStatus}
              onChange={(e) => setApplicationStatus(e.target.value)}
            >
              {applicationStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button onClick={updateApplicationStatus}>Update Status</button>
          </div>
        )}
        <div className="resume-content">{resumeContent}</div>
        <ul className="feed"></ul>
        <div className="bottom-section"></div>
      </section>
    </div>
  );
};

export default CustomizedResumePage;

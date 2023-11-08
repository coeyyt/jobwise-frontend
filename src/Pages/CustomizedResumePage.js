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
//     try {
//       const history = await axios.get(`${BACKEND_URL}/jobapplications`);
//       if (history.status === 200) {
//         console.log("Fetched JDForms:", history.data);

//         setJdFormHistory(history.data);
//       }
//     } catch (error) {
//       console.error("Error fetching JDForms:", error);
//     }
//   };

//   useEffect(() => {
//     fetchJDForms();
//   }, []);

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
//               onClick={() => fetchCustomizedResume({ jdFormId: jdForm.id })}
//               style={{ cursor: "pointer" }}
//             >
//               <strong>Company:</strong> {jdForm.company_name} <br />
//               <strong>Title:</strong> {jdForm.job_title}
//             </li>
//           ))}
//         </ul>

//         <nav>
//           <p>jobwise</p>
//         </nav>
//       </section>
//       <section className="main">
//         <h1>JOBWISE</h1>
//         <div className="resume-content">{resumeContent}</div>
//         <ul className="feed"></ul>
//         <div className="bottom-section">
//           <div className="input-container">
//             <input />
//             <div id="submit"> ➤</div>
//           </div>
//         </div>
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
              onClick={() => fetchCustomizedResume({ jdFormId: jdForm.id })}
              style={{ cursor: "pointer" }}
            >
              <strong>Company:</strong> {jdForm.company_name} <br />
              <strong>Title:</strong> {jdForm.job_title}
            </li>
          ))}
        </ul>

        <nav>
          <p>jobwise</p>
        </nav>
      </section>
      <section className="main">
        <h1>JOBWISE</h1>
        <div className="resume-content">{resumeContent}</div>
        <ul className="feed"></ul>
        <div className="bottom-section">
          <div className="input-container">
            <input />
            <div id="submit"> ➤</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomizedResumePage;

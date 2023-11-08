// import React, { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// import StatusGraph from "../Components/StatusGraph";
// import GetStartedList from "../Components/GetStartedList";

// const HomePage = () => {
//   const { isAuthenticated } = useAuth0();

//   const [steps, setSteps] = useState([
//     {
//       id: 1,
//       title: "Create an Account",
//       description: "Sign up to get started.",
//       completed: false,
//     },
//     {
//       id: 2,
//       title: "Upload Your Resume",
//       description: "Upload your resume to apply for jobs.",
//       completed: false,
//     },
//     {
//       id: 3,
//       title: "Find Jobs",
//       description: "Search and apply for jobs that suit you.",
//       completed: false,
//     },
//   ]);

//   // This effect runs when the isAuthenticated state changes
//   useEffect(() => {
//     if (isAuthenticated) {
//       // Automatically mark the 'Create an Account' step as complete
//       setSteps((prevSteps) =>
//         prevSteps.map((step) =>
//           step.id === 1 ? { ...step, completed: true } : step
//         )
//       );
//     }
//   }, [isAuthenticated]); // Only re-run the effect if isAuthenticated changes

//   const toggleComplete = (id) => {
//     setSteps(
//       steps.map((step) =>
//         step.id === id ? { ...step, completed: !step.completed } : step
//       )
//     );
//   };

//   return (
//     <div>
//       <StatusGraph />
//       <div className="get-started-list">
//         {steps.map((step) => (
//           <GetStartedList
//             key={step.id}
//             step={step}
//             isCompleted={step.completed}
//             onToggleComplete={toggleComplete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import StatusGraph from "../Components/StatusGraph";
import GetStartedList from "../Components/GetStartedList";

const HomePage = () => {
  const { isAuthenticated } = useAuth0();

  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Create an Account",
      description: "Sign up to get started.",
      completed: false,
    },
    {
      id: 2,
      title: "Upload Your Resume",
      description: "Upload your resume to apply for jobs.",
      completed: false,
    },
    {
      id: 3,
      title: "Find Jobs",
      description: "Search and apply for jobs that suit you.",
      completed: false,
    },
  ]);

  // This effect runs when the isAuthenticated state changes
  useEffect(() => {
    if (isAuthenticated) {
      // Automatically mark the 'Create an Account' step as complete
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === 1 ? { ...step, completed: true } : step
        )
      );
    }
  }, [isAuthenticated]); // Only re-run the effect if isAuthenticated changes

  // Removed the toggleComplete function to prevent users from changing the completion status

  return (
    <div>
      <StatusGraph />
      <div className="get-started-list">
        {steps.map((step) => (
          <GetStartedList
            key={step.id}
            step={step}
            isCompleted={step.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

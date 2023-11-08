// const GetStartedList = ({ step, isCompleted, onToggleComplete }) => {
//   return (
//     <div className={`item ${isCompleted ? "completed" : ""}`}>
//       <h3>{step.title}</h3>
//       <p>{step.description}</p>
//       <button onClick={() => onToggleComplete(step.id)}>
//         {isCompleted ? "Completed" : "Incomplete"}
//       </button>
//     </div>
//   );
// };

// export default GetStartedList;
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const GetStartedList = ({ step, isCompleted, onToggleComplete }) => {
  const { loginWithRedirect } = useAuth0();

  const handleButtonClick = () => {
    if (step.id === 1 && !isCompleted) {
      // If the step is 'Create an Account' and it's not completed, redirect to sign up
      loginWithRedirect();
    } else {
      // For other steps, toggle the completion status
      onToggleComplete(step.id);
    }
  };

  return (
    <div className={`item ${isCompleted ? "completed" : ""}`}>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
      <button onClick={handleButtonClick}>
        {isCompleted ? "Completed" : "Get Started"}
      </button>
    </div>
  );
};

export default GetStartedList;

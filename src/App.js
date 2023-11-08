import { Routes, Route } from "react-router-dom";
import CustomizedResumePage from "./Pages/CustomizedResumePage";
import ResumePage from "./Pages/ResumePage";
import HomePage from "./Pages/HomePage";

import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
        <Routes>
          <Route path="/customresume" element={<CustomizedResumePage />} />
          <Route path="/resume" element={<ResumePage />} />

          <Route path="/" element={<HomePage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

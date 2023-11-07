import { Routes, Route } from "react-router-dom";
// import HomePage from "./Pages/HomePage";
import CustomizedResumePage from "./Pages/CustomizedResumePage";
import ResumePage from "./Pages/ResumePage";
import Navbar from "./Components/Navbar";

function App() {

  return (
    <div className="app">
      <header>
        <Navbar />
        <Routes>
          <Route path="/customresume" element={<CustomizedResumePage />} />
          <Route path="/" element={<ResumePage />} />

          {/* <Route path="/" element={<HomePage />} /> */}
        </Routes>
      </header>
    </div>
  );
}

export default App;

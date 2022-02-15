import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection";
import DocumentUploader from "./components/DocumentManager/Document-uplaod/DocumentUploader";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<HeroSection />} /> */}
          <Route path="/" element={<DocumentUploader />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

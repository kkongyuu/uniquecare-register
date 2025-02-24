import React, { useEffect } from "react"; // นำเข้า useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // นำเข้า BrowserRouter
import Fristpage from "./components/fristpage"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Fristpage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

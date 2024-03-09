import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardCreation from "./components/cardCreation";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/card" element={<CardCreation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

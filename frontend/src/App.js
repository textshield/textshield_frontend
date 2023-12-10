import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Landing from "components/Landing.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "pages/Test.js";
import AboutUs from "pages/AboutUs.js";
import ContactUs from "pages/ContactUs.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/test_text" element={<Test />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <AnimationRevealPage>
      <Landing />
    </AnimationRevealPage>
  );
}

export default App

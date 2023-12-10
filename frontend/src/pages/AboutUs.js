import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Hero from "components/About.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AnimationRevealPage>
      <Hero />
    </AnimationRevealPage>
  );
}

export default App

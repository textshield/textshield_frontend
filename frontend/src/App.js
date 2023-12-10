import React, { useState, useEffect } from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Landing from "components/Landing.js"
import Places from "components/Places.js";
import Hotels from "components/Hotels.js";
import FlightSearch from "components/Flights.js";
import Footer from "components/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import Itinerary from "pages/Itinerary.js";
import SearchPlaces from "pages/Places.js";
import SearchAccommodations from "pages/Accommodations.js";
import SearchFlights from "pages/Flights.js";
import SearchExplore from "pages/Search.js";
import LandingLogin from "components/LandingLogin";
import Payment from "pages/Payment";


function App() {
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const [loggedInUser, setLoggedInUser] = useState(null);
  
  // A function to set the loggedInUser state when the user logs in
  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  // A function to clear the loggedInUser state when the user logs out
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home loggedInUser={loggedInUser} onLogout={handleLogout}/>} />
          <Route exact path="/login" element={<LoginPage onLogin={handleLogin} />}/>
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/search" element={<SearchExplore loggedInUser={loggedInUser} onLogout={handleLogout}/>} />
          <Route exact path="/itinerary" element={loggedInUser ? <Itinerary loggedInUser={loggedInUser} onLogout={handleLogout}/> : <LoginPage onLogin={handleLogin}/>} />
          <Route exact path="/places" element={<SearchPlaces loggedInUser={loggedInUser} onLogout={handleLogout}/>} />
          <Route exact path="/accommodations" element={<SearchAccommodations loggedInUser={loggedInUser} onLogout={handleLogout}/>} />
          <Route exact path="/flights" element={<SearchFlights loggedInUser={loggedInUser} onLogout={handleLogout}/>} />
          <Route exact path="/payment" element={<Payment loggedInUser={loggedInUser} onLogout={handleLogout}/>} />
        </Routes>
      </div>
    </Router>
  )
}

function Home(props) {
  console.log(props);
  return (
    <AnimationRevealPage>
      {props.loggedInUser ? <LandingLogin loggedInUser={props.loggedInUser} onLogout={props.onLogout}/> : <Landing loggedInUser={props.loggedInUser}/>}
      <Places />
      <Hotels />
      <FlightSearch />
      <Footer />
    </AnimationRevealPage>
  );
}

export default App

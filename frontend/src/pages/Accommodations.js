import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Hotels from "components/Hotels.js";
import Footer from "components/Footer.js";
import Landing_hotels from "components/Landing_hotels.js"



export default (props) => {
  return (
	<AnimationRevealPage>
  <Landing_hotels loggedInUser={props.loggedInUser}/>
      <Hotels />
      <Footer />
    </AnimationRevealPage>
  );
};
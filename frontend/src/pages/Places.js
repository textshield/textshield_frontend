import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Places from "components/Places.js";
import Footer from "components/Footer.js";
import Landing_citiies from "components/Landing_citiies.js"



export default (props) => {
  console.log(props.loggedInUser);
  return (
	<AnimationRevealPage>
     <Landing_citiies loggedInUser={props.loggedInUser}/>
      <Places />
      <Footer />
    </AnimationRevealPage>
  );
};
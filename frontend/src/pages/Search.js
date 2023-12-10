import React from "react"
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
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../components/Header.js";
import HeaderLogin, { NavLink as NavLinkL, NavLinks as NavLinksL, PrimaryLink as PrimaryLinkBaseL, LogoLink as LogoLinkL, NavToggle as NavToggleL, DesktopNavLinks as DesktopNavLinksL } from "../components/HeaderLogin";
import tw from "twin.macro";
import styled from "styled-components";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-black hover:border-black hover:text-black`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const StyledHeaderLogin = styled(HeaderLogin)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinksL} ${NavLinkL}, ${LogoLinkL} {
    ${tw`text-black hover:border-black hover:text-black`}
  }
  ${NavToggleL}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

export default (props) => {
  console.log(props.loggedInUser);
  return (
	<AnimationRevealPage>
    {props.loggedInUser ? <StyledHeaderLogin loggedInUser = {props.loggedInUser} onLogout={props.onLogout}/> : <StyledHeader loggedInUser = {props.loggedInUser}/>}
      <Places />
      <Hotels />
      <FlightSearch />
      <Footer />
    </AnimationRevealPage>
  );
};


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import Footer from "components/Footer.js";
import HeaderLogin, { NavLink as NavLinkL, NavLinks as NavLinksL, PrimaryLink as PrimaryLinkBaseL, LogoLink as LogoLinkL, NavToggle as NavToggleL, DesktopNavLinks as DesktopNavLinksL } from "../components/HeaderLogin";
import { Link } from 'react-router-dom';
const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const StyledHeaderLogin = styled(HeaderLogin)`
  ${tw`pt-8 max-w-none w-full`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

const Itinerary = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  
  const toggleQuestion = questionIndex => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };
  useEffect(() => {
    if (!props.loggedInUser) {
      navigate(`/login`);
    }
    else {
      fetch(`http://127.0.0.1:5000/itinerary/${props.loggedInUser.email}`)
      .then(response => response.json())
      .then(data => setItinerary(data));
    }
  });
  
  return (
    <AnimationRevealPage>
      <StyledHeaderLogin loggedInUser = {props.loggedInUser} onLogout={props.onLogout}/>
      <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {"Welcome" && <Subheading>{"Welcome"}</Subheading>}
            <Heading>{"Your Itinerary"}</Heading>
            {"View your Itinerary below" && <Description>{"View your Itinerary below"}</Description>}
          </HeaderContent>
          <FAQSContainer>
            <FAQ key={1}
                onClick={() => {
                  toggleQuestion(1);
                }}
                className="group">
            <Question>
                  <QuestionText>{"Your Cities"}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === 1 ? "open" : "collapsed"}
                    transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === 1 ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
          {itinerary.map(item => (
    <div key={item._id}>
      {item.type === 'city' && (
        <div>
          <p>{item.type_name} - {item.type_address}</p>      
          <br/>
        </div>
      )}
    </div>
  ))}
  </Answer>
  </FAQ>
            <FAQ key={2}
                onClick={() => {
                  toggleQuestion(2);
                }}
                className="group">
            <Question>
                  <QuestionText>{"Your Hotels"}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === 2 ? "open" : "collapsed"}
                    transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === 2 ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
          {itinerary.map(item => (
    <div key={item._id}>
      {item.type === 'hotel' && (
        <div>
          <p>{item.type_name} - {item.type_address}</p>
          <br/>      
        </div>
        
      )}
    </div>
  ))}
  </Answer>
  </FAQ>
  <FAQ key={3}
                onClick={() => {
                  toggleQuestion(3);
                }}
                className="group">
            <Question>
                  <QuestionText>{"Your Flights"}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === 3 ? "open" : "collapsed"}
                    transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === 3 ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
          {itinerary.map(item => (
    <div key={item._id}>
      {item.type === 'flight' && (
        <div>
          <p>Departure: {item.departureName} ({item.departureCode}) - {item.departureDateTime}</p>
          <p>Arrival: {item.arrivalName} ({item.arrivalCode}) - {item.arrivalDateTime}</p>
          <p>Total flight time: {item.totalFlightTime}</p>
          <p>Total miles: {item.totalMiles}</p>
          <br/>
        </div>
      )}
    </div>
  ))}
  </Answer>
  </FAQ>
          </FAQSContainer>
          <Link to='/payment'>
      		<PrimaryAction>Book</PrimaryAction>
    	  </Link>
        </Column>
      </ContentWithPaddingXl>
      
      </Container>
<Footer />
</AnimationRevealPage>
  );
};

export default Itinerary;

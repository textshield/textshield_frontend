import React, { useState }  from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header from "./headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../images/design-illustration.svg";
import { ReactComponent as QuotesLeftIcon } from "../images/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "../images/quotes-r.svg";
import { test } from 'components/UserFunction';
import { CircleLoader } from "react-spinners";

const Container = tw.div`
  top-0
  left-0
  w-full
  h-full
  bg-primary-500
  bg-opacity-15
`;

const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;
const QuoteContainer = tw.div`relative mt-10 lg:mt-20`;
const Quote = tw.blockquote`text-center lg:text-left text-sm sm:text-lg lg:text-xl xl:text-2xl`;
const QuotesLeft = tw(QuotesLeftIcon)`w-6 h-6 opacity-75 text-primary-500 inline-block mr-1 -mt-3`;
const QuotesRight = tw(QuotesRightIcon)`w-6 h-6 opacity-75 text-primary-500 inline-block ml-1 -mt-3`;
const Testimonial = styled.div`
${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
}
`;
//tw.div`flex mt-16 mx-auto max-w-xs sm:max-w-xl lg:max-w-4xl text-left bg-gray-100 rounded-lg text-gray-900`
const CustomerInfo = tw.div`mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
const CustomerProfilePicture = tw.img`rounded-full w-20 h-20`;
const CustomerTextInfo = tw.div`text-center lg:text-left sm:ml-6 mt-2 sm:mt-0`;
const CustomerName = tw.h5`font-semibold text-xl lg:text-2xl xl:text-3xl text-primary-500`;


const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
`;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default ({ roundedHeaderButton }) => {
  const [text, setText] = useState('');
  const [testimonial, setTestimonial] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setTestimonial(<CircleLoader color={"#123abc"} css={override} size={150} />)
    const test_text = {
      text: text
    }
  
    test(test_text).then(res => {
      if (!res.error) {
        setTestimonial(
          <Testimonial>
            <QuoteContainer>
              <Quote>
                <QuotesLeft />
                {res.text}
                <QuotesRight />
              </Quote>
            </QuoteContainer>
            <CustomerInfo>
              <CustomerTextInfo>
                <CustomerName>{res.result}</CustomerName>
              </CustomerTextInfo>
            </CustomerInfo>
          </Testimonial>
        );
      }
    })
  }

  return (
      <Container>
      <Header roundedHeaderButton={roundedHeaderButton} />
        <TwoColumn>
          <LeftColumn>
            <Heading>
            Offensive Text <span tw="text-primary-500">Checker</span>
            </Heading>
            <Paragraph>
              Our product is easy to setup, understand, and use.
            </Paragraph>
            <Actions>
            <form noValidate onSubmit={onSubmit}>
              <input type="text" 
                placeholder="Enter any text"
                name="text"
                onChange={(e) => setText(e.target.value)} />
              <button>Test</button>
            </form>
            </Actions>
            <br />
            {testimonial}
            {/* <Testimonial>
              <QuoteContainer>
                <Quote>
                  <QuotesLeft />
                    ABC
                  <QuotesRight />
                </Quote>
              </QuoteContainer>
              <CustomerInfo>
                        <CustomerProfilePicture src="#" />
                        <CustomerTextInfo>
                          <CustomerName>{"Offensive"}</CustomerName>
                        </CustomerTextInfo>
              </CustomerInfo>
            </Testimonial> */}
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Design Illustration" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
  );
};

import React, { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { useNavigate } from 'react-router-dom';


const stripePromise = loadStripe('pk_test_51N0bQ6D8DUCzFI4we4tanPdhcjWkwiByMDq81xBcgrrTtTO8qNwEwWiHXOrjYmEJSv4tUjCFf3d2rUaZa6TntUVc00TlVmGrdF');
const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;
const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

const Column = tw.div`relative text-center items-center`;
const HeaderContent = tw.div`text-center items-center`;
const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
  //const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { error, token } = await stripe.createToken(elements.getElement(CardElement));
  
    if (error) {
      // Show error to your customer
      console.log(error.message);
    } else {
      // Send the token to your server to charge the user
      console.log(token);
      handleToken(token);
    }
  };
  
  const handleToken = async (token) => {
    const response = await fetch('http://127.0.0.1:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100, currency: 'usd' }),
    });
    const data = await response.json();
    console.log(data);
    const { client_secret } = data;
  
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        // billing_details: {
        //   name: formData.billing_name.value,
        //   email: formData.billing_email.value,
        // },
      },
    });
  
    if (result.error) {
      // Show error to your customer
      console.log(result.error.message);
      alert(result.error.message)
    } else {
      // The payment succeeded!
      console.log(result.paymentIntent);
      // Update your UI to reflect the success
      alert("Payment Successful!")
      navigate("/")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    Please enter your payment details below:
    <br/>
      <label>
        Total Amount: ${amount}
      </label>
      <br/>
      <label>
        Card details
        <CardElement />
      </label>
      <PrimaryAction type="submit">Pay</PrimaryAction>
    </form>
  );
};

const WrappedCheckoutForm = (props) => {
  return (
    <AnimationRevealPage>
        <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            <Heading>{"Payment"}</Heading>
            
          </HeaderContent>
    <Elements stripe={stripePromise}>
      <CheckoutForm props={props}/>
    </Elements>
    </Column>
    </ContentWithPaddingXl>
    </Container>
    </AnimationRevealPage>
  );
};

export default WrappedCheckoutForm;
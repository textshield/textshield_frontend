import React, { useRef, useState, useEffect } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import tw from "twin.macro";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { insert_cities } from "./UserFunction";

const PlaceComponent = (props) => {
  const inputRef = useRef();
  const [placeDetails, setPlaceDetails] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  
  
  const onSubmit = (e) => {
    e.preventDefault();

    if (props.loggedInUser) {
      const city = {
        email: props.loggedInUser.email,
        city_name: placeDetails.name,
        city_address: placeDetails.formatted_address
      }
      insert_cities(city).then(res => {
        console.log(res.result);
        alert("Successfully added to itinerary!")
    })
    } else {
      alert("Please login first!");
      navigate(`/login`);
    }
  }

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails(
        {
          placeId: place.place_id,
          fields: ["name", "formatted_address", "photos", "rating", "reviews"],
        },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaceDetails(result);
          }
        }
      );
    }
  };

  const Card = styled.div(props => [
    tw`mt-24 md:flex justify-center items-center`,
    props.reversed ? tw`flex-row-reverse` : "flex-row"
  ]);
  const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded md:w-9/12 lg:w-9/12 xl:w-9/12 flex-shrink-0 h-80 md:h-80 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
  ]);
  const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
  const Title = tw.h1`font-bold `;
  const Description = tw.p`mt-2 text-sm leading-loose`;
  const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

  return (
    <LoadScript googleMapsApiKey={'AIzaSyCIL-3nA4ba7YuGN_X4Nsbe3ib2FMxy-kY'} libraries={["places"]}>
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search for a city you want to visit"
          style={{ 
            borderRadius: "20px", 
            padding: "10px 20px", 
            fontSize: "2rem", 
            width: "40rem",
            color: "#333"
          }}
        />
      </StandaloneSearchBox>
      {placeDetails && (
        <Card>
        
        <Image imageSrc={placeDetails.photos[0].getUrl()} />
        <Details>
          <Title>{placeDetails.name}</Title>
          <Description>{placeDetails.formatted_address}</Description>
        </Details>
        <form onSubmit={onSubmit}>
        <PrimaryAction type="submit">Add to Itinerary</PrimaryAction>
        </form>
        </Card>
      )}
    </LoadScript>
  );
};

export default PlaceComponent;
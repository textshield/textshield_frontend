import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000';

export const register = newUser => {
    return axios
        .post(`${API_URL}/users/register`, {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log(response)
            return response.data
        })
}

export const login = user => {
    return axios
        .post(`${API_URL}/users/login`, {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            console.log(response)
            return response.data
        })
}

export const insert_cities = city => {
    return axios
        .post(`${API_URL}/insert_cities`, {
            email: city.email,
            city_name: city.city_name,
            city_address: city.city_address
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            console.log(response)
            return response.data
        })
}

export const insert_hotels = hotel => {
    return axios
        .post(`${API_URL}/insert_hotels`, {
            email: hotel.email,
            hotel_name: hotel.hotel_name,
            hotel_address: hotel.hotel_address
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            console.log(response)
            return response.data
        })
}

export const insert_flights = flight => {
    console.log(flight);
    return axios
        .post(`${API_URL}/insert_flights`, {
            email: flight.email,
            departureName: flight.departureName,
            departureCode: flight.departureCode,
            departureDateTime: flight.departureDateTime,
            arrivalName: flight.arrivalName,
            arrivalCode: flight.arrivalCode,
            arrivalDateTime: flight.arrivalDateTime,
            totalFlightTime: flight.totalFlightTime,
            totalMiles: flight.totalMiles
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            console.log(response)
            return response.data
        })
}
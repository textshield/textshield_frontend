import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000';

export const test = test_text => {
    return axios
        .post(`${API_URL}/test`, {
            text: test_text.text
        })
        .then(response => {
            console.log(response.data)
            return response.data
        })
}

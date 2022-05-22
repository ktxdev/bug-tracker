import axios from "axios";

const API = axios.create({
    baseURL: 'http://api.bug-tracker.ktxdev.com:9803/api/',
    headers: {
        'content-type': 'application/json'
    }
});

export default API;
import axios from "axios";

const API = axios.create({
    baseURL: 'http://api.bug-tracker.ktxdev.com:9803/api/',
    headers: {
        'content-type': 'application/json'
    }
});

const post = async (url, request = null, headers = null) => {
    return await API.post(url, JSON.stringify(request), { headers: headers })
        .then(res => {
            return { success: true, data: res.data }
        }).catch(err => {
            return { success: false, data: err.response.data }
        });
}

export { post };
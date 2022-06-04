import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'content-type': 'application/json'
    }
});

const post = async (url, request = null, headers = null) => {
    return resolve(API.post(url, JSON.stringify(request), { headers: headers }));
}

const get = async (url, headers = null) => {
    return resolve(API.get(url, { headers: headers }));
    
}

const remove = async(url, headers = null) => {
    return resolve(API.delete(url, { headers: headers }));
}

const resolve = (promise) => {
    return promise.then(res => {
            return { success: true, data: res.data }
        }).catch(err => {
            return { success: false, data: err.response.data }
        });
}

export { post, get, remove };
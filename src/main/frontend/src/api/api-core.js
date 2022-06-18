import axios from "axios";

const API = axios.create({
    baseURL: 'https://ktxdev-bt.herokuapp.com/api/',
    headers: {
        'content-type': 'application/json'
    }
});

const post = async (url, request = null, headers = null) => {
    return resolve(API.post(url, JSON.stringify(request), { headers }));
}

const get = async (url, headers = null) => {
    return resolve(API.get(url, { headers }));
    
}

const remove = async(url, headers = null) => {
    return resolve(API.delete(url, { headers }));
}

const put = async(url, request, headers = null) => {
    return resolve(API.put(url, JSON.stringify(request), { headers }));
}

const resolve = (promise) => {
    return promise.then(res => {
            return { success: true, data: res.data }
        }).catch(err => {
            return { success: false, data: err.response.data }
        });
}

export { post, get, remove, put };
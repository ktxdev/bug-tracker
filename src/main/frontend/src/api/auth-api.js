import API from "./api-core"

export const authenticate = async (credentials) => {
    return await API.post(
        '/opn/v1/authenticate', 
        JSON.stringify(credentials));
}
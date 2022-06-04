import { get, post, put, remove } from "./api-core"

const BASE_URL = 'v1/users'

const AUTHORIZATION_HEADER = 'Authorization'
const TOKEN_PREFIX = 'Bearer'

export const getAllUsers = async (accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await get(BASE_URL, headers);
}

export const createUser = async (user, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await post(BASE_URL, user, headers);
}

export const updateUser = async (id, user, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await put(`${BASE_URL}/${id}`, user, headers);
}

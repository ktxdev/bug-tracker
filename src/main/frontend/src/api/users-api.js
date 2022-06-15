import { get, post, put, remove } from "./api-core"

const BASE_URL = 'v1/users'

const AUTHORIZATION_HEADER = 'Authorization'
const TOKEN_PREFIX = 'Bearer'

export const getPagedUsers = async (page, size, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await get(`${BASE_URL}?page=${page}&size=${size}`, headers);
}

export const getAllUsers = async(accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await get(`${BASE_URL}/all`, headers)
}

export const createUser = async (user, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await post(BASE_URL, user, headers);
}

export const updateUser = async (id, user, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await put(`${BASE_URL}/${id}`, user, headers);
}

export const deleteUser = async (id, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await remove(`${BASE_URL}/${id}`, headers);
}

export const getMyProfile = async(accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await get('/v1/users/my-profile', headers);
}

export const changePassword = async(request, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await put('/v1/users/change-password', request, headers);
}

export const signUp = async(request) => {
    return await post(`${BASE_URL}/sign-up`, request);
}

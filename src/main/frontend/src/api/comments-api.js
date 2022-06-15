import { get, post, put, remove } from "./api-core"

const BASE_URL = 'v1/comments'

const AUTHORIZATION_HEADER = 'Authorization'
const TOKEN_PREFIX = 'Bearer'

export const createComment = async (comment, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await post(BASE_URL, comment, headers);
}

export const getAllComments = async(ticketNo, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await get(`${BASE_URL}?ticketNo=${ticketNo}`, headers)
}

export const deleteComment = async(id, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await remove(`${BASE_URL}/${id}`, headers);
}

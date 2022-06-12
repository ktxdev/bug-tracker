import { get, post, put, remove } from "./api-core"

const BASE_URL = 'v1/tickets'

const AUTHORIZATION_HEADER = 'Authorization'
const TOKEN_PREFIX = 'Bearer'

export const createTicket = async (ticket, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await post(BASE_URL, ticket, headers);
}

export const getAllTicketsPaged = async(page, size, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await get(`${BASE_URL}?page=${page}&size=${size}`, headers)
}

export const updateTicket = async(id, ticket, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await put(`${BASE_URL}/${id}`, ticket, headers);
}

export const deleteTicket = async(id, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await remove(`${BASE_URL}/${id}`, headers);
}
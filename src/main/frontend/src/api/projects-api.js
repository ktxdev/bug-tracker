import { get, post, put, remove } from "./api-core"

const BASE_URL = 'v1/projects'

const AUTHORIZATION_HEADER = 'Authorization'
const TOKEN_PREFIX = 'Bearer'

export const createProject = async (project, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await post(BASE_URL, project, headers);
}

export const getAllProjects = async(page, size, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await get(`${BASE_URL}?page=${page}&size=${size}`, headers)
}

export const updateProject = async(id, project, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await put(`${BASE_URL}/${id}`, project, headers);
}

export const deleteProject = async(id, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await remove(`${BASE_URL}/${id}`, headers);
}
import { post } from './api-core.js'

export const authenticate = async (credentials) => {
    return post('/v1/authenticate', credentials);
}
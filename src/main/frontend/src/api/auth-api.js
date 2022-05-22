import { post } from './api-core.js'

export const authenticate = async (credentials) => {
    return post('/opn/v1/authenticate', credentials);
}
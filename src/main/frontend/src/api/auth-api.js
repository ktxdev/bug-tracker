import { post } from './api-core.js'

export const authenticate = async (credentials) => {
    return post('/v1/authenticate', credentials);
}

export const authenticateDemoAdmin = async () => {
    return post('/v1/authenticate/demo-admin');
}

export const authenticateDemoUser = async () => {
    return post('/v1/authenticate/demo-user');
}
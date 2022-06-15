import { get } from "./api-core"

const BASE_URL = 'v1/dashboard'

const AUTHORIZATION_HEADER = 'Authorization'
const TOKEN_PREFIX = 'Bearer'

export const getStatistics = async(accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await get(BASE_URL, headers);
}

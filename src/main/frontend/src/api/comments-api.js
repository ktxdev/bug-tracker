import { get, post, put, remove } from "./api-core"

const BASE_URL = 'v1/comments'

const AUTHORIZATION_HEADER = 'Authorization'
const TOKEN_PREFIX = 'Bearer'

export const createComment = async (comment, accessToken) => {
    const headers = { [AUTHORIZATION_HEADER]: `${TOKEN_PREFIX} ${accessToken}` }
    return await post(BASE_URL, comment, headers);
}

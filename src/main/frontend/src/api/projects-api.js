import { useAuth } from "../auth/auth"
import { post } from "./api-core"

const baseUrl = '/v1/projects'

export const createProject = async (project, accessToken) => {
    const headers = { 'Authorization': `Bearer ${accessToken}` }
    return await post(baseUrl, project, headers);
}
import {apiClient} from "./apiClient"

export const executeBasicAuth = (token) => apiClient.get("/basicauth", {
    headers: {
        Authorization: token
    }
})

export const executeJwtAuth = (username, password) => apiClient.post("/authenticate", {
    username: username,
    password: password
})
import {apiClient} from "./apiClient"

export const retrieveTodosWithUsername = (username) => {
    return apiClient.get(`/users/${username}/todos`, {
        withCredentials: true
    })
}

export const deleteTodoWithId = (username, id) => {
    return apiClient.delete(`/users/${username}/todos/${id}`, {
        withCredentials: true
    })
} 

export const retrieveTodoWithId = (username, id) => {
    return apiClient.get(`/users/${username}/todos/${id}`, {
        withCredentials: true
    })
}

export const updateTodo = (username, id, todo) => {
    return apiClient.put(`/users/${username}/todos/${id}`, todo, {
        withCredentials: true
    })
}

export const addTodo = (username, todo) => {
    return apiClient.post(`/users/${username}/todos/-1`, todo, {
        withCredentials: true
    })
}
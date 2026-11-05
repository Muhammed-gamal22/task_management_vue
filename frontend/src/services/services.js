import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export const api = axios.create({
    baseURL: apiUrl,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export const getData = async (url, queryObj) => {
    const response = await api.get(
        url,
        queryObj ? { params: queryObj } : undefined
    )

    return response.data
}

export const postData = async (url, data) => {
    const response = await api.post(url, data)

    return response.data
}

export const putData = async (url, data) => {
    const response = await api.put(url, data)

    return response.data
}

export const patchData = async (url, data) => {
    const response = await api.patch(url, data)

    return response.data
}

export const deleteData = async (url) => {
    const response = await api.delete(url)

    return response.data
}
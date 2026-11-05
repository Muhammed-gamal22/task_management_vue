


import axios, {
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios'

const apiUrl: string = import.meta.env.VITE_API_URL

export const api = axios.create({
    baseURL: apiUrl,
})

// Request Interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// GET
export const getData = async <T = unknown>(
    url: string,
    queryObj?: Record<string, unknown>
): Promise<T> => {
    const response: AxiosResponse<T> = await api.get(
        url,
        queryObj ? { params: queryObj } : undefined
    )

    return response.data
}

// POST
export const postData = async <T = unknown, D = unknown>(
    url: string,
    data: D
): Promise<T> => {
    const response: AxiosResponse<T> = await api.post(url, data)

    return response.data
}

// PUT
export const putData = async <T = unknown, D = unknown>(
    url: string,
    data: D
): Promise<T> => {
    const response: AxiosResponse<T> = await api.put(url, data)

    return response.data
}

// PATCH
export const patchData = async <T = unknown, D = unknown>(
    url: string,
    data: D
): Promise<T> => {
    const response: AxiosResponse<T> = await api.patch(url, data)

    return response.data
}

// DELETE
export const deleteData = async <T = unknown>(
    url: string
): Promise<T> => {
    const response: AxiosResponse<T> = await api.delete(url)

    return response.data
}


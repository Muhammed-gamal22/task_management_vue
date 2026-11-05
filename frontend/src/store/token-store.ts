import { defineStore } from 'pinia'

interface TokenState {
    token: string
}

export const useTokenStore = defineStore('token', {
    state: (): TokenState => ({
        token: localStorage.getItem('token') || '',
    }),

    actions: {
        setToken(token: string) {
            this.token = token

            if (token) {
                localStorage.setItem('token', token)
            } else {
                localStorage.removeItem('token')
            }
        },
    },
})
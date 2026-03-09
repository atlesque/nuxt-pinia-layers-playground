import { defineStore } from 'pinia'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),
  getters: {
    currentUser: (state) => state.user,
    userName: (state) => state.user?.name ?? 'Guest',
  },
  actions: {
    login(user: User) {
      this.user = user
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
    updateUser(updates: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...updates }
      }
    },
  },
})

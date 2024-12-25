// @ts-check
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
    id: '',
    phone: '',
    username: '',
    multi_depart: 0
  }),

  actions: {
    logout() {
      this.$patch({
        token: '',
        id: '',
        phone: '',
        username: '',
        multi_depart: 0
      })
    },
    login(userData) {
      this.$patch({
        token: userData.token || '',
        id: userData.id || '',
        phone: userData.phone || '',
        username: userData.username || '',
        multi_depart: userData.multi_depart || 0
      })
    }
  }
})

// @ts-check
import { defineStore } from 'pinia'

export const appStore = defineStore({
  id: 'app',
  state: () => ({
    appName: '',
    version: '',
    webSize: 'defaulf',
    appColors: {},
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

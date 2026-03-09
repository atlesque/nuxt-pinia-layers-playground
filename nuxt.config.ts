export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  extends: [
    './0-base-layer',
    './1-pets-layer',
    './2-owners-layer',
  ],
  modules: ['@pinia/nuxt'],
})

// nuxt.config.js
export default defineNuxtConfig({
  modules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Roboto: [400, 700], // Choose the font you want and weights
    },
    display: 'swap', // Recommended for better font rendering
  },

  // Include global styles here
  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-10-28'
});
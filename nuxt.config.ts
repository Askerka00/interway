// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/interway/',
  },
  nitro: {
    preset: 'github_pages',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

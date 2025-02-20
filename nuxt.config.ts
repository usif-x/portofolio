// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  devtools: { enabled: true },
  css: ['~/assets/styles/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    // Private keys that are exposed to the server
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    EDGE_CONFIG: process.env.EDGE_CONFIG,
    // Public keys that are exposed to the client
    public: {
      adminEmail: process.env.NUXT_PUBLIC_ADMIN_EMAIL,
      adminPassword: process.env.NUXT_PUBLIC_ADMIN_PASSWORD
    },
    
  },
  nitro: {
    preset: 'vercel',
    publicAssets: [
      {
        dir: 'public',
        maxAge: 60 * 60 * 24 * 365 // 1 year
      }
    ]
  },
  modules: [
    '@nuxt/image'
  ],
  image: {
    dir: 'public/images',
    formats: ['webp', 'jpg', 'png'],
    quality: 80,
    placeholder: true,
    provider: 'ipx',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    }
  },
  routeRules: {
    '/admin/**': { ssr: false }
  }
})
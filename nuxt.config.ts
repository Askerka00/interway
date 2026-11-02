import tailwindcss from "@tailwindcss/vite";

const prerenderRoutes = [
  '/',
  '/services',
  '/services/road',
  '/services/air-rail',
  '/services/sea',
  '/services/customs',
  '/services/warehouse',
  '/routes',
  '/routes/china-almaty',
  '/routes/china-astana',
  '/routes/turkey-almaty',
  '/routes/russia-kazakhstan',
  '/routes/europe-kazakhstan',
  '/routes/uae-almaty',
  '/routes/uzbekistan-kazakhstan',
  '/routes/almaty-astana',
  '/tools',
  '/tools/delivery-calculator',
  '/tools/customs-calculator',
  '/tools/cbm-pallet-calculator',
  '/tools/rail-distance-calculator',
  '/contacts',
  '/privacy',
  '/sitemap.xml'
];

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#0B1120' },
        { name: 'author', content: 'ТОО INTER WAY' },
        { name: 'geo.region', content: 'KZ-ALA' },
        { name: 'geo.placename', content: 'Алматы' },
        { name: 'geo.position', content: '43.2614;76.9458' },
        { name: 'ICBM', content: '43.2614, 76.9458' },
        { property: 'og:site_name', content: 'INTER WAY — Логистическая компания в Казахстане' },
        { property: 'og:locale', content: 'ru_KZ' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: prerenderRoutes
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

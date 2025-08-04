import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/robots', '@nuxtjs/sitemap'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'nuxt creative base',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
      script: [
        { 'defer': true, 'src': 'https://tracking.jnkl.dev/script.js', 'data-website-id': '1862b35f-c5b6-4845-a072-95c964c7a5e5', 'data-domains': 'nuxt-creative-base.vercel.app', 'data-do-not-track': 'true' },
      ],
      meta: [
        { name: 'theme-color', content: '#000000' },
        { name: 'description', content: 'nuxt starter for creative projects, includes scss setup, gsap, lenis scroll, curtainsjs to load media with webgl, custom cursor, inview trigger, splash screen, robots.txt, sitemap.xml' },
        { property: 'og:title', content: 'nuxt creative base' },
        { property: 'og:description', content: 'nuxt starter for creative projects, includes scss setup, gsap, lenis scroll, curtainsjs to load media with webgl, custom cursor, inview trigger, splash screen, robots.txt, sitemap.xml' },
        // { property: 'og:image', content: 'https://nuxt-creative-base.vercel.app/og-image.jpg' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en' },
      ],
    },
  },

  css: [
    '@/assets/styles/global.scss',
  ],

  site: {
    url: 'https://nuxt-creative-base.vercel.app',
    // indexable: false,
  },

  compatibilityDate: '2025-02-02',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/functions" as *; @use "~/assets/styles/mixins" as *;',
        },
      },
    },
    plugins: [glsl()],
  },

  typescript: {
    typeCheck: true,
  },

  eslint: {
    config: {
      stylistic: {
        braceStyle: '1tbs',
      },
    },
  },
})

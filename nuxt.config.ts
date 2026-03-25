import glsl from 'vite-plugin-glsl'

// TODO: change to final details
const title = 'nuxt creative base'
const description = 'nuxt starter for creative projects, includes scss setup, gsap, lenis scroll, curtainsjs to load media with webgl, custom cursor, inview trigger, splash screen, robots.txt, sitemap.xml'
const shareImage = 'https://nuxt-creative-base.vercel.app/og-image.jpg'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/robots', '@nuxtjs/sitemap', 'nuxt-seo-utils'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title,
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        // TODO: preload font
      ],
      script: [
        { innerHTML: 'if (!sessionStorage.getItem("splash:played")) {document.documentElement.classList.add("play-splash");}' },
        { 'defer': true, 'src': 'https://tracking.jnkl.dev/script.js', 'data-website-id': '1862b35f-c5b6-4845-a072-95c964c7a5e5', 'data-domains': 'nuxt-creative-base.vercel.app', 'data-do-not-track': 'true' },
      ],
      meta: [
        { name: 'theme-color', content: '#111111' },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: shareImage },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: shareImage },
      ],
    },
  },

  css: [
    '@/assets/styles/global.scss',
  ],

  site: {
    // TODO: change to final domain
    url: 'https://nuxt-creative-base.vercel.app',
    // TODO: remove when going live
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

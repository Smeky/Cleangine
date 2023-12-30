// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    experimental: { watcher: 'parcel' },

    ssr: false,

    // modules: [
    //     '@nuxtjs/alias',
    // ],

    alias: {
        'zenith': '../src',
    },

    app: {
        head: {
            title: 'Zenith playground',
            htmlAttrs: { lang: 'en' },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
                { hid: 'description', name: 'description', content: '' },
                // { hid: 'og:description', property: 'og:description', content: '' },
                // { hid: 'og:title', property: 'og:title', content: '' },
                // { hid: 'og:image', property: 'og:image', content: '' },
                // { hid: 'og:url', property: 'og:url', content: '' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
            ]
        },
    },

    vite: {
        plugins: [
            // 'vite-plugin-compile-time',
        ],
    },

    css: [
        '~/styles/main.scss',
    ],
})

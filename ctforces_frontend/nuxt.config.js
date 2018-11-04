const pkg = require('./package');

export default {
    mode: 'universal',

    server: {
        port: 3000, // default: 3000
      host: '127.0.0.1' // default: localhost
    },

    /*
  ** Headers of the page
  */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://use.fontawesome.com/releases/v5.4.1/css/all.css'
            }
        ]
    },

    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */

    css: ['~semantic/dist/semantic.min.css', '~assets/css/main.css'],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: ['~plugins/sui.js', '~plugins/axios'],

    /*
  ** Nuxt.js modules
  */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios'
    ],
    /*
  ** Axios module configuration
  */
    axios: {
        baseURL: 'http://127.0.0.1:8000/api/',
        browserBaseURL: 'http://127.0.0.1:8000/api/',
        credentials: true
    },

    /*
  ** Build configuration
  */
    build: {
        /*
    ** You can extend webpack config here
    */
        extend() {}
    }
};

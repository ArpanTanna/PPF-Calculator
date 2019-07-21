import pkg from './package'
//import webpack from 'webpack'

export default {
  mode: 'spi',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
      '@/assets/css/style.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      /*new webpack.ProvidePlugin({
          '_': 'lodash'
          // ...etc.
      })*/
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
        'bootstrap-vue/nuxt',
        '@nuxtjs/moment',
        '@bazzite/nuxt-netlify',
        //'nuxt-fontawesome'
        ['nuxt-fontawesome', {
          //component: 'fa',
          imports: [
              //import whole set
              {
                  set: '@fortawesome/free-solid-svg-icons',
                  icons: ['fas']
              }
          ]
        }],
      ['nuxt-fire', {
          useOnly: ['auth','firestore','realtimeDb'],
          customEnv: false,
          functionsLocation: 'us-central1',
          config: {
              development: {
                  apiKey: '<key>',
                  authDomain: '<domain>',
                  databaseURL: '<url>',
                  projectId: '<id>',
                  storageBucket: '<bucket>',
                  messagingSenderId: '<senderid>',
                  appId: "<api_id>"
              },
              production: {
                  apiKey: '<key>',
                  authDomain: '<domain>',
                  databaseURL: '<url>',
                  projectId: '<id>',
                  storageBucket: '<bucket>',
                  messagingSenderId: '<senderid>',
                  appId: "<api_id>"
              }
          }
      }]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

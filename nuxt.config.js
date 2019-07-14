import pkg from './package'
//import webpack from 'webpack'

export default {
  mode: 'universal',

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
                  apiKey: 'AIzaSyBkk_DwAjDE3VEBJjcVHugKfk-eD15lyPk',
                  authDomain: 'fir-ff0d5.firebaseapp.com',
                  databaseURL: 'https://fir-ff0d5.firebaseio.com',
                  projectId: 'fir-ff0d5',
                  storageBucket: 'fir-ff0d5.appspot.com',
                  messagingSenderId: 'fir-ff0d5.appspot.com',
                  appId: "1:581358536605:web:625db0883b2bc811"
              },
              production: {
                  apiKey: 'AIzaSyBkk_DwAjDE3VEBJjcVHugKfk-eD15lyPk',
                  authDomain: 'fir-ff0d5.firebaseapp.com',
                  databaseURL: 'https://fir-ff0d5.firebaseio.com',
                  projectId: 'fir-ff0d5',
                  storageBucket: 'fir-ff0d5.appspot.com',
                  messagingSenderId: 'fir-ff0d5.appspot.com',
                  appId: "1:581358536605:web:625db0883b2bc811"
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

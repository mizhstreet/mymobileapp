import Vue from 'vue'
import VueMoment from 'vue-moment'
import VeeValidate from 'vee-validate'
// Import F7
/* eslint-disable no-unused-vars */
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
/* eslint-disable no-unused-vars */
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'

// import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

// Import App Custom Styles

// Import Routes
import Routes from './routes.js'
import VueResource from "vue-resource"
import App from './App'
// Init F7 Vue Plugin
Vue.use(Framework7Vue)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(require('vue-moment'))
Vue.http.options.emulateJSON = true
// Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://xxx.xxx.xxx.xxx:94'
/* eslint-disable no-new */
// Init App
export const cf = new Vue({
  data: {
    serverURL: 'http://hr.mhsoft.vn/api/'
  }
})
new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes
  },
  // Register App Component
  components: {
    app: App
  }
}).$mount('#app')
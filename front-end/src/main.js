import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {GlobalConfig} from "./services/GlobalConfig";
import {MonumentsReceiver} from "@/services/MonumentsReceiver";
import {RequestDispatcher} from "@/services/RequestDispatcher";

Vue.config.productionTip = false

const globalConfig = new GlobalConfig()

const requestDispatcher = new RequestDispatcher(axios, globalConfig)
Vue.prototype.$globalConfig = globalConfig

new Vue({
  provide: {
    'monumentsReceiver': new MonumentsReceiver(axios, requestDispatcher)
  },
  render: h => h(App),
}).$mount('#app')

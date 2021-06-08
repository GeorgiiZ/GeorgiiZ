import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {GlobalConfig} from "./services/GlobalConfig";
import {MonumentsReceiver} from "@/services/MonumentsReceiver";
import {RequestDispatcher} from "@/services/RequestDispatcher";
import {MonumentsMapper} from "@/services/MonumentsMapper";

Vue.config.productionTip = false

const globalConfig = new GlobalConfig()

const requestDispatcher = new RequestDispatcher(axios, globalConfig)
Vue.prototype.$globalConfig = globalConfig

const monumentsMapper = new MonumentsMapper()
const monumentsReceiver = new MonumentsReceiver(axios, requestDispatcher, monumentsMapper)

new Vue({
  provide: {
    monumentsReceiver,
    monumentsMapper
  },
  render: h => h(App),
}).$mount('#app')

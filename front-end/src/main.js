import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import {MonumentsReceiver} from "@/services/MonumentsReceiver";

const app = createApp(App)

app.config.devtools = true
app.provide('monumentsReceiver', new MonumentsReceiver(axios))

app.mount('#app')

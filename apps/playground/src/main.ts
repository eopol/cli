import { createApp } from 'vue'
import GoogleTranslateSelect from '@eo-cli-pro/vue3'
// import '@eo-cli-pro/theme-chalk/src/index.scss'
import App from './App.vue'
import './style.css'

createApp(App).use(GoogleTranslateSelect).mount('#app')

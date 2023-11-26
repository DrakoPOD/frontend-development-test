import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css"

import "./style.css"

import App from './App.vue';

const pinia = createPinia()

createApp(App).use(pinia).mount('#app');

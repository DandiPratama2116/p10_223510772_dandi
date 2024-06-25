// src/main.js

import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router'; // Correct the import path here
import 'quasar/dist/quasar.css';

createApp(App).use(Quasar).use(router).mount('#app');

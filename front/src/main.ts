import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { SubsonicAPI } from 'subsonic-api';
import 'virtual:svg-icons-register';
import App from './App.vue';
import router from './router';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

export const api = new SubsonicAPI({
  url: 'http://localhost:4533',
  type: 'navidrome', // or 'generic' or 'subsonic'
});

await api.login({
  username: 'admin',
  password: 'lucho',
});

const app = createApp(App)

app.use(createPinia())
app.use(FloatingVue)
app.use(router)

app.mount('#app')

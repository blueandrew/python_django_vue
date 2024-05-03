import { createApp } from 'vue'
import App from './App.vue'
import 'flowbite';

import './assets/css/tailwind.css'

import router from './router'
import axios from 'axios'

const app = createApp(App)

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
})

app.config.globalProperties.$axios = axios;
app.use(router).mount('#app');


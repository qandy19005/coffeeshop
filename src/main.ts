import { createApp } from 'vue'
import { createPinia } from 'pinia';
import Toast, { POSITION } from "vue-toastification";
import App from './App.vue'
import router from './router'
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App)
app.use(router).use(pinia).mount('#app');
app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT
})
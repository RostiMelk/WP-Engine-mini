import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import './assets/styles/_variables.scss';
import './assets/styles/_global.scss';
import './assets/styles/_icons.scss';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');

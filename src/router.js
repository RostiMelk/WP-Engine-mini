import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import store from './store';

import InstallsList from './views/InstallsList.vue';
import ApiSetup from './views/ApiSetup.vue';
import InstallPage from './views/InstallPage.vue';
import NewBackup from './views/NewBackup.vue';
import ClearCache from './views/ClearCache.vue';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
	mode: 'history',
	base: '/',
	
	routes: [
		{
			path: '/',
			name: 'installsList',
			component: InstallsList,
			meta: { depth: 1 },
		},
		{
			path: '/api-setup',
			name: 'apiSetup',
			component: ApiSetup,
			meta: { depth: 2 },
		},
		{
			path: '/install',
			name: 'installPage',
			component: InstallPage,
			meta: { depth: 2 },
			props(route) {
				return { installid: route.query.installid };
			},
		},
		{
			path: '/new-backup',
			name: 'newBackup',
			component: NewBackup,
			meta: { depth: 3 },
			props(route) {
				return { installid: route.query.installid };
			},
		},
		{
			path: '/clear-cache',
			name: 'clearCache',
			component: ClearCache,
			meta: { depth: 3 },
			props(route) {
				return { installid: route.query.installid };
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	let isAuthenticated = store.state.apiStatus;
	if (to.name !== 'apiSetup' && !isAuthenticated) next({ name: 'apiSetup' })
	else next()
})

export default router;

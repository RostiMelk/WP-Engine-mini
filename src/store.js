import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
	key: 'wpemini',
	storage: window.localStorage,
});

export default new Vuex.Store({
	plugins: [vuexPersist.plugin],
	state: {
		apiStatus: false,
		wpeUid: '',
		wpePwd: '',
		installsList: '',
	},
	actions: {
		updateApiStatus({ commit }, result) {
			commit('updateApiStatus', result);
		},
		updateWpeUid({ commit }, result) {
			commit('updateWpeUid', result);
		},
		updateWpePwd({ commit }, result) {
			commit('updateWpePwd', result);
		},
		updateInstallsList({ commit }, result) {
			commit('updateInstallsList', result);
		},
	},
	mutations: {
		updateApiStatus(state, result) {
			state.apiStatus = result;
		},
		updateWpeUid(state, result) {
			state.wpeUid = result;
		},
		updateWpePwd(state, result) {
			state.wpePwd = result;
		},
		updateInstallsList(state, result) {
			state.installsList = result;
		},
	},
});

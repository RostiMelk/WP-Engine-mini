<template>
	<div class="install-list-message" v-if="!installsReady">
		<div class="load-spinner"></div>
	</div>

	<div class="install-list-message" v-else-if="installsReady == 'error'">
		<div class="error-message">
			<span class="icon material-icons">priority_high</span>
			<h2>Invalid credentials</h2>
		</div>
	</div>

	<div class="install-list" v-else>
		<section class="search-wrapper" :class="{ 'search-wrapper--hidden': !showNavbar }">
			<div class="row">
				<div class="columns">
					<input type="text" v-model="searchQuery" placeholder="Find a site" />
				</div>
			</div>
		</section>

		<div class="row">
			<ul>
				<transition-group name="fade">
					<li v-for="(install, i) in resultQuery" :key="'install-'+i">
						<router-link
							class="link columns"
							v-show="$store.state.resultData"
							:to="{ path: '/install', query: { installid: install.id } }"
						>
							<span class="install-name">{{install.name}}</span>
							<EnvLabel :env="install.environment" />
						</router-link>
					</li>
				</transition-group>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import EnvLabel from '../components/EnvLabel.vue'

export default {
	name: 'Index',
	components: {
		EnvLabel
	},
	data: () => ({
			searchQuery: null,
			showNavbar: true,
			lastScrollPosition: 0,
			wpe_uid: '',
			wpe_pwd: '',
			installs: [],
			installsReady: false
	}),

	methods: {
		getApiState() {
			if ( this.$store.state.apiStatus ) {
					this.wpe_keys = this.$store.state.apiStatus;
					this.wpe_uid = this.$store.state.wpeUid;
					this.wpe_pwd = this.$store.state.wpePwd;
			}
			this.getInstalls();
		},
		getInstalls() {
			const optionAxios = {
				headers: {
					Authorization: 'Basic ' + btoa(this.wpe_uid + ':' + this.wpe_pwd),
				}
			}

			axios
				.get('https://api.wpengineapi.com/v1/installs?limit=200', optionAxios)
				.then(response => this.installs = response.data.results)
				.then(() => {
					this.$store.commit('updateInstallsList', this.installs);
					this.installsReady = true;
				})
				.catch(() => {
					this.installsReady = 'error';
				});
		},
		onScroll () {
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
			if (currentScrollPosition < 0) return
			if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) return
			this.showNavbar = currentScrollPosition < this.lastScrollPosition
			this.lastScrollPosition = currentScrollPosition
		}
	},

	beforeMount(){
		this.getApiState()
	},

	mounted () {
		window.addEventListener('scroll', this.onScroll)
	},

	beforeDestroy () {
		window.removeEventListener('scroll', this.onScroll)
	},

	computed: {
		resultQuery(){
			if(this.searchQuery){
				return this.installs.filter((install)=>{
					return this.searchQuery.toLowerCase().split(' ').every(v => install.name.toLowerCase().includes(v))
				})
			}else{
				return this.installs;
			}
		}
	}
	
}
</script>

<style lang="scss">
@import "../assets/styles/_variables.scss";

.install-list-message {
	height: 80vh;
	min-height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;

	$load-size: 60px;
	$load-speed: 1.2s;
	$load-color: $primary-1;
	$load-inner-color: $white;

	.load-spinner {
		display: inline-block;
		border-radius: 50%;
		border: calc(#{$load-size} / 2) solid lightgray;
		border-top-color: $load-color;
		position: relative;
		animation: spin $load-speed linear infinite;
		&:after {
			content: "";
			background: $load-inner-color;
			position: absolute;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			border-radius: inherit;
			width: calc(#{$load-size} - 12px);
			height: calc(#{$load-size} - 12px);
		}
		@keyframes spin {
			to {
				transform: rotate(1turn);
			}
		}
	}

	.error-message {
		text-align: center;
		.icon {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			width: 68px;
			height: 68px;
			color: $white;
			background-color: $danger;
			font-size: 56px;
		}
	}
}

.install-list {
	.search-wrapper {
		background-color: $grey;
		padding: 12px 0;
		transition: transform .35s ease-in-out;
		position: sticky;
		top: 58px;
		&--hidden {
			transform: translate3d(0, -100%, 0);
		}
	}

	ul {
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		li {
			a {
				display: inline-flex !important;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 16px 20px;
				border-bottom: $grey 1px solid;
				font-weight: 600;
				font-size: 16px;
				box-sizing: border-box;
				color: $primary-2;
				text-decoration: none;
				&:after {
					opacity: 0;
					width: 12px;
					height: 12px;
					border-right: $primary-1 solid 2px;
					border-bottom: $primary-1 solid 2px;
					content: "";
					transition: all .2s ease-in-out;
					transform: translate3d(-100%, 0, 0) rotate(-45deg);
				}
				&:hover {
					background-color: $grey;
					&::after {
						opacity: 1;
						transform: translate3d(0, 0, 0) rotate(-45deg);
					}
					.install-name {
						width: calc(100% - 80px);
					}
				}
				.install-name {
					width: calc(100% - 24px);
					transition: width .2s ease-in-out;
				}
			}
		}
	}

	.fade-enter,
	.fade-leave-active {
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}
}

.fade-leave-active,
.fade-enter-active {
	transition: 0.25s;
}

.fade-enter,
.fade-leave-active {
	transform: translate3d(0, -20px, 0);
	opacity: 0;
}
</style>

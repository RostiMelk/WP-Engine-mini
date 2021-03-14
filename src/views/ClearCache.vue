<template>
	<div class="new-backup">
		<div class="row">
			<div class="columns">
				<h2>Clear cache: {{install.name}}</h2>
				<p>
					Clear your cache when you want browsers to display the latest version of your page.
					<br>
					<a href="https://wpengine.com/support/cache/" target="_blank" class="link">
						Learn more about page caching
						<span class="material-icons">launch</span>
					</a>
				</p>
			</div>
		</div>

		<div class="row">
			<div class="column">
				<form @submit="onSubmit" >
					<p>
						<input type="submit" class="button" value="Clear cache" v-if="cacheStatus == false" />
						<input type="submit" class="button" disabled value="Please wait ..." v-if="cacheStatus == 'wait'" />
						<input type="submit" class="button" disabled value="Wait 1 minute" v-if="cacheStatus == true" />
					</p>
					<MessageSuccess v-if="cacheStatus == true" />
				</form>
			</div>
		</div>

	</div>
</template>

<script>
import axios from 'axios';
import MessageSuccess from '../components/MessageSuccess.vue'

export default {
	name: 'NewBackup',
	props: ['installid'],
	components: {
		MessageSuccess
	},
    data: function () {
        return { 
			install: this.$store.state.installsList.find(x => x.id === this.installid),
			cacheStatus: false,
			wpe_uid: '',
			wpe_pwd: '',
        }
    },
	methods: {
		getApiState() {
			if ( this.$store.state.apiStatus ) {
				this.wpe_keys = this.$store.state.apiStatus;
				this.wpe_uid = this.$store.state.wpeUid;
				this.wpe_pwd = this.$store.state.wpePwd;
			}
		},
		onSubmit(e) {
			e.preventDefault();

			this.cacheStatus = 'wait';

			const formData = {
				"type": "object"
			}

			const optionAxios = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Basic ' + btoa(this.wpe_uid + ':' + this.wpe_pwd),
				}
			}

			axios
				.post(`https://api.wpengineapi.com/v1/installs/${this.install.id}/purge_cache`, formData , optionAxios)
				.then(() => {
					this.cacheStatus = true;
					setTimeout(() => {
						this.cacheStatus = false;
					}, 60000);
				});
		},
	},
	beforeMount(){
		this.getApiState()
	},
}
</script>

<style lang="scss">
	.new-backup {
		form {
			margin-top: 28px;
		}
	}
</style>

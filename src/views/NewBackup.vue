<template>
	<div class="new-backup">
		<div class="row">
			<div class="columns">
				<h2>Create backup: {{install.name}}</h2>
				<p>
					Create a backup to save the current version of your environment. If you make changes to your environment and would like to revert to a previous version, select from the list below and click "Restore".
					<br>
					<a href="https://wpengine.com/support/restore/" target="_blank" class="link">
						Learn more about backup points 
						<span class="material-icons">launch</span>
					</a>
				</p>
			</div>
		</div>

		<div class="row">
			<div class="column">
				<form @submit="onSubmit">
					<p>
						<label>
							Backup description
							<input type="text" id="input-wpe-uid" v-model="backup.description" required />
						</label>
					</p>
					<p>
						<label>
							Send notification to
							<input type="text" id="input-wpe-pwd" v-model="backup.notification_emails" required />
							<span class="footnote">Separate email addresses with commas</span>
						</label>
					</p>
					<p>
						<input type="submit" class="button" value="Create backup" v-if="backupStatus !== 'wait'" />
						<input type="submit" class="button" disabled value="Please wait ..." v-if="backupStatus == 'wait'" />
					</p>
					<MessageSuccess v-if="backupStatus == 'done'" />
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
			backupStatus: 'ready',
			wpe_uid: '',
			wpe_pwd: '',
			backup: {
				description: "",
				notification_emails: [],
			}
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
		getDefaultEmails() {
			if ( this.$store.state.backupEmail ) {
				this.backup.notification_emails = this.$store.state.backupEmail;
			}
		},
		query(args){
			return JSON.stringify(args)
		},
		onSubmit(e) {
			e.preventDefault();

			console.log(this.query(this.backup));

			this.backupStatus = 'wait';

			const formData = {
				"description": this.backup.description,
				"notification_emails": this.backup.notification_emails.split(/[ ,]+/)
			}

			const optionAxios = {
				headers: {
					Authorization: 'Basic ' + btoa(this.wpe_uid + ':' + this.wpe_pwd),
				}
			}

			axios
				.post(`https://api.wpengineapi.com/v1/installs/${this.install.id}/backups`, formData , optionAxios)
				.then(() => {
					this.$store.commit('updateBackupEmail', this.backup.notification_emails);
					this.backupStatus = true;
					setTimeout(() => {
						this.backupStatus = 'done';
					}, 60000);
				});
		},
	},
	beforeMount(){
		this.getApiState()
		this.getDefaultEmails()
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

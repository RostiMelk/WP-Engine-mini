<template>
  <div class="api-setup">
    <div class="row">
      <div class="columns">
       
        <h2>Log in to WP Engine</h2>
        <p>Generate API credentials from your WP Engine account and paste them here to connect. 
            <a href="https://wpengine.com/support/enabling-wp-engine-api/" target="_blank" class="link">
                Learn how
                <span class="material-icons">launch</span>
            </a>
        </p>

        <form id="api-keys">
            <p>
                <label>
                    API Username
                    <input type="text" id="input-wpe-uid" v-model="wpe_uid" :disabled="wpe_keys" />
                </label>
            </p>
            <p>
                <label>
                    API Password
                    <input type="password" id="input-wpe-pwd" v-model="wpe_pwd" :disabled="wpe_keys" />
                </label>
            </p>
            <p>
                <input type="reset" class="button danger" @click.prevent="resetKeys()" value="Delete API keys" v-if="wpe_keys" />
                <input type="submit" class="button" @click.prevent="saveKeys()" value="Save API keys" v-else />
            </p>
        </form>

      </div>
    </div>

  </div>
</template>

<script>

export default {
    name: 'ApiSetup',
    components: {
    },
    data: function () {
        return { 
            wpe_keys: false,
            wpe_uid: '',
            wpe_pwd: ''
        }
    },
    methods: {
        getApiState() {
            if ( this.$store.state.apiStatus ) {
                this.wpe_keys = this.$store.state.apiStatus;
                this.wpe_uid = this.$store.state.wpeUid;
                this.wpe_pwd = "*".repeat(this.$store.state.wpePwd.length);
            }
        },
        saveKeys() {
            this.wpe_keys = true;
            this.$store.commit('updateApiStatus', true);
            this.$store.commit('updateWpeUid', this.wpe_uid);
            this.$store.commit('updateWpePwd', this.wpe_pwd);
        },
        resetKeys() {
            this.wpe_keys = false;
            this.$store.commit('updateApiStatus', false);
            this.$store.commit('updateWpeUid', '');
            this.$store.commit('updateWpePwd', '');
            this.wpe_uid = '';
            this.wpe_pwd = '';
        }
    },
    beforeMount(){
        this.getApiState()
    },
}
</script>

<style lang="scss">
  .api-setup {
      #api-keys {
          margin-top: 28px;
      }
  }
</style>

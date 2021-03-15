<template>
    <header>
        <div class="row align-center">
            <div class="columns">
                <img src="../assets/images/wpe-mini-logo.svg" class="logo" alt="WP Engine Mini logo">
            </div>

            <div class="columns" v-if="this.$route.name !== 'apiSetup'" >
                <router-link class="api-settings-btn" to="/api-setup">
                    <span class="material-icons">settings</span>
                </router-link>
            </div>
        </div>

    </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
        currentRouteName() {
            return this.$route.name;
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../assets/styles/_variables.scss';

    header {
        position: sticky;
        top: 0;
        width: 100%;
        padding: 16px 0;
        color: $white;
        background-color: $primary-2;
        z-index: 2;
        .logo {
            display: block;
            height: 26px;
            pointer-events: none;
        }
        .api-settings-btn {
            display: flex;
            color: $white;
            float: right;
            text-decoration: none;
        }
    }
</style>

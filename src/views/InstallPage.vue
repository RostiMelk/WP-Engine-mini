<template>
  <div class="install-page">

    <div class="row">
      <ul>
        <ListItemRouter label="Backup" icon="backup" :link="{ path: '/new-backup', query: { installid: install.id } }" />
        <ListItemRouter label="Clear cache" icon="cached" :link="{ path: '/clear-cache', query: { installid: install.id } }" />
        <ListItemRouter label="Open site" icon="launch" :href="`https://${install.primary_domain}/`" />
        <ListItemRouter label="Admin panel" icon="login" :href="`https://${install.primary_domain}/wp-admin`" />
      </ul>
    </div>

    <section class="open-in-wpe-wrapper">
    <div class="row">
      <div class="columns">
        <!-- <pre>{{install}}</pre> -->
        <a 
        :href="`https://my.wpengine.com/installs/${install.name}/`" 
        class="button"
        target="_blank"
        >Open in WP Engine</a>
      </div>
    </div>
    </section>

  </div>
</template>

<script>
import ListItemRouter from '../components/ListItemRouter.vue'

export default {
  name: 'Start',
  components: {
    ListItemRouter
  },
  props: ['installid'],
  data: function () {
    return { 
      install: this.$store.state.installsList.find(x => x.id === this.installid)
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
  .install-page {
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .open-in-wpe-wrapper {
      margin-top: 28px;
    }
  }
</style>

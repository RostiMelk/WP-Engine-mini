<template>
  <div class="install-page">



    <div class="row">
      <div class="columns">

        <pre>{{install}}</pre>
      
        <a 
        :href="`https://my.wpengine.com/installs/${install.name}/`" 
        class="button"
        target="_blank"
        >Open in WP Engine</a>

        <a 
        :href="`https://${install.primary_domain}/`" 
        class="button secondary"
        target="_blank"
        >Open website</a>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Start',
  components: {
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
      }  
  }
</style>

<template>
  <div id="app">
    <PageHeader/>
    
    <transition :name="transitionDirectionY" mode="out-in">
      <BackButton v-if="this.$router.currentRoute.meta.depth > 1 && this.$store.state.apiStatus" />
    </transition>

    <transition :name="transitionDirectionX" mode="out-in">
      <router-view/>  
    </transition>

  </div>
</template>

<script>
import BackButton from './components/BackButton.vue'
import PageHeader from './components/PageHeader.vue'

export default {
  components: {
    BackButton,
    PageHeader
  },
  data() {
    return {
      transitionDirectionX: 'slide-left',
      transitionDirectionY: 'slide-up',
    }
  },
  mounted () {
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.meta.depth
      const fromDepth = from.meta.depth
      this.transitionDirectionX = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      this.transitionDirectionY = 'slide-up' ;
    }
  }
}
</script>

<style lang="scss">
  #app {
    padding-bottom: 36px;
  }
  .slide-left-leave-active,
  .slide-left-enter-active,
  .slide-right-leave-active,
  .slide-right-enter-active {
    transition: 0.25s;
  }

  .slide-up-leave-active,
  .slide-up-enter-active {
    transition: 0.35s;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .slide-right-enter,
  .slide-left-leave-active {
    transform: translate3d(-100%, 0, 0);
  }

  .slide-up-enter,
  .slide-up-leave-active {
    transform: translate3d(0, -100%, 0);
  }

</style>

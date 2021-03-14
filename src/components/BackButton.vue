<template>
    <div class="back-button">
        <div class="row">
            <div class="columns">
                <a @click="$router.go(-1)" class="back-btn" aria-label="Go back">
                  <span class="icon material-icons">arrow_back</span>
                  <span class="str">Back</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BackButton',
}
</script>

<style lang="scss">
  @import '../assets/styles/_variables.scss';

  .back-button {
    background-color: $grey;
    padding: 10px 0;
    margin-bottom: 16px;
    .back-btn {
      display: inline-flex;
      align-items: center;
      padding-right: 20px;
      cursor: pointer;
      .icon {
        margin-right: 8px;
      }
    }
  }
</style>
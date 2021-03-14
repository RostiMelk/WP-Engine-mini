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
    .back-btn {
      display: inline-flex;
      align-items: center;
      padding: 10px 40px 10px 0;
      cursor: pointer;
      .icon {
        margin-right: 8px;
        transition: transform .2s ease-in-out;
      }
      &:hover {
        .icon {
          transform: translateX(-10px);
        }
      }
    }
  }
</style>
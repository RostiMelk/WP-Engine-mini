<template>
    <p class="message-success">
        <span class="material-icons">done</span>
        Success
    </p>
</template>

<script>
export default {
  name: 'ListItemRouter',
}
</script>

<style scoped lang="scss">
    @import '../assets/styles/_variables.scss';

    .message-success {
        display: flex;
        align-items: center;
        margin-top: 8px;
        color: $success;
        .material-icons {
            margin-right: 8px;
        }
    }
</style>

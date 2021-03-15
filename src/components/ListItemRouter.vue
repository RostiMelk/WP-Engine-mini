<template>
    <li v-if="label">

        <router-link v-if="link" v-bind:to="link">
            <span v-if="icon" v-text="icon" class="material-icons"></span>
            {{label}}
        </router-link>

        <a v-else :href="href" target="_blank">
            <span v-if="icon" v-text="icon" class="material-icons"></span>
            {{label}}
        </a>

    </li>
</template>

<script>
export default {
  name: 'ListItemRouter',
  props: {
    label: String,
    icon: String,
    link: Object,
    href: String
  },
}
</script>

<style scoped lang="scss">
    @import '../assets/styles/_variables.scss';

    li {
        a {
            display: inline-flex !important;
            align-items: center;
            width: 100%;
            padding: 16px 20px;
            border-bottom: $grey 1px solid;
            font-weight: 600;
            font-size: 16px;
            box-sizing: border-box;
            color: $primary-2;
            text-decoration: none;
            &:hover {
                background-color: $grey;
            
            }
            .material-icons {
                margin-right: 12px;
                color: $primary-3;
            }
        }
    }
</style>

<template>
    <span class="env-label" :class="env">
        {{envLabel()}}
    </span>
</template>

<script>
export default {
  name: 'ListItemRouter',
  props: {
    env: String,
  },
  methods: {
		envLabel() {
			switch (this.env) {
                case 'production':
                    return "Prod";
                case 'staging':
                    return "Stag";
                case 'development':
                    return "Dev";
            }
		},
	},
}
</script>

<style scoped lang="scss">
    @import '../assets/styles/_variables.scss';

    .env-label {
        font-weight: normal;
        font-size: 12px;
        border-radius: 3px;
        padding: 1px;
        width: 29px;
        text-align: center;
        margin-left: 8px;
        &.production {
            border: $primary-1 solid 1px;
            background: rgba($primary-1, 0.3);
        }
        &.staging {
            border: $primary-2 solid 1px;
            background: rgba($primary-2, 0.12);
        }
        &.development {
            border: $primary-3 solid 1px;
            background: rgba($primary-3, 0.3);
        }
    }
</style>

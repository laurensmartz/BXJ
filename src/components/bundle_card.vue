<template>
	<header-nav v-bind:header-nav-data="headerNavData"></header-nav>
</template>

<script>
	import HeaderNav from './header_nav.vue'
	export default {
		data() {
			return {
				headerNavData: {
					title: '绑定银行卡'
				}
			}
		},
		components: {
			'header-nav': HeaderNav
		}
	}
</script>

<style>
</style>
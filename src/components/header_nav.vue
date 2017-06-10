<template>
	<header class="mui-bar mui-bar-nav custom-nav-header custom-nav-header-title">
		<a class="icon-back"><img src="../../views/images/back_white.png"/></a>
		<div class="title">
			<h4>{{ headerNavData.title }}</h4>
		</div>
	</header>
</template>

<script>
	export default {
		props: ['headerNavData']
/*		data() {
			return {	
				title: this.headerNavData
//				headerNavData: 'hell vue',				
			}
		}*/
	}
</script>

<style>
</style>
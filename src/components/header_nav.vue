<template>
	<header class="mui-bar mui-bar-nav custom-nav-header custom-nav-header-title">
		<a v-if="headerNavData.href" v-bind:href="headerNavData.href" class="icon-back"><img src="../../views/images/back_white.png"/></a>
		<a v-if="headerNavData.clickBack" v-on:click="goBack" class="icon-back"><img src="../../views/images/back_white.png" data-target="clickBack"/></a>
		<a v-if="headerNavData.goBack" onclick="javascript:history.go(-1)" class="icon-back"><img src="../../views/images/back_white.png"/></a>
		<div class="title">
			<h4>{{ headerNavData.title }}</h4>
		</div>
	</header>
</template>

<script>
	export default {
		props: ['headerNavData'],
/*		data() {
			return {	
				title: this.headerNavData
//				headerNavData: 'hell vue',				
			}
		}*/
		methods: {
			goBack: function(event){
	//			console.log(event.target.dataset.target)
				this.$emit('click', event.target.dataset.target)
			}
		}
	}
</script>

<style>
</style>
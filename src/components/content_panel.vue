<template>
	<div>
		<section class="content-panel-container" v-bind:class="contentPanelData.classObj" >
			<div v-for="item in contentPanelData.items" v-bind:style="itemWidth">
				<a :href="item.href">
				<p v-if="item.icon">
					<img v-bind:src="item.iconSrc" width="22px"/>
				</p>
				<p v-else v-bind:class="item.dataClass">{{ item.data}}</p>
				<p v-bind:class="item.titleClass">{{ item.title }}</p>
				</a>
			</div>
		</section>
	</div>	
</template>

<script>
	export default {
		props: ['contentPanelData'],
		computed: {
			itemWidth: function(){
				return 'width:' + 100/this.contentPanelData.itemNum + '%'
			}
		}
	}
</script>

<style>
</style>
<template>
	<footer class="mui-bar mui-bar-nav custom">
		<div>
			<router-link to="/">
				<img v-bind:src="footerNavData.index.imgSrc" />
				<p v-bind:class="footerNavData.index.fontClass">首页</p>
			</router-link>
		</div>
		<div>
			<a href="#">
				<img v-bind:src="footerNavData.classify.imgSrc" />
				<p v-bind:class="footerNavData.classify.fontClass">分类</p>
			</a>
		</div>
		<div>
			<router-link to="/login">
				<img v-bind:src="footerNavData.mine.imgSrc" />
				<p v-bind:class="footerNavData.mine.fontClass">我的</p>
			</router-link>
		</div>
	</footer>
</template>

<script>
	export default {
		props: ['footerNavData']
	}
</script>

<style>
</style>
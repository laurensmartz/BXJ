<template>
	<a class="mui-btn mui-btn-block custom-submit" v-on:click="!submitBtnData.disable && submit()" v-bind:style="submitBtnData.btnStyle" v-bind:class="submitBtnData.btnClass">
		<span style="color: #ffffff">{{ submitBtnData.value }}</span>
	</a>
</template>

<script>
	export default{
		props: ['submitBtnData'],
		methods: {
			submit: function(){
				this.$emit('submit')
			}
		}
	}
</script>

<style>
</style>
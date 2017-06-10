Vue.component('submit-btn', {
	props: ['submitBtnData'],
	template: '<a class="mui-btn mui-btn-block custom-submit" v-bind:style="submitBtnData.btnStyle" v-bind:class="submitBtnData.btnClass" v-on:click="!submitBtnData.disable && submit()">\
					<span style="color: #ffffff">{{ submitBtnData.value }}</span>\
				</a>',
	methods: {
		submit: function(){
			this.$emit('submit')
		}
	}
})

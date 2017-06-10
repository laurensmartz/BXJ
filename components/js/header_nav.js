Vue.component('header-nav', {
	props: ['headerNavData'],
	template: '<header class="mui-bar mui-bar-nav custom-nav-header custom-nav-header-title">\
					<a v-if="headerNavData.href" v-bind:href="headerNavData.href" class="icon-back"><img src="images/back_white.png"/></a>\
					<a v-if="headerNavData.clickBack" v-on:click="goBack" class="icon-back"><img src="images/back_white.png"/></a>\
					<a v-if="headerNavData.goBack" onclick="javascript:history.go(-1)" class="icon-back"><img src="images/back_white.png"/></a>\
					<div class="title">\
						<h4>{{ headerNavData.title }}</h4>\
					</div>\
				</header>',
	methods: {
		goBack: function(){
			this.$emit('click')
		}
	}
})

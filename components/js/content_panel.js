Vue.component('content-panel',{
	props: ['contentPanelData'],
	template: '<section class="content-panel-container" v-bind:class="contentPanelData.classObj" >\
					<div v-for="item in contentPanelData.items" v-bind:style="itemWidth">\
						<p v-if="item.icon">\
							<img v-bind:src="item.iconSrc" width="22px"/>\
						</p>\
						<p v-else v-bind:class="item.dataClass">{{ item.data}}</p>\
						<p v-bind:class="item.titleClass">{{ item.title }}</p>\
					</div>\
				</section>',
	data: function(){
		return {
			
		}
	},
	computed: {
		itemWidth: function(){
			return 'width:' + 100/this.contentPanelData.itemNum + '%'
		}
	}
})

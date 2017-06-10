Vue.component('pic-board',{
	props: ['picBoardData'],
	template:  '<section class="pic_board">\
					<ul class="mui-table-view">\
						<li class="mui-table-view-cell">\
							<header>{{ picBoardData.title}}</header>\
							<section>\
								<div class="row m-t-14" v-for="item in picBoardData.items">\
									<div class="pic_container" style="border: 1px solid red">\
										<img v-if="item.plusImg" :src="item.picSrcLeft"/>\
										<input type="file" v-on:change="changeImg(this.event)" style="opacity: 0; border: 1px solid red; width: 100%; height: 100%; position: absolute; left:0; z-index: 999" accept="image/jpeg,image/jpg" capture="camera">\
										<p v-if="item.subTitleLeft">{{ item.subTitleLeft }}</p>\
									</div>\
									<div></div>\
									<div class="pic_container" style="border: 1px solid red">\
										<img :src="item.picSrcRight" />\
										<p v-if="item.subTitleRight">{{ item.subTitleRight }}</p>\
									</div>\
								</div>\
							</section>\
						</li>\
					</ul>\
				</section>',
	methods: {
		changeImg: function(event){
			this.$emit('change', event.srcElement)
		}
	}
})

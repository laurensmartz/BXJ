Vue.component('footer-nav',{
	props: ['footerNavData'],
	template:  '<footer class="mui-bar mui-bar-nav custom">\
					<div>\
						<a href="index.html">\
							<img v-bind:src="footerNavData.index.imgSrc" />\
							<p v-bind:class="footerNavData.index.fontClass">首页</p>\
						</a>\
					</div>\
					<div>\
						<a href="#">\
							<img v-bind:src="footerNavData.classify.imgSrc" />\
							<p v-bind:class="footerNavData.classify.fontClass">分类</p>\
						</a>\
					</div>\
					<div>\
						<a href="login.html">\
							<img v-bind:src="footerNavData.mine.imgSrc" />\
							<p v-bind:class="footerNavData.mine.fontClass">我的</p>\
						</a>\
					</div>\
				</footer>'
})

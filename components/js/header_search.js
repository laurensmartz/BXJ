Vue.component('header-search', {
	props: ['headerNavData'],
	template: '<header class="mui-bar mui-bar-nav custom-nav-header custom-nav-header-search">\
				<a v-on:click="leftIconClick"><img v-bind:src="headerNavData.leftIcon"></span></a>\
				<div v-if="headerNavData.search" class="mui-input-row mui-search custom-search">\
					<input type="search" class="mui-input-clear" placeholder="搜索商品"/>\
				</div>\
				<div else-if class="title">\
						<h4>{{ headerNavData.title }}</h4>\
				</div>\
				<a><img v-bind:src="headerNavData.rightIcon"></span></a>\
			</header>',
	methods: {
		/*scanQRCODE: function(){
			if(wx){
				wx.scanQRCode({
				    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				    success: function (res) {
				    	var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
				});
			} else {
				alert('Error')
			}
		}*/
		leftIconClick: function(){
			this.$emit('click', 'leftIcon')
		}
	}
})

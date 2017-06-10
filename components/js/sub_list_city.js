Vue.component('sub-list-city', {
	props: ['subListData'],
	template: '<article class="sub-list">\
				<header v-if="subListData.headerTitle">{{ subListData.headerTitle }}</header>\
				<section v-if="subListData.noNavigate">\
					<ul class="mui-table-view">\
						<li class="mui-table-view-cell" v-for="item in subListData.subList.items">\
							<a v-bind:class="{\'mui-navigate-right\': item.navigateRight}">\
								<span v-if="item.title">{{ item.title }}</span>\
								<span v-if="item.pdtName">{{ item.pdtName }}</span>\
								<div v-if="item.placeHolder" v-bind:class="{\'minus-width\': item.minusWidth}" class="mui-input-row">\
									<input type="text" :placeholder="item.placeHolder" class="" v-model="item.inputData"/>\
								</div>\
								<a id="or" v-if="item.rightSpan" :href="item.rightSpanLink" v-on:click="flag && rightSpanClick(this.event)"><span v-bind:class="item.classObj">{{ item.rightSpan }}</span></a>\
							</a>\
						</li>\
					</ul>\
				</section>\
				<section v-if="subListData.navigateRight">\
					<ul class="mui-table-view">\
						<li class="mui-table-view-cell" v-for="item in subListData.subList.items" v-on:click="navigate(this.event)">\
							<a class="mui-navigate-right" :data-city-value="item.value">\
								<span v-if="item.title">{{ item.title }}</span>\
								<span v-if="item.pdtName">{{ item.pdtName }}</span>\
								<div v-if="item.placeHolder" v-bind:class="{\'minus-width\': item.minusWidth}" class="mui-input-row">\
									<input type="text" :placeholder="item.placeHolder" class="" v-model="item.inputData"/>\
								</div>\
								<a id="or" v-if="item.rightSpan" :href="item.rightSpanLink" v-on:click="flag && rightSpanClick(this.event)"><span v-bind:class="item.classObj">{{ item.rightSpan }}</span></a>\
							</a>\
						</li>\
					</ul>\
				</section>\
			</article>',
	data: function(){
		return {
			flag: true
		}
	},
	methods: {
		//右侧元素点击事件
		rightSpanClick: function(event){
//			jQuery(event.srcElement).hide();
			switch(this.subListData.subList.items[3].rightSpanFun){
				case 'obtainValidCode':
					this.obtainValidCode(event.srcElement)
					break;
				default:
					alert('fun not found')
			}
		},
		//获取验证码
		obtainValidCode: function(srcElement){			
			//获取用户手机号
			var mobile = this.subListData.subList.items[0].inputData;
			
			if(1){
				var	data = {mobile: mobile,type: 1},			//请求数据
				jsonData = JSON.stringify(data)				//json化
				
				//发起请求
				jQuery.ajax({
					url: 'http://192.168.1.34:8080/?act=Api/VerifyCode/requestVerifyCode',
					type: 'POST',
					data: {
						encryptionType: 0,
						data: jsonData								
					},
					dataType: 'json',
					beforeSend: function(){
						console.log(mobile)
						console.log(jsonData)
						console.log(data)
					},
					success: function(data){
						console.log(data.verify_code)
					}
				})
				this.countDown(srcElement)
//				console.log('11')	
				
			}			
		},
		//验证码倒计时
		countDown: function(srcElement){
			var num = 3;
			flag = false			
			clock = setInterval(doLoop, 1000)
			
			function doLoop(){
				num--;
				if(num > 0){
					srcElement.innerHTML = '重新获取(' + num + ')'
				} else {
					clearInterval(clock)
					srcElement.innerHTML = '获取验证码'
					flag = true
				}
			}
		},
		navigate: function(event){
			console.log(event.srcElement)
			console.log(this['data-city-value'])
			this.$emit('click')
		}
	}
})

Vue.component('sub-list', {
	props: ['subListData'],
	template: '<article class="sub-list">\
				<header v-if="subListData.headerTitle">{{ subListData.headerTitle }}</header>\
				<section>\
					<ul class="mui-table-view">\
						<li class="mui-table-view-cell" v-for="item in subListData.subList.items" v-on:click="!item.noItemClick && itemClick(item.title, item.value, item.children)">\
							<a v-bind:class="{\'mui-navigate-right\': item.navigateRight}">\
								<span v-if="item.title">{{ item.title }}</span>\
								<input v-if="item.inputFile" type="file" v-bind:id="item.fileId" v-on:change="changeImg" style="opacity: 0; border: 1px solid red; height: 50px; position:absolute; left: 0; top: 0; z-index: 999" accept="image/jpeg,image/jpg" capture="camera">\
								<span v-if="item.pdtName">{{ item.pdtName }}</span>\
								<div v-if="item.inputPwd" class="mui-input-row">\
									<input type="password" :placeholder="item.placeHolder" class="" v-model="item.inputData"/>\
								</div>\
								<div v-if="item.inputText" v-bind:class="{\'minus-width\': item.minusWidth}" class="mui-input-row">\
									<input type="text" :placeholder="item.placeHolder" class="" v-model="item.inputData" v-on:blur="inputBlur"/>\
								</div>\
								<a v-if="item.rightSpan" :href="item.rightSpanLink" v-bind:class="item.rightBoxClass"><span id="rightSpan" v-bind:style="item.rightSpanStyle" v-bind:class="item.classObj" v-on:click="rightFlag && rightClick(this.event, item.rightFun)">{{ item.rightSpan }}</span></a>\
								<a v-if="item.rightWidget"><img v-if="item.rightWidget.imgSrc" v-bind:src="item.rightWidget.imgSrc" v-bind:style="item.rightWidget.imgStyle"/></a>\
							</a>\
						</li>\
					</ul>\
				</section>\
			</article>',
	data: function(){
		return {
			rightFlag: true
		}
	},
	methods: {
		//右侧元素点击事件
		rightClick: function(event, funName){
			//匹配执行方法
			switch(funName){
				case 'obtainValidCode':
					this.$emit('click', event.srcElement, funName)
					break
				case 'showCityList':
					this.$emit('click', null, funName)
					break
				case 'showBankList':
					this.$emit('click', null, funName)
					break
				default:
			}
		},
		//点击列表
		itemClick: function(arg1, arg2, arg3){
//			console.log(event.target.id)
			this.$emit('click', arg1, arg2, arg3)
			/*var srcEle = event.srcElement,
				srcId = srcEle.getAttribute('id')*/
		},
		changeImg: function(){
			this.$emit('change', event.srcElement)
		},
		inputBlur: function(){
			this.$emit('blur')
		}
	}
})

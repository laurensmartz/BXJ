<template>
	<div>
		<article class="sub-list">
			<header v-if="subListData.headerTitle">{{ subListData.headerTitle }}</header>
			<section>
				<ul class="mui-table-view" v-bind:class="subListData.tableViewClass">
					<li class="mui-table-view-cell" v-for="item in subListData.subList.items" v-on:click="!item.noItemClick && itemClick(item.title, item.value, item.children)" :class="item.liClass">
						<a v-bind:class="{'mui-navigate-right': item.navigateRight, noActive: item.noActive}">
							<a v-if="item.leftWidget"><img v-if="item.leftWidget.imgSrc" v-bind:src="item.leftWidget.imgSrc" v-bind:style="item.leftWidget.imgStyle" /></a>
							<span v-if="item.title" v-bind:style="item.titleStyle">{{ item.title }}</span>
							<input v-if="item.inputFile" type="file" v-bind:id="item.fileId" v-on:change="changeImg" style="opacity: 0; border: 1px solid red; height: 50px; position:absolute; left: 0; top: 0; z-index: 999" accept="image/jpeg,image/jpg,image/jpeg">
							<span v-if="item.pdtName">{{ item.pdtName }}</span>
							<div v-if="item.inputPwd" class="mui-input-row">
								<input type="password" :maxlength="item.maxLength" :placeholder="item.placeHolder" class="" v-model="item.inputData"/>
							</div>
							<div v-if="item.inputText" v-bind:class="{'minus-width': item.minusWidth}" class="mui-input-row">
								<input type="text" :maxlength="item.maxLength" :placeholder="item.placeHolder" class="" v-model="item.inputData" v-on:blur="inputBlur"/>
							</div>
							<div v-if="item.textArea" v-bind:class="{'minus-width': item.minusWidth}" class="mui-input-row">
								<textarea v-model="item.inputData" rows="2"/></textarea>
							</div>
							<div v-if="item.btn" v-bind:class="{'minus-width': item.minusWidth}" class="mui-input-row">
								<button :class="item.btnClass">{{ item.btnValue }}</button>
							</div>
							<a v-if="item.rightSpan" :href="item.rightSpanLink" v-bind:class="item.rightBoxClass"><span id="rightSpan" v-bind:style="item.rightSpanStyle" :class="item.classObj" :data-right-fun="item.rightFun" v-on:click="rightClick">{{ item.rightSpan }}</span></a>
							<a v-if="item.rightWidget"><img v-if="item.rightWidget.imgSrc" v-bind:src="item.rightWidget.imgSrc" v-bind:style="item.rightWidget.imgStyle"/></a>
						</a>
					</li>
				</ul>
			</section>
		</article>
	</div>
</template>

<script>
	export default {
		props: ['subListData'],
		methods: {
			//右侧元素点击事件
			rightClick: function(event){
				//获取事件元素
				var target = event.target
				//获取需要执行函数名
				var funName = target.dataset.rightFun
				//匹配执行方法
				switch(funName){
					case 'obtainValidCode':
						this.$emit('click', target, funName)
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
			changeImg: function(event){
				this.$emit('change', event.target)
			},
			inputBlur: function(){
				this.$emit('blur')
			}
		}
	}
</script>

<style>
</style>
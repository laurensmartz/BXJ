<template>
	<div id="message" v-cloak>
		<section v-show="messagePanel.show" class="custom-container m-t-44">
			<header-nav :header-nav-data="messagePanel.headerNav"></header-nav>
			<div id="pullRefresh" class="mui-scroll-wrapper message-list-wrapper">
				<div class="mui-scroll">
					<ul class="mui-table-view message-list">							
						<li v-for="item in messagePanel.messageList.items" class="mui-table-view-cell">
							<div class="left">
								<span></span>
							</div>
							<div class="right">
								<p>
									<span class="f-s-16">{{ item.title }}</span>
									<span>{{ item.create_time }}</span>
								</p>
								<p>
									{{ item.content }}
								</p>
							</div>						
						</li>
					</ul>
				</div>					
			</div>				
		</section>
		
		<!--消息详情-->
		<section v-if="messageDetailPanel.show" class="custom-container m-t-44">
			<header-nav :header-nav-data="messageDetailPanel.headerNav" v-on:click="showMessagePanel"></header-nav>
			<section class="message-wrapper text-center p-10">
				<div class="f-s-14">系统消息</div>
				<div class="m-t-10">{{ messageDetailPanel.content.time }}</div>
				<div class="m-t-10 text-left text-indent">{{ messageDetailPanel.content.contentBody }}</div>
			</section>
		</section>
		<!--消息详情-->
		
		<loading v-if="loading"></loading>
	</div>
</template>

<script>
	import mui from '../../../js/mui.min.js'
	import $ from 'jquery'
	import HeaderNav from '../header_nav.vue'
	import fun from '../../../js/common/fun.js'
	import ajaxFun from '../../../js/common/ajaxFun.js'
	import service from '../../../js/common/service.config.js'
	import api from '../../../js/common/api.config.js'
	export default {
		data() {
			return {
				messagePanel: {
					show: true,
					headerNav: {
						title: '我的消息',
						goBack: true
					},
					messageList: {
						items: []
					}
				},
				messageDetailPanel: {
					show: false,						
					headerNav: {
						title: '消息详情',
						clickBack: true
					},
					content: {
						time: '',
						contentBody: ''
					}
				},
				loading: false,
				token_g: ''
			}
		},
		methods: {
			showMessagePanel: function(){
				$('body').removeClass('bg-white')
				
				this.messageDetailPanel.show = false
				this.messagePanel.show = true
			}
		},
		created() {
			this.token_g = fun.existToken()	
		},
		mounted() {
			var vm = this
			var pageIndex = 1,
				pageCount = 10,
				pageIndexG = 1
			//获取消息列表数据
			getMessageList(pageIndex, pageCount)
						
			mui('#pullRefresh').pullRefresh({
//					container: '#pullRefresh',
					up: {
						height: 50,
						contentrefresh: '正在加载...',
						contentnomore: '没有更多数据了',
						callback: pullupRefresh
					}
			})
				
			mui.ready(function(){
				$('.mui-pull-bottom-pocket .mui-pull .mui-pull-loading').addClass('mui-hidden')				
			})
			
			function pullupRefresh(){
				setTimeout(function(){
					getMessageList(pageIndexG, pageCount)
				}, 1500)
			}
			
			function getMessageList(pageIndex, pageCount){
				var url = service.config.url + api.config.messageList,
					originData = {
						pageIndex: pageIndex,
						pageCount: pageCount
					},
					requestData = ajaxFun.requestData(originData, 1, vm.token_g)
					console.log(requestData)
				ajaxFun.common(url, 'POST', requestData, 'json', success, ajaxFun.callBack.error,
						ajaxFun.callBack.complete, ajaxFun.callBack.beforeSend)
				
				function success(data){
					if(data.code == 1){
						if(!data.data.length){
							mui('#pullRefresh').pullRefresh().endPullupToRefresh(true)
							return
						}
						console.log(data)
//						var arr = []
						var obj,
							messageList = document.getElementsByClassName('message-list')[0],
							liSet = messageList.getElementsByTagName('li')
						
						for (var i = 0; i < data.data.length; i++){
							/*arr[i] = {
								title: data.data[i]['title'],
								create_time: data.data[i]['create_time'],
								content: data.data[i]['content']
							}*/
							obj = {
								title: data.data[i]['title'],
								create_time: data.data[i]['create_time'],
								content: data.data[i]['content']
							}
							
							vm.messagePanel.messageList.items.push(obj)
						}
						
						vm.$nextTick(function(){
							for (var i = (pageIndex - 1) * pageCount; i < vm.messagePanel.messageList.items.length; i++) {
								liSet[i].addEventListener('tap', tagListener(i))
							}
						})
						
						function tagListener(i){
							return function(){
								var messageList = vm.messagePanel.messageList
								
								vm.messageDetailPanel.content.time = messageList.items[i]['create_time']
								vm.messageDetailPanel.content.contentBody = messageList.items[i]['content']
								
								$('body').addClass('bg-white')
								
								vm.messagePanel.show = false
								vm.messageDetailPanel.show = true
								/*console.log(i)
								console.log(vm.messagePanel.messageList.items[i].content)*/
							}
						}
//						vm.messagePanel.messageList.items = arr
						
						mui('#pullRefresh').pullRefresh().endPullupToRefresh()
						
						pageIndexG++
					} else {
						console.log(data.msg)
					}
				}
			}
		},
		updated() {
						
		},
		beforeDestroy() {
//			console.log('beforeDestroyed')
		},
		destroyed() {
//			console.log('destroyed')
		},
		components: {
			'header-nav': HeaderNav
		}
	}
</script>

<style>
</style>
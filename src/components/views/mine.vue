<template>
	<div>
		<header-search-nav :header-nav-data="headerNavData" v-on:click="iconClick"></header-search-nav>
		<!--内容容器-->
		<section v-if="minePanel" class="m-t-35 custom-container">				
			<!--页面头部-->
			<header class="mine-header">
				<section class="mine-header-content-container">
					<section class="avator-container" v-on:click="bigAvatarToggle('show')">
						<img v-bind:src="mineInfo.avatarUrl"/>
						<!--<div class="clear-both"></div>-->
					</section>
					<section class="info-container">
						<p v-cloak v-if="mineInfo.mobile">会员ID：{{ mineInfo.mobile }}</p>
						<p v-cloak v-if="mineInfo.nickName">昵称：{{ mineInfo.nickName }}</p>
					</section>
					<div class="clear-both"></div>
				</section>
				<content-panel :content-panel-data="wealthDetail"></content-panel>
			</header>
			<!--页面头部-->
			
			<!--账单面板-->
			<section class="bill-container m-t-10">
				<sub-list :sub-list-data="billTotal" v-on:click="goView"></sub-list>
				<content-panel :content-panel-data="billDetail"></content-panel>
			</section>
			<!--账单面板-->
			
			<!--订单面板-->
			<section class="order-container m-t-10">
				<sub-list :sub-list-data="orderTotal" v-on:click="goView"></sub-list>
				<content-panel :content-panel-data="orderDetail"></content-panel>
			</section>
			<!--订单面板-->
			
			<!--其他选项面板-->
			<section class="otherOptions-container m-t-10" style="padding-bottom: 52px;">
				<sub-list :sub-list-data="otherOptions" v-on:click="goView"></sub-list>
			</section>
			<!--其他选项面板-->
		</section>
		<!--内容容器-->
		
		<footer-nav :footer-nav-data="footerNavData"></footer-nav>
	</div>	
</template>

<script>
	import HeaderSearchNav from '../header_search_nav.vue'
	import ContentPanel from '../content_panel.vue'
	import SubList from '../sub_list.vue'
	import FooterNav from '../footer_nav.vue'
	import fun from '../../../js/common/fun.js'
	import ajaxFun from '../../../js/common/ajaxFun.js'
	import service from '../../../js/common/service.config.js'
	import api from '../../../js/common/api.config.js'
	import Bus from '../../bus.js'
	export default {
		data() {
			return {
				headerNavData: {
					search: false,
					title: '我的',
					leftIcon: '../../views/images/setting.png',
					rightIcon: '../../views/images/message.png',
					iconClass: {
						leftIcon: {'mui-icon-gear': true},
						rightIcon: {'mui-icon-extra-comment': true}
					}
				},
				minePanel: true,
				mineInfo: {
					mobile: ''
				},
				wealthDetail: {
					classObj: {'bg-2797df': true},
					itemNum: 3,
					items: {
						first: {title: '积分', data: '', dataClass: {'span-white': true}, titleClass: {'span-white': true}},
						second: {title: '信用额度', data: '', dataClass: {'span-white': true}, titleClass: {'span-white': true}},
						third: {title: '收藏', data: '0', dataClass: {'span-white': true}, titleClass: {'span-white': true}}
					}
				},
				billTotal: {
					subList: {
						items: [{title: '我的账单', rightSpan: '全部', classObj: {'span-grey': true}, navigateRight: true}]
					}
				},
				billDetail: {
					classObj: {'bg-white': true, 'divide-black': true},
					itemNum: 3,
					items: {
						first: {title: '本期待还', data: '0', dataClass: {'span-blue': true}, titleClass: {'span-grey': true}},
						second: {title: '消费笔数', data: '0', dataClass: {'span-blue': true}, titleClass: {'span-grey': true}},
						third: {title: '滞纳金', data: '0', dataClass: {'span-red': true}, titleClass: {'span-grey': true}}
					}
				},
				orderTotal: {
					subList: {
						items: [{title: '我的订单', rightSpan: '全部', classObj: {'span-grey': true}, navigateRight: true}]
					}
				},
				orderDetail: {
					classObj: {'bg-white': true, 'divide-white': true},
					itemNum: 4,
					items: {
						first: {icon: true, iconSrc: '../../views/images/mine_1.png', title: '待付款', data: '200', dataClass: {'span-blue': true}, titleClass: {'span-grey': true}},
						second: {icon: true, href: 'orders.html?orderStatus=toAudit', iconSrc: '../../views/images/mine_2.png', title: '待审核', data: '200', dataClass: {'span-blue': true}, titleClass: {'span-grey': true}},
						third: {icon: true, iconSrc: '../../views/images/mine_3.png', title: '待收货', data: '200', dataClass: {'span-red': true}, titleClass: {'span-grey': true}},
						forth: {icon: true, iconSrc: '../../views/images/mine_4.png', title: '待评价', data: '200', dataClass: {'span-red': true}, titleClass: {'span-grey': true}}
					}
				},
				otherOptions: {
					subList: {
						items: [{title: '我的订单进度', navigateRight: true, rightWidget: {}},
								{title: '我的银行卡', navigateRight: true, rightWidget: {}},
								{title: '联系我们', navigateRight: true, rightWidget: {}},
								{title: '我的二维码', navigateRight: true, rightWidget: {}}
						]
					}
				},
				footerNavData: {
					index: {
						imgSrc: '../../views/images/nav-footer/index_off.png',
						fontClass: {'span-black': true}
					},
					classify: {
						imgSrc: '../../views/images/nav-footer/fare_off.png',
						fontClass: {'span-black': true}
					},
					mine: {
						imgSrc: '../../views/images/nav-footer/mine_on.png',
						fontClass: {'span-blue': true}
					}
				},
				token_g: ''
			}
		},
		methods: {
			iconClick: function(src){
				switch(src){
					case 'leftIcon':
						goSetting()
						break
					case 'rightIcon':
						goMessage()
						break
					default:
						console.log('fun not exist')
				}
				//跳转到设置页
				function goSetting(){
					window.location.href = '#/setting'
				}
				function goMessage(){
					window.location.href = '#/message'
				}
			},
			goView: function(){},
			otherOptions: function(){}
		},
		components: {
			'header-search-nav': HeaderSearchNav,
			'footer-nav': FooterNav,
			'content-panel': ContentPanel,
			'sub-list': SubList
		},
		created() {
			this.token_g = fun.existToken()
//			console.log(this.token_g)
			var vm = this
			if(ajaxFun.common){				
				//设置请求url
				var url = service.config.url + api.config.mineInfo
				//设置原数据
				var originData = {}
				//序列化和sign加密
				var dataSet = ajaxFun.dataStringify(originData)
				//请求数据
				var requestData = ajaxFun.requestData({}, 1, this.token_g)
				//发起请求
				ajaxFun.common(url, 'POST', requestData, 'json', success, error, complete, beforeSend)
				//请求成功回调函数
				function success(data){
//					console.log(data)
					if(data.code == 1){
						//会员ID
						vm.mineInfo.mobile = data.data.member_id
						//昵称
						vm.mineInfo.nickName = data.data.nick_name
						//头像
						//判断是否有设置头像
						if(data.data.avatar_url){
							//使用自定义头像
							vm.mineInfo.avatarUrl = data.data.avatar_url							
						} else {
							//使用默认头像
							vm.mineInfo.avatarUrl = 'images/head_small.png'
						}
						//积分
						vm.wealthDetail.items.first.data = data.data.score
						//信用
						vm.wealthDetail.items.second.data = data.data.credit
						//本期待还
						vm.billDetail.items.first.data = data.data['no_repayment_amount']
						//消费笔数
						vm.billDetail.items.second.data = data.data['consume_num']
						//滞纳金
						vm.billDetail.items.third.data = data.data['total_overdue_fine']
						//是否认证
						sessionStorage.setItem('is_certification', data.data.is_certification)
						//显示我的面板
						vm.minePanel = true
					} else {
						mui.alert(data.msg)
					}
				}
				function error(){
					message.connError()
				}
				function complete(){
					vm.loading = false
				}
				function beforeSend(){
					vm.loading = true
				}
			} else {
				console.log('ajaxFun.common not exist')
			}
		},
		mounted() {
//			console.log(this.token)
//			console.log('mine bus')
//			Bus.$emit('token_g', this.token_g)
		},
		beforeDestroy(){
//			Bus.$emit('token_g', this.token_g)
		}
	}	
</script>

<style>
</style>
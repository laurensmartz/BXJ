<template>
	<div id="index">
		<header-search-nav :header-nav-data="headerNavData"></header-search-nav>
		<div class="custom-container m-t-34">
			<slide-banner :slide-banner-data="slideBannerData"></slide-banner>
			<nav-icon :nav-icon-text="navIconText"></nav-icon>
			<div style="clear: both;"></div>
			<div class="ad-xbkb">
				<div class="ad-header">
					<span>小百快报</span>
				</div>
				<div class="divider"></div>
				<div class="ad-body">
					<span>华为p9</span>
				</div>
			</div>
			<nav-regist></nav-regist>
			<article v-if="hotRecommendShow" class="hot-recommend">
					<header class="header">
						<!--<span>热门分期</span>-->
						<div class="hot-icon">
							<img src="../../../views/images/fenqi.png" />
						</div>
						<!--<a href="category.html"><span class="mui-icon mui-icon-more"></span></a>-->
					</header>
					<section id="containerTest" class="body swiper-container">
						<div class="swiper-wrapper">
							<div v-for="item in hotStageData" class="swiper-slide pdt-item">
								<div class="pdt-container">
									<a :href="item.href">
										<!--<div class="combo-icon">{{ item['stage_payment' ]}}</div>-->
										<img :src="item['logo']" style="width: 60px; height: 60px;"/>
										<p class="span-grey f-s-12">{{ item['operators'] == 1 ? '移动' : item['operators'] == 2 ? '联通' : '电信'}}话费宝</p>
										<p class="pdt-price">{{ item['name'] }}</p>
										<p class="pdt-month f-s-12">月供:￥{{ item['stage_payment'] }}</p>	
									</a>									
								</div>
							</div>
						</div>
					</section>
				</article>
			<footer-nav :footer-nav-data="footerNavData"></footer-nav>
		</div>
	</div>
</template>

<script>
	import mui from '../../../js/mui.min.js'
	import HeaderSearchNav from '../header_search_nav.vue'
	import SlideBanner from '../slide_banner.vue'
	import NavIcon from '../nav_icon.vue'
	import NavRegist from '../nav_regist.vue'
	import FooterNav from '../footer_nav.vue'
	import fun from '../../../js/common/fun.js'
	import ajaxFun from '../../../js/common/ajaxFun.js'
	import service from '../../../js/common/service.config.js'
	import api from '../../../js/common/api.config.js'
	import Swiper from '../../../js/lib/swiper.min.js'
	export default {
		data() {
			return {
				headerNavData: {
					search: true,
					leftIcon: '../../views/images/scan.png',
					rightIcon: '../../views/images/message.png',
					iconClass: {
						leftIcon: {'mui-icon-extra-sweep': true},
						rightIcon: {'mui-icon-extra-comment': true}
					}
				},
				slideBannerData: {
					
				},
				navIconText: ['联通', '电信', '移动', '裸机商城', '我的收款'],
				hotStageData: [],
				footerNavData: {
					index: {
						imgSrc: '../../views/images/nav-footer/index_on.png',
						fontClass: {'span-blue': true}
					},
					classify: {
						imgSrc: '../../views/images/nav-footer/fare_off.png',
						fontClass: {'span-black': true}
					},
					mine: {
						imgSrc: '../../views/images/nav-footer/mine_off.png',
						fontClass: {'span-black': true}
					}
				},
				token_g: '',
				hotRecommendShow: false
			}		
		},
		created () {
	    	// 组件创建完后获取数据，
	    	// 此时 data 已经被 observed 了
	    	/*console.log('aaaa')
	    	mui.ready(function(){
	    		console.log('mui ready')
	    	})*/
	    	//获取token
	    	this.token_g = fun.existToken()
		},
		mounted () {
			//激活slider
			mui(".mui-slider").slider({
               interval: 5000
          	});
          	//激活搜索框
          	mui('.mui-input-row input').input(); 
          	
          	var vm = this
//	    	console.log(this.token_g)
	    	//开始定位
			if(typeof BMap != 'undefined'){
				var gl = new BMap.Geolocation()
				
				gl.getCurrentPosition(function(result){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var province = result.address.province,
							city = result.address.city
							
							//获取数据库里的城市Id
							var url = service.config.url + api.config.regionId,
								originData = {
									region_name: city,
									//2表示获取的是城市id
									region_type: 2
								},
								requestData = ajaxFun.requestData(originData, 0)

							ajaxFun.common(url, 'POST', requestData, 'json', success, ajaxFun.callBack.error, 
										ajaxFun.callBack.complete, ajaxFun.callBack.beforeSend)
							
							function success(data){
								if(data.code == 1){
									var regionId = data.data.region_id.region_id
									console.log(regionId)
									
									//首页热门分期
									var hotStageUrl = service.config.url + api.config.hotStage
									
									var originData = {
										city_id: regionId
									}
									
									var requestData = ajaxFun.requestData(originData, 1, vm.token_g)
									console.log(requestData)
									ajaxFun.common(hotStageUrl, 'POST', requestData, 'json', successHotStage, ajaxFun.callBack.error,
										ajaxFun.callBack.complete, ajaxFun.callBack.beforeSend)
									
									function successHotStage(data){
										if(data.code == 1){
											if(data.data.length != 0){
												var arr = []
											
												for (var i = 0; i < data.data.length; i++) {
													arr[i] = {
														tel_charge_id: data.data[i]['tel_charge_id'],
														stage_payment: data.data[i]['stage_payment'],
														operators: data.data[i]['operators'],
														name: data.data[i]['name'],
														logo: data.data[i]['logo'],
														href: 'category.html?operator=' + data.data[i]['operators'] + 
															'&chargeId=' + data.data[i]['tel_charge_id'] + 
															'&goodsName=' + data.data[i]['goods_name'] +
															'&cityName=' + city
													}
												}
												//更新热门数据
												vm.hotStageData = arr
												
												vm.$nextTick(function () {
											        // DOM 现在更新了
											        //swiper插件初始化
												 	var swiper = new Swiper('.swiper-container', {
														slidesPerView: 'auto',
												        paginationClickable: true,
												        freeMode: true
												   });
												   
												   vm.hotRecommendShow = true
										      	})
											}										
										} else {
//											mui.alert(data.msg)
										}
									}
								}
							}
					}
				},{
					//要求浏览器获取最佳结果
					enableHighAccuracy:  true,
					//超时时间
					timeout: 5000,
					//允许返回指定时间内的缓存结果。如果此值为0，则浏览器将立即获取新定位结果
					maximumAge: 500000
				})
			}
		},
		components: {
			'header-search-nav': HeaderSearchNav,
			'slide-banner': SlideBanner,
			'nav-icon': NavIcon,
			'nav-regist': NavRegist,
			'footer-nav': FooterNav
		}
	}
</script>

<style>
</style>
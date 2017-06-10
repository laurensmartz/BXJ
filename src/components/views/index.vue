<template>
	<div>
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
			<!--<article class="hot-recommend">
				<header class="header">
					<span>热门分期</span>
				</header>
				<section id="containerTest" class="body swiper-container">
					<div class="swiper-wrapper">
						<div v-for="item in hotStageData" class="swiper-slide pdt-item">
							<div class="pdt-container">
								<a :href="item.href">
									<img :src="item['logo']" style="width: 60px;"/>
									<p class="span-grey f-s-12">{{ item['operators'] == 1 ? '移动' : item['operators'] == 2 ? '联通' : '电信'}}话费宝</p>
									<p class="pdt-price">{{ item['name'] }}</p>
									<p class="pdt-month f-s-12">月供:￥{{ item['stage_payment'] }}</p>	
								</a>									
							</div>
						</div>
					</div>
				</section>
			</article>-->
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
				}
			}
		},
		created () {
	    	// 组件创建完后获取数据，
	    	// 此时 data 已经被 observed 了
	    	console.log('aaaa')
	    	mui.ready(function(){
	    		console.log('mui ready')
	    	})
		},
		mounted () {
			//激活slider
			mui(".mui-slider").slider({
               interval: 5000
          	});
          	//激活搜索框
          	mui('.mui-input-row input').input(); 		
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
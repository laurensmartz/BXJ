<template>
	<!--首页幻灯片-->
	<div class="mui-slider custom-slider-banner">
		<div class="mui-slider-group mui-slider-loop">
			<!--最后一张图的复制-->
			<div class="mui-slider-item mui-slider-item-duplicate">
				<a href="#">
					<img src="../../views/images/yuantiao.jpg" />
				</a>
			</div>
			<!--最后一张图的复制-->
			<div class="mui-slider-item">
				<a href="#">
					<img src="../../views/images/shuijiao.jpg">
				</a>
			</div>
			<div class="mui-slider-item">
				<a href="#">
					<img src="../../views/images/muwu.jpg">
				</a>
			</div>
			<div class="mui-slider-item">
				<a href="#">
					<img src="../../views/images/cbd.jpg">
				</a>
			</div>
			<div class="mui-slider-item">
				<a href="#">
					<img src="../../views/images/yuantiao.jpg">
				</a>
			</div>
			<!--第一章图的复制-->
			<div class="mui-slider-item mui-slider-item-duplicate">
				<a href="#">
					<img src="../../views/images/shuijiao.jpg" />
				</a>
			</div>
			<!--第一章图的复制-->
		</div>
		<!--幻灯片切换按钮-->
		<div class="mui-slider-indicator custom-slider-indicator">
			<div class="mui-indicator mui-active"></div>
			<div class="mui-indicator"></div>
			<div class="mui-indicator"></div>
			<div class="mui-indicator"></div>
		</div>
		<!--幻灯片切换按钮-->
	</div>
	<!--首页幻灯片-->
</template>

<script>
	export default {
		props: ['slideBannerData']
	}
</script>

<style>
</style>
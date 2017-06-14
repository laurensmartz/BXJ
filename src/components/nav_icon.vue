<template>
	<nav class="nav-icon">
		<div class="nav-icon-row">
			<div class="nav-icon-item">
				<div class="nav-icon-avator">
					<a href="hfb.html"><img src="../../views/images/nav-icon/unicom.png"/></a>
				</div>
				<span>{{ navIconText[0] }}</span>
			</div>
			<div class="nav-icon-item">
				<div class="nav-icon-avator">
					<img src="../../views/images/nav-icon/telicom.png"/>
				</div>
				<span>{{ navIconText[1] }}</span>
			</div>
			<div class="nav-icon-item">
				<div class="nav-icon-avator">
					<img src="../../views/images/nav-icon/CMCC.png"/>
				</div>
				<span>{{ navIconText[2] }}</span>
			</div>
			<div class="nav-icon-item">
				<div class="nav-icon-avator">
					<a v-on:click="comingSoon">
						<img src="../../views/images/nav-icon/phone.png"/>
					</a>					
				</div>
				<span>{{ navIconText[3] }}</span>
			</div>
			<div class="nav-icon-item">
				<div class="nav-icon-avator">
					<a v-on:click="comingSoon">
						<img src="../../views/images/nav-icon/money.png"/>						
					</a>			
				</div>
				<span>{{ navIconText[4] }}</span>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		props: ['navIconText'],
		methods: {
			comingSoon: function(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
</style>
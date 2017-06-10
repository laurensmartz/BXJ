<template>
	<div id="login" style="background-color: white; width: 100%; height: 100%; position: fixed;">
		<section class="custom-container">
			<section class="bxj-logo">
				<img src="../../../views/images/logo.png" />
				<p>百信佳通信</p>
			</section>
			<article class="login-form">
				<section class="custom-input">
					<div class="mui-input-row">
						<img src="views/images/person.png"/>						
						<input type="text" v-model="mobile" maxlength="11" placeholder="请输入手机号码"/>	
					</div>
				</section>
				<section class="custom-input">						
					<div class="mui-input-row">
						<img src="views/images/password.png" />
						<input type="password" v-model="pwd" placeholder="请输入您的密码"/>
					</div>
				</section>
				<section class="custom-submit-container">
					<submit-btn :submit-btn-data="submitBtnData" v-on:submit="login(mobile, pwd)"></submit-btn>
				</section>
				<section class="regist-forget">
					<a class="span-blue" href="regist.html"><span>注册账号</span></a>
					<span>忘记密码</span>
				</section>
				<!--<div id="info"></div>-->
			</article>
		</section>
	</div>	
</template>

<script>
	import SubmitBtn from '../submit_btn.vue'
	import AjaxFun from '../../../js/common/ajaxFun.js'
	import Bus from '../../bus.js'
//	import InputCheck from '../../../js/common/inputCheck.js'
	export default {
		data(){
			return {
				submitBtnData: {
					value: '登入',
					btnClass: {'mui-btn-primary': true}
				},
				mobile: '',
				pwd: ''
			}
		},
		methods: {
			login: AjaxFun.login
		},
		components: {
			'submit-btn': SubmitBtn
		},
		beforeCreate() {			
//			console.log(Bus)
//			Bus.$emit('id-selected', 1)
//			console.log('beforeCreate')
		},
		beforeDestroy() {
//			console.log(this.token)
			/*console.log('destory')
			Bus.$emit('id-selected', 111)*/
		}
	}
</script>

<style>
</style>
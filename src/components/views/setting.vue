<template>
	<div id="setting" v-cloak>
		<!--个人信息界面-->
		<section v-if="settingPanel" class="custom-container m-t-44">
			<header-nav :header-nav-data="headerNavData"></header-nav>
			<sub-list :sub-list-data="subListData" v-on:click="itemClick" v-on:change="changeImg(arguments[0])"></sub-list>								
			<!--图片预览层-->
			<div v-cloak v-if="shadow" class="shadow">
				<span></span>
				<img v-bind:src="upLoadAvatarUrl" style="width: 220px; height: 220px;"/>
				<section class="submit-section">
					<a class="mui-btn mui-btn-block mui-btn-primary custom-submit" v-on:click="upLoadAvatar">
						<span>上传</span>
					</a>
					<a class="mui-btn mui-btn-block mui-btn-warning custom-submit" v-on:click="cancleUpload">
						<span>取消</span>
					</a>
				</section>
			</div>
			<!--图片预览层-->
			
			<!--退出按钮-->
			<section class="submit-section p-t-100">
				<submit-btn :submit-btn-data="loginOutBtn" v-on:submit="loginOut"></submit-btn>
			</section>
			<!--退出按钮-->	
		</section>								
		<!--个人信息界面-->
		<!--修改昵称界面-->
		<section v-if="nickPanel" class="custom-container m-t-44 nickPanel">
			<header-nav :header-nav-data="changeNickPanelNav" v-on:click="nickHeaderNavClick"></header-nav>				
			<sub-list :sub-list-data="changeNickData" v-on:click="changeNickName" v-on:blur="updataNick"></sub-list>
		</section>
		<!--修改昵称界面-->
		
		<!--加载gif-->
			<loading v-if="loading"></loading>
		<!--加载gif-->
	</div>
</template>
	
<script>
	import mui from '../../../js/mui.min.js'
	import $ from 'jquery'
	import HeaderNav from '../header_nav.vue'
	import SubList from '../sub_list.vue'
	import SubmitBtn from '../submit_btn.vue'
	import Loading from '../loading.vue'
	import fun from '../../../js/common/fun.js'
	import ajaxFun from '../../../js/common/ajaxFun.js'
	import service from '../../../js/common/service.config.js'
	import api from '../../../js/common/api.config.js'	
	export default {
		data() {
			return {
				settingPanel: true,
				nickPanel: false,
				headerNavData: {
					title: '设置',
					goBack: true
//					clickBack: true
//						href: 'mine.html'
				},
				changeNickPanelNav: {
					title: '修改昵称',
					clickBack: true
				},
				subListData: {
					subList: {
						items: [
							{title: '头像', navigateRight: true, inputFile: true, fileId: 'avatar', rightWidget: {imgSrc: '', imgStyle: "position:absolute; top: 4px; right: 34px; width: 34px; height: 34px"}},
							{title: '账号', rightSpan: '', noActive: true, classObj: {'span-black': true}},
							{title: '昵称', navigateRight: true, rightSpan: 'middleTwo', classObj: {'span-grey': true}},
							{title: '修改密码', navigateRight: true},
							{title: '收货地址', navigateRight: true},
						]
					}
				},
				loginOutBtn: {
					value: '退出登录',
					btnClass: {
						'mui-btn-danger': true
					},
					btnStyle: 'z-index: 0'
				},
				shadow: false,
				//头像预览Url
				upLoadAvatarUrl: '',
				avatarFile: '',
				loading: false,
				changeNickData: {
					subList: {
						items: [{title: '昵称', inputText: false, noActive: true, inputData: '', placeHolder: '', rightSpan: '', classObj: {'span-grey': true}}]
					}
				},
				token_g: ''
			}
		},
		methods: {
			settingHeaderNavClick: function(dataTarget){
				switch(dataTarget){
					case 'clickBack':
						window.location.href = 'mine.html'						
						break
				}
			},
			nickHeaderNavClick: function(dataTarget){
				switch(dataTarget){
					case 'clickBack':
						this.settingPanel = true
						this.nickPanel = false								
						break
				}
			},
			changeImg: function(target){
				var vm = this
				//获取用户选择的图片
				this.avatarFile = target.files[0]
				//创建文件读取对象
				var reader = new FileReader()
				//读取完毕时更新用户头像
				reader.onload = function(){
					//显示遮盖层
					vm.shadow = true
					//设置头像预览
					vm.upLoadAvatarUrl = reader.result					
				}	
				//将用户图片读取为url
				reader.readAsDataURL(this.avatarFile);
			},
			//上传头像
			upLoadAvatar: function(){
				var vm = this
				var img = new Image
				img.src = vm.upLoadAvatarUrl
				//获得裁剪后头像Url
				var avatarUrl = fun.cutImg(img, 120, 120)
				//将头像Url转为blob文件
				var avatarFile = fun.dataURLtoBlob(avatarUrl)
				//上传头像
				ajaxFun.upLoadImg(avatarFile, success, error,
					function(){ajaxFun.callBack.complete(vm)}, beforeSend)
				//成功
				function success(data){
//					var vm = this
					//隐藏加载动画
					vm.loading = false
					//上传成功
					if(data.resultCode == 1){
						//修改头像url的接口
						var url = service.config.url + api.config.modifyMineInfo
						//原数据
						var originData = {
							//新头像的url
							avatar_url: data.data[0]['url'],
						}
						//序列化和sign加密
						var dataSet = ajaxFun.dataStringify(originData)
						//请求数据
						var requestData = {
							encryptionType: 1,
							token: vm.token_g,
							sign: dataSet.sign,
							data: dataSet.jsonData
						}
						//发送请求
						ajaxFun.common(url, 'POST', requestData, 'json', success, error,
						function(){ajaxFun.callBack.complete(vm)},
						function(){ajaxFun.callBack.beforeSend(vm)})
						//成功
						function success(data){
							if(data.code == 1){
								mui.alert('上传成功', '提示', function(){
									//隐藏遮罩层
									vm.shadow = false
									//更新头像
									vm.subListData.subList.items[0].rightWidget.imgSrc = avatarUrl
								})	
							} else {
								console.log(data.code)
								console.log(data.msg)
							}
						}
						//失败
						function error(){
							message.connError()
						}																							
					} else {
						mui.alert('上传失败')
					}
				}
				//失败
				function error(){
					//隐藏加载动画
					vm.loading = false
					//错误提示
					message.connError()
				}
				//先行
				function beforeSend(){
					//显示加载
					vm.loading = true
				}
			},
			cancleUpload: function(){
				this.shadow = false
				var inputFile = document.getElementById('avatar')
				inputFile.value = ''
			},
			itemClick: function(arg1){
				switch(arg1){
					case '修改密码':
						window.location.href = 'modify_pwd.html'
						break
					case '昵称':
						this.showNickPanel()
						break
					case '收货地址':
						window.location.href = 'address.html'
						break
					default:								
				}
			},
			showNickPanel: function(){
				//显示修改昵称界面
				this.settingPanel = false
				this.nickPanel = true
				this.changeNickData.subList.items[0].rightSpan = this.subListData.subList.items[2].rightSpan						
			},
			changeNickName: function(){
				this.changeNickData.subList.items[0].rightSpan = false
				this.changeNickData.subList.items[0].inputText = true
				this.changeNickData.subList.items[0].inputData = this.subListData.subList.items[2].rightSpan
//						this.changeNickData.subList.items[0].placeHolder = '请输入新昵称'
				//DOM更新了
				this.$nextTick(function(){
					//昵称输入框获取焦点
					$('.nickPanel input').focus()
				})					
			},
			updataNick: function(){
				var vm = this
				var url = service.config.url + api.config.modifyMineInfo
				var nickName = this.changeNickData.subList.items[0].inputData
				
				if(nickName == this.subListData.subList.items[2].rightSpan){
					mui.toast('昵称未改变')
					setTimeout(function(){
						vm.changeNickData.subList.items[0].inputText = false								
						vm.settingPanel = true
						vm.nickPanel = false
					}, 1000)
					return
				}
				//如果昵称是为空
				if(!nickName.length){
					mui.alert('昵称不能为空!')
					$('.nickPanel input').focus()
					return
				}
				//如果昵称超过十个字符
				if(nickName.length > 10){
					mui.alert('昵称不能超过10个字')
					$('.nickPanel input').focus()
					return
				}
				var originData = {
					nick_name: nickName
				}
				var requestData = ajaxFun.requestData(originData, 1, vm.token_g)
				//发起请求
				ajaxFun.common(url, 'POST', requestData, 'json', success, error,
					function(){ajaxFun.callBack.complete(vm)},
					function(){ajaxFun.callBack.beforeSend(vm)})
				function success(data){
					if(data.code ==1 ){
						mui.toast('修改成功')
						vm.subListData.subList.items[2].rightSpan = nickName 								
						setTimeout(function(){
							vm.changeNickData.subList.items[0].inputText = false
							vm.settingPanel = true
							vm.nickPanel = false
						}, 1000)
					} else {
						mui.alert('修改失败')
					}
				}
				function error(){
					message.connError()
				}
			},
			loginOut: function(){
				mui.confirm('确定退出吗', '提示', ['留下', '离开'], function(e){
					if(e.index == 1){
//								fun.loginOut()
						fun.delCookie('token')
						window.location.href = '#/login'
					}							
				})						
			},
		},
		created() {
			this.token_g = fun.existToken()
			var vm = this
			
			ajaxFun.getUserInfo(this.token_g, success, error, ajaxFun.callBack.complete, ajaxFun.callBack.beforeSend)
			function success(data){
				//账号
				vm.subListData.subList.items[1].rightSpan = data.data.mobile
				//昵称
				vm.subListData.subList.items[2].rightSpan = data.data.nick_name
				//头像
				vm.subListData.subList.items[0].rightWidget.imgSrc = data.data.avatar_url
				//显示设置面板
				vm.settingPanel = true
			}
			function error(){
				mui.alert('连接超时')
			}
		},
		mounted() {
			
		},
		components: {
			'header-nav': HeaderNav,
			'sub-list': SubList,
			'submit-btn': SubmitBtn,
			'loading': Loading
		}
	}
</script>

<style>
</style>
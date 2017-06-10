import Bus from '../../src/bus.js'
import inputCheck from './inputCheck.js'
import jQuery from 'jquery'
import Vue from '../../vue/vue.js'
import service from './service.config.js'
import api from './api.config.js'
import mui from '../mui.min.js'
import hex_md5 from './md5.js'
	
var ajaxFun = {
	//发送ajax请求
	common: function(url, type, data, dataType, success, error, complete, beforeSend, contentType, processData){
		if(!error){
			//设置默认error
			var error = function(){
				message.connError()
			}
		}
		if(!beforeSend){
			//默认beforeSend
			var beforeSend = function(){
				if(vm.loadingData){
					vm.loadingData.loading = true
				} else {
//					console.log('no')
				}
			}
		}
		if(!complete){
			var complete = function(){
				if(vm.loadingData){
					vm.loadingData.loading = false
				}
			}
		}
		
		jQuery.ajax({
			url: url,
			type: type,
			data: data,
			dataType: dataType,
			beforeSend: beforeSend,
			success: success,
			error: error,
			complete: complete,
			contentType: contentType,
			processData: processData
		})
	},
	//发送ajax请求（可设置是否异步）
	commonNew: function(async, url, type, data, dataType, success, error, complete, beforeSend, contentType, processData){
		if(!error){
			//设置默认error
			var error = function(){
				message.connError()
			}
		}
		if(!beforeSend){
			//默认beforeSend
			var beforeSend = function(){
				if(vm.loadingData){
					vm.loadingData.loading = true
				} else {
//					console.log('no')
				}
			}
		}
		if(!complete){
			var complete = function(){
				if(vm.loadingData){
					vm.loadingData.loading = false
				}
			}
		}
		jQuery.ajax({
			async: async,
			url: url,
			type: type,
			data: data,
			dataType: dataType,
			beforeSend: beforeSend,
			success: success,
			error: error,
			complete: complete,
			contentType: contentType,
			processData: processData
		})
	},
	//获取用户信息
	getUserInfo: function(token_g, success, error, complete, beforeSend){
		//请求url
		var url = service.config.url + api.config.mineInfo
		//原数据
		var originData = {}
		//序列化和sign加密
		var dataSet = ajaxFun.dataStringify(originData)
		//请求数据
		var requestData = {
			encryptionType: 1,
			token: token_g,
			sign: dataSet.sign,
			data: dataSet.jsonData
		}	
		//发起请求
		ajaxFun.common(url, 'POST', requestData, 'json', success, error, complete, beforeSend)
	},
	//用户登入
	login: function(mobile, pwd){
				//检测手机号是否正确
				if(inputCheck.checkMobile(mobile)){
					//请求数据
					var data = {
						account: mobile,
						password: pwd
					}
					//请求数据序列化
					var jsonData = JSON.stringify(data)
					//发起ajax登入请求
					jQuery.ajax({
						url: service.config.url + api.config.login,
						type: 'POST',
						data: {
							encryptionType: 0,
							data: jsonData						
						},
						dataType: 'json',
						beforeSend: ajaxFun.callBack.beforeSend,
						success: function(data){
							if(data.code == 1){
								var exp = new Date()
								//设置cookie过期时间
								exp.setTime(exp.getTime() + 1000000)
								//生成cookie
								document.cookie = 'token=' + data.data.token + ';expires=' + exp.toGMTString()
								//页面跳转
								mui.toast('登录成功！')
								setTimeout(function(){
									window.location.href = '#/'										
								}, 1500)
							} else {
								mui.alert(data.msg)
							}
						},
						error: function(){
							message.connError()
						},
						complete: ajaxFun.callBack.complete
					})
				}
			},
	//ajax请求数据
	requestData: function(data, encryptionType, token){
		var dataSet = this.dataStringify(data)
		var requestData = {
			encryptionType: encryptionType,
			token: token,
			data: dataSet.jsonData,
			sign: dataSet.sign,
		}
		return requestData
	},
	//序列化data对象
	dataStringify: function(data){
		if(data){
			var dataSet = {}
			dataSet.jsonData = JSON.stringify(data)
			try{
				if(hex_md5){
					dataSet.sign = hex_md5(dataSet.jsonData)
					return dataSet
				} else {
					console.log('hex_md5不是一个方法')
					return false
				}
			} catch(e) {
				console.log('请先加载md5文件')
				return false
			}
		} else {
			console.log('序列化参数不能为空')
			return false
		}
	},
	//获得签名
	sign: function(data){
		if(hex_md5){
			return hex_md5(data)
		} else {
			console.log('请先加载md5.js文件')
		}
	},
	//上传图片
	upLoadImg: function(imgFile, success, error, complete, beforeSend){
		if(service && hex_md5){
			//图片上传参数
			var image_password = hex_md5(service.imgHost.account + service.imgHost.url + hex_md5(service.imgHost.pwd))						
			//表单数据对象
			var fd = new FormData()
			//添加表单数据
			fd.append('file', imgFile)
			fd.append('image_account', service.imgHost.account)
			fd.append('image_password', image_password)
			//发起请求
			this.common(service.imgHost.url, 'POST', fd, 'json', success, error, complete, beforeSend, false, false)			
		} else {
			console.log('请先载入service.config.js、md5.js等配置文件')
		}
		
	},
	callBack: {
		error: function(){
			message.connError()				
		},
		complete: function(){
			/*vm.loading = false
			vm.preventTouchMask = false*/
		},
		beforeSend: function(){
			/*vm.loading = true
			vm.preventTouchMask = true*/
		}
	},
	//获取验证码
	obtainValidCode: function(type, mobile, countDownData, async){			
		//判断手机号是否合法
		if(inputCheck.checkMobile(mobile)){
			//发送是否成功flag
			var result = false
			
			var url = service.config.url + api.config.verifyCode

			var	originData = {
				mobile: mobile,
				type: type}
			
			var requestData = this.requestData(originData, 0)
			

			//发起请求
			this.commonNew(async, url, 'POST', requestData, 'json', success)
			
			function success(data){	
				if(data.code == 1){
					result = true
				} else {
					result = false
				}
			}
			//重新获取倒计时
			countDown(countDownData)
			//返回操作结果
			return result
		}						
		//重新获取验证码倒计时
		function countDown(srcEle){
			//倒计时的秒数
			var sec = 60;
			/*//设置禁止获取验证码
			vm.retriveFlag = false	*/
			//设置倒计时循环
			clock = setInterval(doLoop, 1000)
			//每秒更新一次剩余秒数
			function doLoop(){
				sec--;
				if(sec > 0){
					srcEle.message = '验证码已发送至手机，'
					srcEle.countDownText = '重新获取(' + sec + 's)'
				} else {
					//倒计时结束，清除循环变量
					clearInterval(clock)
					//重置获取验证码
					srcEle.countDownText = '点击获取验证码'
					srcEle.message = ''
					//设置允许重新获取验证码
					srcEle.retriveFlag = true	
					//设置样式
					srcEle.messageClass = {
						'span-blue': true
					}
				}
			}
		}
	},
	//检测信息验证step
	checkCertificateStep: function(step){
		var url = service.config.url + api.config.certificationInfo
			
		var originData = {}
		
		var requestData = ajaxFun.requestData(originData, 1, token_g)

		ajaxFun.commonNew(false, url, 'POST', requestData, 'json', success, error, complete, beforeSend)

		function success(data){
			if(data.code == 1){
				if(data.data.step != step - 1){
					window.location.href = 'submit_info.html'
				}		
			} else {

			}
		}		
		function error(){}
		function complete(){}
		function beforeSend(){}
	},
	compressImg: function(dataUrl, success){
		//判断图片是否超过3M
		if(dataUrl.length / 1024 / 1024 > 3){
			var cas = document.createElement('canvas'),
			ctx = cas.getContext('2d'),
			img = new Image
		
			img.src = dataUrl
			
			cas.width = img.width
			cas.height = img.height
			
			img.onload = function(){
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, cas.width, cas.height)
				var compressDataUrl = cas.toDataURL('image/jpeg', 0.4)
				
				//判断压缩后的图片是否超过2M
				if(compressDataUrl / 1024 / 1024 > 3){
					mui.alert('请不要上传超过3M的图片')
					return
				}
				
				console.log(compressDataUrl.length / 1024 + 'K')
				//上传压缩后的图片						
				ajaxFun.upLoadImg(fun.dataURLtoBlob(compressDataUrl), success, ajaxFun.callBack.error, 
					ajaxFun.callBack.complete, ajaxFun.callBack.beforeSend)
			}
		} else {
			console.log(dataUrl.length / 1024 + 'K')			
			//上传未压缩的图片
			ajaxFun.upLoadImg(fun.dataURLtoBlob(dataUrl), success, ajaxFun.callBack.error, 
				ajaxFun.callBack.complete, ajaxFun.callBack.beforeSend)
		}
	}
}
export default ajaxFun
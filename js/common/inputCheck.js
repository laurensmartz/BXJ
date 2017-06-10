//手机号检测
//var mui = require('../mui.min.js')
/*window.inputCheck = {
	checkMobile: function(mobile){
		//判断手机号是否合法
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile.trim()))){
			//弹出非法提示
			if(mui){
				mui.init({
					swipeBack: true
				});
				var info = document.getElementById('info');
				mui.alert('请输入正确的手机号码')
			}
			return false
		} else {
			return true
		}
	},
	checkPwdEqual: function(pwd, cfpwd){
		//判断两次密码是否一致
		if(pwd === cfpwd){
			return true
		} else {
			//弹出非法提示框
			if(mui){
				mui.init({
					swipeBack: true
				});
				var info = document.getElementById('info');
				mui.alert('两次输入密码不一致')
			}
			return false
		}
	}	
}*/
/*exports.checkMobile = function(mobile){
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile.trim()))){
			//弹出非法提示
			if(mui){
				mui.init({
					swipeBack: true
				});
				var info = document.getElementById('info');
				mui.alert('请输入正确的手机号码')
			}
			return false
		} else {
			return true
		}
	} */
/*module.exports = {
	checkMobile: function(mobile){
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile.trim()))){
			//弹出非法提示
			if(mui){
				mui.init({
					swipeBack: true
				});
				var info = document.getElementById('info');
				mui.alert('请输入正确的手机号码')
			}
			return false
		} else {
			return true
		}
	}
}*/
var mui = require('../mui.min.js')
var inputCheck = {
	checkMobile: function checkMobile(mobile){
		//判断手机号是否合法
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile.trim()))){
			//弹出非法提示
			if(mui){
				mui.init({
					swipeBack: true
				});
	//			var info = document.getElementById('info');
				mui.alert('请输入正确的手机号码')
			}
			return false
		} else {
			return true
		}
	}
}
module.exports = inputCheck
/*//密码检查
function checkPwdEqual(pwd, cfpwd){
	//判断两次密码是否一致
	if(pwd === cfpwd){
		return true
	} else {
		//弹出非法提示框
		if(mui){
			mui.init({
				swipeBack: true
			});
			var info = document.getElementById('info');
			mui.alert('两次输入密码不一致')
		}
		return false
	}
}
//
function myAjax(url){
	
}*/

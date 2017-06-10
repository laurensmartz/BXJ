var fun = {
	//退出登入
	loginOut: function(){
		localStorage.removeItem('token')
	},
	//判断是否已经登入
	isLogined: function(){
		if(!localStorage.getItem('token')){
			window.location.href = 'login.html'
		} else {
			return localStorage.getItem('token')
		}
	},
	//dataUrl转blob
	dataURLtoBlob: function(dataurl){
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n)
		}
		return new Blob([u8arr], {type: mime})
	},
	//图片裁切
	cutImg: function(imgEle, dWidth, dHeight){
		var orit
		//获取照片旋转角度
		EXIF.getData(imgEle, function(){
			orit = EXIF.getTag(this, 'Orientation')
		});
		
		if(orit == 6){
			var casTemp = document.createElement('canvas'),
				tempWidth,
				tempHeight
		
			if(dWidth != dHeight){
				if(dWidth > dHeight){
					tempWidth = dWidth
					tempHeight = dWidth
				} else {
					tempHeight = dHeight
					tempHeight = dHeight
				}
				
				casTemp.width = tempWidth
				casTemp.height = tempHeight
			} else {
				casTemp.width = dWidth
				casTemp.height = dHeight
			}
					
			ctxTemp = casTemp.getContext('2d')
			
			ctxTemp.translate(casTemp.width, 0)
			ctxTemp.rotate(90 * Math.PI / 180)	

			ctxTemp.drawImage(imgEle, 0, 0, imgEle.width, imgEle.height, 0, 0, casTemp.width, casTemp.height)
			
			var cas = document.createElement('canvas')
				
				cas.width = dWidth || 50
				cas.height = dHeight || 50
				
				var ctx = cas.getContext('2d')
				
				ctx.drawImage(casTemp, 0, 0, casTemp.width, casTemp.height, 0, 0, cas.width, cas.height)
				
				console.log(cas.toDataURL())
				
				return cas.toDataURL()	
		} else {
			var cas = document.createElement('canvas')
				
			cas.width = dWidth || 50
			cas.height = dHeight || 50
			
			var ctx = cas.getContext('2d')
			
			ctx.drawImage(imgEle, 0, 0, imgEle.width, imgEle.height, 0, 0, cas.width, cas.height)
			return cas.toDataURL()
		}		
		
		
	},
	//清除input file
	clearInputFile: function(inputFile){
		inputFile.value = ''
	},
	//上传图片发生改变
	changeImg: function(target, vm, callBack){
		//将事件元素保存为vue数据
		this.srcEle = target
		//获取图片文件
		var imgFile = target.files[0]
		//判断文件是否存在
		if(!imgFile){
			//文件不存在退出
			return
		}
		//读取图片
		var reader = new FileReader()
		reader.readAsDataURL(imgFile)
		reader.onload = callBack
	},
	//获取地址url的参数值
	getQueryString: function(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  decodeURI(r[2]); return null;
	},
	//判断输入框信息是否完整
	checkInputList: function(){
		for (var i = 0; i < arguments.length; i++) {
			for (var j = 0; j < arguments[i].length; j++) {
				if(!arguments[i][j].inputData){					
					return 0
				}
			}
		}
		return 1
	},
	getCookie: function(name){
		var arr,
			reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			
		if(arr = document.cookie.match(reg)){
			return unescape(arr[2]);				
		} else {
			return null;				
		}
	},
	delCookie: function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		//获取cookie的值
		var cval = this.getCookie(name);
		//设置cookie已过期
		if(cval!=null){
			document.cookie= name + "=" + cval + ";expires=" + exp.toGMTString();		
		}
	},
	existToken: function(){
		var token = this.getCookie('token')
		if(token){
			return token
		} else {
			return null
		}		
	}
}
module.exports = fun
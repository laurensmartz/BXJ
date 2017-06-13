var api = {
	config: {
		bankInfo: '?act=Api/Bank/requestBankInfo',
		//小百快报详情
		articleInfo: '?act=Api/Homepage/requestArticleInfo',
		//系统配置
		systemConfig: '?act=Api/System/config',
		//消息列表
		messageList: '?act=Api/Message/requestMessageList',
		//小百快报列表
		articleList:'?act=Api/Homepage/requestArticleList',
		//识别银行卡
		discernBankCard: '?act=Api/MemberCertification/discernBankCard',
		//识别身份证
		discernIdCard: '?act=Api/MemberCertification/discernIdCard',
		//订单列表
		orderList: '?act=Api/Order/requestOrderList',
		//订单详情
		requestOrderInfo: '?act=Api/Order/requestOrderInfo',
		//账单列表
		billList: '?act=Api/Bill/requestBillList',
		//添加产品信息（话费宝）
		addProductInfo: '?act=Api/Goods/requestAddProductInfo',
		//生成订单（话费宝）
		placeOrder: '?act=Api/Order/requestPlaceOrder',
		//话费宝套餐列表
		telChargeList: '?act=Api/Goods/requestTelChargeList',
		//获取地区id
		regionId: '?act=Api/Address/requestRegionId',
		//地区数据
		regionData: '?act=Api/Address/requestRegionData',
		//热门分期
		hotStage: '?act=Api/Homepage/requestHotStage',
		//广告
		ad: '?act=Api/Ad/requestAd',
		//开户银行数据
		bankData: '?act=Api/Bank/requestBankData',
		//实名认证状态查询
		certificationInfo: '?act=Api/MemberCertification/requestCertificationInfo',
		//实名认证
		certification: '?act=Api/MemberCertification/requestCertification',
		//修改地址
		updateAddr: '?act=Api/Address/requestUpdateAddress',
		//删除地址
		delAddress: '?act=Api/Address/requestDelAddress',
		//添加收货地址
		addAddress: '?act=Api/Address/requestAddAddress',
		//收货地址列表
		addressList: '?act=Api/Address/requestAddressList',
		//设置默认收货地址
		defaultAddr: '?act=Api/Address/requestSetDefaultAddress',
		//获取个人信息
		mineInfo: '?act=Api/Member/requestMemberInfo',
		//修改个人信息
		modifyMineInfo: '?act=Api/Member/requestUpdateMemberInfo',
		//登入
		login: '?act=Api/Login/requestLogin',
		//修改密码
		modifyPwd: '?act=Api/Member/requestUpdatePassword',
		//忘记密码
		forgottenPwd: '?act=Api/Member/requestForgottenPassword',
		//获取验证码
		verifyCode: '?act=Api/VerifyCode/requestVerifyCode'
	}
}
module.exports = api
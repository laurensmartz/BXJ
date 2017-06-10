var api = {
	config: {
		//银行数据
		bankData: '?act=Api/Bank/requestBankData',
		//实名认证状态查询
		certificationInfo: '?act=Api/MemberCertification/requestCertificationInfo',
		//实名认证
		certification: '?act=Api/MemberCertification/requestCertification',
		//修改地址
		updateAddr: '?act=Api/Address/requestUpdateAddress',
		//删除地址
		delAddress: '?act=Api/Address/requestDelAddress',
		//添加地址
		addAddress: '?act=Api/Address/requestAddAddress',
		//地址列表
		addressList: '?act=Api/Address/requestAddressList',
		//设置默认地址
		defaultAddr: '?act=Api/Address/requestSetDefaultAddress',
		//获取个人信息
		mineInfo: '?act=Api/Member/requestMemberInfo',
		//修改个人信息
		modifyMineInfo: '?act=Api/Member/requestUpdateMemberInfo',
		//登入
		login: '?act=Api/Login/requestLogin',
		//修改密码
		modifyPwd: '?act=Api/Member/requestUpdatePassword'
	}
}
module.exports = api
// 页面的全局变量
var baseURL_natapp = "http://gmcc.oxoxo.xyz";
	//  baseURL_natapp : "http://192.168.1.84";
var gobalData = {
	busID: 2,
	busName: "聊城公交一卡通",
	rechargeNo: "1300",
	terminalNo: "0102",
	opNo: "00000001",
	cityCode: "0602",

	
	//获取价格列表接口
	url_getPriceList: baseURL_natapp + "/paysys/getPriceList",
	//支付代理平台
	url_checkCard: baseURL_natapp + "/paysys/ticket",
	//请求授权，获取openID
	url_auth: baseURL_natapp + "/pay/auth/submit",
	//请求下单
	url_paysulst: baseURL_natapp + "/paysys/mpOrder",
	//请求支付
	url_pay: baseURL_natapp + "/pay/mpPay/",
	//订单状态
	url_order_status: baseURL_natapp + "/paysys/orderStatus",

	//用户登陆
	url_accontLogin: "/user/user/loginaccount",
	//用户注册
	url_regist: baseURL_natapp + "/user/user/registeraccount",
	//绑卡
	url_tiedCard: baseURL_natapp + "/user/card/bind",
	//获取绑卡列表接口
	url_cardList: baseURL_natapp + "/user/card/list",
	//设置默认卡接口
	url_defaultCard: baseURL_natapp + "/user/card/setdefault",
	//解除绑卡接口
	url_deleteCard: baseURL_natapp + "/user/card/unbind",

	//支付回调路径
	//  url_payback : baseURL_natapp + "/mpbuy/pages/result.html",
	url_payback: baseURL_natapp + "/pages/result.html",

	//获取快充券的接口
	url_use: baseURL_natapp + "/paysys/tickets",

	//网点
	url_map: baseURL_natapp + "/paysys/device/places?pageNo:",

	//位置信息
	url_plat: 'http://192.168.1.90:8094/pages/plat.html?sites:'

}

export {gobalData};
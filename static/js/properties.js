// 页面的全局变量
var URL_natapp = "http://sg.oxoxo.xyz",
// var URL_natapp = "http://192.168.11.80:8999",

	baseURL_natapp = "http://sg.oxoxo.xyz";
var gobalData = {
	busID: 2,
	busName: "聊城公交一卡通",
	terminalNo: "0102",
	openId: "",
	cityCode: "2521",
	operatorNo: '00005010',
	rechargeNo: 'cz00005',

	//授权微信code
	url_getcode: URL_natapp + "/pay-api/auth/getOpenId",

	//获取当前微信绑定所有卡接口
	url_getCard: URL_natapp + "/platform/getBandCard",
	//获取价格列表接口
	url_getPriceList: URL_natapp + "/platform/getPriceByCityNo",
	//添加绑定卡信息
	url_tiedCard: URL_natapp + "/platform/addBandCard",
	//解除绑卡接口
	url_delCard: URL_natapp + "/platform/updateCardStatus",
	//获取购券记录
	url_getRecord: URL_natapp + "/platform/getQuickInfoByOpenId",
	//检测卡片是否合法
	url_verifyCard: URL_natapp + "/agent/checkic",

	jsapi_place_order: baseURL_natapp + '/pay/kk/weixin/h5pay/do'
}

export {
	gobalData
};

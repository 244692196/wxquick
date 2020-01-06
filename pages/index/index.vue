<template>
	<view class="main" id="buy_form">
		<view>
			<table width="98%" height="80px" border="0" align="center" cellpadding="10" cellspacing="0">
				<tr>
					<td width="80%" align="left" valign="middle" class="buy-bar">
						<span :style="{opacity:(nickname?'1':'0')}" class="nickname">{{nickname}}</span>
						<input id=" cardNoL" class="input__field--minoru" name="cardId" type="text" v-model=" cardFaceNo"
						 placeholder="请输入卡号" />
					</td>
					<!--请参考支付宝充值中心的样式 !-->
					<td width="20%" align="left">
						<navigator url="/pages/basics/IndexList">
							<img src="../../static/img/card_number2.png" />
						</navigator>
					</td>
				</tr>
			</table>
			<h3>
				<p class="buy">购买金额</p>
			</h3>
			<table width="100%" border="0" cellspacing="0" cellpadding="2">
				<tr>
					<td height="10"></td>
					<td height="10"></td>
					<td height="10"></td>
				</tr>
			</table>
			<view id="priceList">
				<span v-for="(priceData,index) in priceDatas" :key="index" style="width:33%;display:inline">
					<button class="btn whitebtn btn95 mb20" type="button" style="width:30%;display:inline-block;margin: 5px 1% 5px 2%;"
					 :style="{borderColor:(priceShow?'':'#BDBDBD')}" @click="priceShow&&buyInitInfo(priceData)">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td align="center" valign="middle" class="f20 blue" :style="{color:(priceShow?'':'#BDBDBD')}">{{priceData.payPrice/100}}元</td>
							</tr>
							<tr>
								<td align="center" valign="middle" class="f12 blue2" :style="{color:(priceShow?'':'#BDBDBD')}">售价:{{priceData.price/100}}元</td>
							</tr>
						</table>
					</button>
				</span>
			</view>
			<view class="cu-load load-modal" v-if="isShow">
				<image style="width:18%" src="../../static/img/load.png" mode="aspectFit"></image>
				<view class="gray-text">{{isShow}}</view>
			</view>
			<!-- 失败弹窗 -->
			<view class="cu-modal" :class="fallCon?'show':''" @tap="hideModal">
				<view class="cu-dialog">
					<view class="bg-img">
						<image class="emoji" src="../../static/img/cardFall.png"></image>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">
							{{fallCon}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<tab-bar :PageCur="components"></tab-bar>
	</view>
</template>

<script>
	import {
		gobalData
	} from "../../static/js/properties.js";
	export default {
		name: "buy",
		data() {
			return {
				components: "components",
				payedPage: gobalData.url_payback,
				priceDatas: [],
				cardFaceNo: "",
				nickname: "", //昵称
				priceShow: 0, //判断金额是否显示
				isShow: 0, //显示加载请等待
				cardNo: "", //卡序列号
				fallCon: "" //失败原因
			};
		},
		onLoad() {
			gobalData.openId = uni.getStorageSync("wxopenid")
			if (!gobalData.openId) {
				uni.redirectTo({
					url: '/pages/Impower'
				})
			}
			this.getPrice();
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/basics/Record'
			});
		},
		onShow() {
			//拿到浏览器本地数据
			sessionStorage.getItem("cardCsn") && (this.cardFaceNo = sessionStorage.getItem("cardCsn"))
		},
		watch: {
			cardFaceNo() { //判断是否可以付款
				const reg = /^\d{8,19}$/;
				if (reg.test(this.cardFaceNo)) {
					this.priceShow = 1
				} else {
					this.priceShow = 0
				}
				if (sessionStorage.getItem("nickname") && this.cardFaceNo == sessionStorage.getItem("cardCsn")) {
					this.nickname = "昵称:" + sessionStorage.getItem("nickname")
				} else {
					this.nickname = ""
				}
			}

		},
		methods: {
			//获取价格列表
			getPrice() {
				this.isShow = '加载中...'
				this.$api.post({
					url: gobalData.url_getPriceList,
					data: {
						cityNo: gobalData.cityCode
					}
				}).then((res) => {
					this.isShow = 0
					if (res.data.resultCode == "1") {
						this.priceDatas = res.data.data
					} else {
						this.fallCon = res.data.message
					}
				}).catch((err) => {
					this.isShow = 0
					this.fallCon = err.errMsg
				})
			},
			//下单.
			mpOrder(price) {
				this.isShow = '正在生成订单'
				this.$api.post({
					url: gobalData.jsapi_place_order,
					data: {
						openId: gobalData.openId,
						tradePayNo: new Date().getTime(),
						payAmount: price,
						payTypeCode: 'WECHAT_PAY',
						terminalNo: gobalData.terminalNo,
						operatorNo: gobalData.operatorNo,
						cardCsn: this.cardFaceNo,
						cardNo: this.cardNo,
						cardFaceNo: this.cardFaceNo,
						rechargeNo: gobalData.rechargeNo,
						cityNo: gobalData.cityCode,
						subject: '聊城公交公司',
						detail: 'IC卡充值',
						extra: 'test'
					}
				}).then((res) => {
					this.isShow = 0
					if (res.data.code === 0) {
						onBridgeReady(res);
					} else {
						this.fallCon = res.data.msg
					}
				}).catch((err) => {
					this.isShow = 0
					console.log(err)
					this.fallCon = err.errMsg
				})
				// this.mpPay();

			},
			// 支付.
			mpPay: function(payId, orderId) {
				uni.navigateTo({
					url: '/pages/basics/Result'
				});
			},
			//提交订单
			buyInitInfo(priceData) {
				console.info("待校验的卡号：" + this.cardFaceNo)
				//提交订单
				this.isShow = "校验卡号"
				this.$api.post({
					url: gobalData.url_verifyCard,
					data: {
						cardFaceNo: this.cardFaceNo
					},
					header: {
						'ContentType': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					console.log(res.data)
					this.isShow = 0
					if (res.data.retCode == "1") {
						this.cardNo = res.data.outputBo.cardSeqNo //获取卡序列号
						this.mpOrder(priceData.payPrice);
					} else {
						this.fallCon = res.data.retMsg
					}
				}).catch((err) => {
					this.isShow = 0
					this.fallCon = err.errMsg
				})

			},
			hideModal() {
				this.fallCon = ""
			}
		}
	};

	function onBridgeReady(res) {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				"appId": res.data.param.appId, //公众号名称，由商户传入     
				"timeStamp": res.data.param.timeStamp, //时间戳，自1970年以来的秒数     
				"nonceStr": res.data.param.nonceStr, //随机串     
				"package": res.data.param.package,
				"signType": res.data.param.signType, //微信签名方式：     
				"paySign": res.data.param.paySign //微信签名 
			},
			function(res) {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					this.mpPay();
					that.mes = 'OK'
				}

				if (res.err_msg == "get_brand_wcpay_request:cancel") {
					that.mes = 'cancel';
					this.mpPay;
				}

				if (res.err_msg == "get_brand_wcpay_request:fail") {
					that.mes = 'fail'
				}
			});
	}
</script>

<style>
	.main {
		width: 100%;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}

	.main * {
		transition: .5s;
	}

	.nickname {
		position: absolute;
		top: 6upx;
		left: 25upx;
		color: #8D8D8D;
		margin: 0 25upx;
		font-size: 30upx;
		z-index: 10;
	}

	.bg-img {
		padding: 40upx 0;
	}

	.emoji {
		width: 70upx;
		height: 70upx;
	}
</style>

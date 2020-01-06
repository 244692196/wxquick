<template>
	<view>
		<view class="card">
			<view class="cardTitle">
				绑卡
			</view>
			<form class="card_info">
				<view class="cu-form-group">
					<text class="lg text-gray cuIcon-card" style="color: #1774CA"></text>
					<view class="title" style="vertical-align: middle;">卡号</view>
					<input placeholder="请输入卡号" name="input" v-model=" cardFaceNo"></input>
				</view>
				<view class="cu-form-group" style="margin-bottom:70upx ;">
					<text class="lg text-gray cuIcon-friendadd" style="color: #1774CA"></text>
					<view class="title" style="vertical-align: middle;">昵称</view>
					<input placeholder="请输入昵称" name="input" v-model="cardName"></input>
					<span class="after" :style="{opacity:(cardName.length > 10?'1':'0'),left:(cardName.length > 10?'152upx':'-10upx')}">昵称不能超过10位</span>
				</view>
				<button class="cu-btn block bg-blue margin-tb-sm lg" :style="{background:(cardShow && cardName && cardName.length <= 10?'#0081ff':'#ccc')}"
				 @click="verify">绑卡</button>
			</form>
			<view class="cu-load load-modal" v-if="isShow">
				<image style="width:18%" src="../../static/img/load.png" mode="aspectFit"></image>
				<view class="gray-text">{{isShow}}</view>
			</view>
			<!-- 绑卡失败弹窗 -->
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
		<tab-bar :PageCur="basics"></tab-bar>
	</view>
</template>

<script>
	import {
		gobalData
	} from "../../static/js/properties.js";
	export default {
		name: 'card',
		data() {
			return {
				basics: "basics",
				cardFaceNo: '', //卡号
				cardName: '', //持卡人昵称
				cardShow: 0, //判断显示绑卡
				isShow: "",
				cardSeqNo: "", //卡序列号
				fallCon: "", //失败原因
			}
		},
		onLoad() {
			gobalData.openId = uni.getStorageSync("wxopenid")
			if(!gobalData.openId){
				uni.redirectTo({
					url: '/pages/Impower'
				})
			}
		},
		methods: {
			verify() {
				if (this.cardShow && this.cardName && this.cardName.length <= 10) {
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
						this.isShow = 0
						if (res.data.retCode == "1") {
							this.cardNo = res.data.outputBo.cardSeqNo //获取卡序列号
							console.log(res)
							this.subCard();
						} else {
							this.fallCon = res.data.retMsg
						}
					}).catch((err) => {
						this.isShow = 0
						this.fallCon = err.errMsg
					})
				}
			},
			subCard() { //提交绑卡信息
				this.isShow = "正在绑卡"
				console.info(3)
				this.$api.post({
					url: gobalData.url_tiedCard,
					data: {
						cardFaceNo: this.cardFaceNo,
						cardNo: this.cardNo,
						custName: this.cardName,
						cityNo: gobalData.cityCode,
						openId: gobalData.openId
					}
				}).then((data) => {

					this.isShow = 0
					if (data.data.resultCode == 1) {
						sessionStorage.setItem("code", 1)
						uni.navigateTo({
							url: `/pages/basics/IndexList`
						});
					} else {
						this.fallCon = data.data.message
					}
				}).catch((err) => {
					this.isShow = 0
					this.fallCon = err.errMsg
				})
			},
			hideModal() {
				this.fallCon = ""
			}
		},
		onHide() {
			this.isShow = 0
			this.cardName = ''
			this.cardFaceNo = ''
		},
		watch: {
			cardFaceNo(data) {
				const reg = /^\d{8,19}$/;
				if (reg.test(data)) {
					this.cardShow = 1
				} else {
					this.cardShow = 0
				}
			}
		}
	}
</script>

<style>
	.cardTitle {
		width: 100%;
		height: 120upx;
		font: 60upx/120upx '微软雅黑';
		font-weight: bold;
		text-align: center;
		color: #1774CA;
	}

	.card {
		width: 80%;
		height: 600upx;
		margin: 100upx auto;
	}

	.card_info {
		width: 100%;
		height: 120upx;
		color: #1774CA;
		margin: 30upx;
	}

	.card_info * {
		transition: .5s;
	}

	.card_info .cu-form-group {
		position: relative;
		margin: 25upx 0;
		border: 1upx solid #ccc;
		border-radius: 25upx;
	}

	.lg {
		position: relative;
		top: -1upx;
	}

	.bg-img {
		padding: 40upx 0;
	}

	.emoji {
		width: 70upx;
		height: 70upx;
	}

	.after {
		position: absolute;
		font-size: 22upx;
		color: red;
		top: 100upx;
		left: 152upx;
	}
</style>

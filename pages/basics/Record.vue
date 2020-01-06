<template>
	<view>
		<view class="record" v-for="(item,index) in recordList" :key="index">
			<view class="record_item">
				<view class="left">
					<p>支付流水：{{item.payOrderNo}}</p>
					<p>卡面号：{{item.cardFaceNo}}</p>
					<p>日期：{{item.payTime}}</p>
				</view>
				<view class="right">
					<p>
						<text class="lg text-gray cuIcon-recharge" style="color: #FF7846;font-size: 30upx;"></text>
						{{item.payAmount}}

					</p>
					<p v-if="item.status==2">
						<text class="lg cuIcon-check" style="color:'FF7846'"></text>
						<br>
						支付成功
					</p>
					<p v-if="item.status==6">
						<text class="lg cuIcon-close" style="color:'FF7846'"></text>
						<br>
						支付超时
					</p>
					<p v-if="item.status==9">
						<text class="lg cuIcon-check" style="color:'FF7846'"></text>
						<br>
						购券成功
					</p>
				</view>
			</view>

		</view>
		<view class="cu-load load-modal" v-if="isShow">
			<image style="width:18%" src="../../static/img/load.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
		<!-- 上拉加载显示 -->
		<view v-if="loadShow" class="cu-load load " :class="!isLoad?'loading':'over'"></view>
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
</template>

<script>
	import {
		gobalData
	} from "../../static/js/properties.js"
	export default {
		data() {
			return {
				pageSize: 5, //显示个数
				recordList: [
					// 	{
					// 	payOrderNo: "234234234",
					// 	 cardFaceNo: "654561321",
					// 	payTime: "10:12",
					// 	payAmount: "1",
					// 	status: "2"
					// }, {
					// 	payOrderNo: "234234234",
					// 	 cardFaceNo: "3246854651",
					// 	payTime: "10:12",
					// 	payAmount: "1",
					// 	status: "6"
					// },
				],
				isShow: 0,
				loadShow: 0,
				isLoad: 0,
				fallCon: "" //失败原因
			};
		},
		onLoad() {
			gobalData.openId = uni.getStorageSync("wxopenid")
			if(!gobalData.openId){
				uni.redirectTo({
					url: '/pages/Impower'
				})
			}
			this.recordFn()
		},
		onReachBottom() {          //触底触发
			this.pageSize += 5
			if (this.isLoad == 1) return
			this.recordFn()
		},
		methods: {
			recordFn() {
				if (this.pageSize <= 5) {
					this.isShow = 1
				} else {
					this.loadShow = 1
				}
				this.$api.post({
					url: gobalData.url_getRecord,
					data: {
						openId: gobalData.openId,
						// openId: "oAtJj0pHnQIrJDsbIN0alX5W_AuI",
						page: "1",
						pageSize: this.pageSize
					}
				}).then((data) => {
					this.isShow = 0
					console.log(data.data)
					if (data.data.resultCode == "1") {
						this.recordList = data.data.data.records
						if (data.data.data.pages == 1) {
							this.isLoad = 1
						}
					} else {
						console.log(/open/.test(data.data.message))
						if (/^open/.test(data.data.message)) {
							this.fallCon = data.data.message
						} 
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
</script>

<style>
	.record {
		width: 90%;
		height: 250upx;
		padding: 20upx;
		border-radius: 30upx;
		border: 1upx solid #f2f2f2;
		box-shadow: 2px 2px 10upx #ccc;
		flex: 1;
		margin: 20upx auto 40upx;
	}

	.record_item {
		display: flex;
		width: 100%;
		height: 100%;

	}

	.left {
		position: relative;
		width: 80%;
		padding: 15upx 30upx;
		background-color: #FFF6F1;
		border-radius: 35upx;
	}

	.left:after {
		content: "";
		position: absolute;
		top: 50%;
		margin-top: -70upx;
		right: 0;
		width: 0;
		height: 140upx;
		border-left: 1px dashed #FF7846;
	}

	.left p {
		color: #666;
		font-size: 30upx;
		line-height: 45upx;
	}

	.bg-img {
		padding: 40upx 0;
	}

	.emoji {
		width: 70upx;
		height: 70upx;
	}


	.right {
		width: 20%;
		padding: 30upx 5upx 0;
		background-color: #FFF6F1;
		border-radius: 35upx;
		line-height: 45upx;
		color: #FF7846;
	}

	.right p {
		font-weight: bold;
	}

	.right p:nth-child(1) {
		font-size: 43upx;
		margin-bottom: 25upx;
		text-align: center;
	}

	.right p:nth-child(2) {
		padding: 0 2upx;
		border-radius: 50upx;
		text-align: center;
		font-size: 24upx;
		line-height: 35upx;
	}

	.page {
		margin: auto;
		padding: 0 150upx;
	}

	.load {
		background-color: rgba(255, 255, 255, 0);
		color: #FF7846;
		font-size: 30upx;
	}
</style>

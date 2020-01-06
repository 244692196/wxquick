<template>
	<view>
		<view class="cu-bar bg-white search fixed">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" v-model="searchCon" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @click="selectList">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes">
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.letter" :id="'indexes-' + item.letter" :data-index="item.letter">
					<!-- <view class="padding">{{item.letter}}</view> -->
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" style="border-bottom:1px solid rgb(244,244,244) ;">
							<view class="cu-avatar lg">
								<text class="lg text-gray cuIcon-card" style="color: #1774CA;"></text>
							</view>
							<view class="content" @click="toBuy(item)">
								<view class="text-grey">
									{{item.cardFaceNo}}
								</view>
								<view class="text-gray text-sm">
									昵称：{{item.custName}}
								</view>
							</view>
							<view class="delCard" @click="showModal(item)">
								<text class="lg text-gray cuIcon-delete"></text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<!-- 上拉加载显示 -->
		<view v-if="loadShow" class="cu-load load " :class="!isLoad?'loading':'over'"></view>

		<view class="cu-load load-modal" v-if="isShow">
			<image style="width:18%" src="../../static/img/load.png" mode="aspectFit"></image>
			<view class="gray-text">{{isShow}}</view>
		</view>
		<!--绑卡成功弹窗-->
		<view class="cu-modal" :class="removeFall||code?'show':''" @tap="hideSuccess">
			<view class="cu-dialog">
				<view class="bg-img">
					<image class="emoji" src="../../static/img/cardSuccess.png">
					</image>
				</view>
				<view class="cu-bar bg-white">
					<view v-if="code" class="action margin-0 flex-sub  solid-left" @tap="hideSuccess">绑卡成功</view>
					<view v-if="removeFall" class="action margin-0 flex-sub  solid-left" @tap="hideSuccess">解绑成功</view>
				</view>
			</view>
		</view>
		<!-- 解绑弹窗 -->
		<view class="cu-modal bottom-modal" :class="modalShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="removeCard">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="padding-xl">
					您确定要删除<span style="color: red;">昵称:{{delCard.custName}}</span>的卡吗？
				</view>
			</view>
		</view>
		<!-- 失败弹窗 -->
		<view class="cu-modal" :class="fallCon?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="bg-img">
					<image class="emoji" src="../../static/img/cardFall.png">
					</image>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">{{fallCon}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pinyin,
		letterSort
	} from '../../static/js/globalmeans.js'
	import {
		gobalData
	} from "../../static/js/properties.js";
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				cardList: [
					// {
					// 	cardFaceNo: "10006601",
					// 	custName: "大爷"
					// },
					// {
					// 	cardFaceNo: "12312312",
					// 	custName: '爸爸'
					// },
					// {
					// 	cardFaceNo: "54656435",
					// 	custName: "妈妈"
					// },
					// {
					// 	cardFaceNo: "213123123",
					// 	custName: '女儿'
					// },
				],
				listCur: '',
				imgSrc: "../../static/img/cardSuccess.png", //彈窗显示的图片
				modalShow: 0, //显示
				searchCon: '', //搜索的内容
				letter: "", //右边字母
				delCard: "", //要解绑的卡信息
				code: 0, //显示绑定成功弹窗
				fallCon: "", //解绑失败内容
				isShow: 0, //显示加载请等待
				removeFall: 0, //解除绑定成功显示弹窗
				pageSize: 10, //显示
				loadShow: 0, //上拉加载显示
				isLoad: 0, //上拉加载显示
			};
		},
		onLoad(options) {
			gobalData.openId = uni.getStorageSync("wxopenid")
			if(!gobalData.openId){
				uni.redirectTo({
					url: '/pages/Impower'
				})
			}
			this.code = sessionStorage.getItem("code") //绑卡成功状态
			this.removeFall = sessionStorage.getItem("removeFall") //解绑成功状态
			this.getCard() //获取数据

		},
		onReachBottom() { //上拉触底触发
			this.pageSize += 8
			if (this.isLoad == 1) {
				this.loadShow = 1
			} else {
				this.getCard()
			}

		},
		watch: {
			searchCon() { //监听搜索
				if (this.searchCon) {
					this.loadShow = 0
				}
				this.list = this.cardList.filter((item) => {
					if (/^[\u2E80-\u9FFF]+$/.test(this.searchCon)) {
						return item.custName.toLowerCase().includes(this.searchCon.toLowerCase())
					} else if (/^[0-9]+$/.test(this.searchCon)) {
						return item.cardFaceNo.includes(this.searchCon)
					}
					return pinyin.getFullChars(item.custName).toLowerCase().includes(pinyin.getFullChars(this.searchCon).toLowerCase())

				})
			}
		},
		methods: {
			//通过openId获取绑定的卡
			getCard() {
				if (this.pageSize <= 10) {
					this.isShow = "加载中..."
				} else {
					this.loadShow = 1
				}
				this.$api.post({
					url: gobalData.url_getCard,
					data: {
						openId: gobalData.openId,
						// openId: "oAtJj0pHnQIrJDsbIN0alX5W_AuI",
						page: "1",
						pageSize: this.pageSize
					}
				}).then((data) => {
					if (data.data.resultCode === "1") {
						this.cardList = data.data.data.records
						console.log(this.cardList)
						if (data.data.data.pages == 1) {
							this.isLoad = 1
						}
						this.list = this.cardList;
					} else {
						this.fallCon = data.data.message
					}
					this.isShow = 0
				}).catch((err) => {
					this.isShow = 0
					this.fallCon = err.errMsg
				})
			},
			showModal(card) { //点击打开底部弹窗
				this.modalShow = 1
				this.delCard = card
			},
			removeCard() { //解绑	
				this.isShow = "正在解绑"
				this.$api.post({
					url: gobalData.url_delCard,
					data: {
						cardFaceNo: this.delCard.cardFaceNo,
						openId: gobalData.openId
					}
				}).then((data) => {
					this.isShow = 0
					if (data.data.resultCode == "1") {
						sessionStorage.setItem("removeFall", 1)
						location.reload();

					} else {
						this.fallCon = data.data.message
					}
				}).catch((err) => {
					this.isShow = 0
					this.fallCon = err.errMsg
				})
			},
			hideSuccess() { //关闭绑卡成弹窗
				this.code = 0
				this.removeFall = 0
				sessionStorage.removeItem("code")
				sessionStorage.removeItem("removeFall")
			},
			hideModal() { //点击取消
				this.modalShow = 0
				this.fallCon = ""
			},
			toBuy(data) { //跳转页面传参
				//data保存到浏览器本地
				sessionStorage.setItem("cardCsn", data.cardFaceNo);
				sessionStorage.setItem("nickname", data.custName);
				uni.redirectTo({
					url: "/pages/index/index"
				});
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.letter[e.target.id];
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.letter[e.target.id];
			},
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			selectList() { //点击搜索
				this.list = this.cardList.filter((item) => {
					if (/^[\u2E80-\u9FFF]+$/.test(this.searchCon)) {
						return item.custName.toLowerCase().includes(this.searchCon.toLowerCase())
					} else if (/^[0-9]\d*$/.test(this.searchCon)) {
						return item.cardFaceNo.includes(this.searchCon)
					}
					return pinyin.getFullChars(item.custName).toLowerCase().includes(pinyin.getFullChars(this.searchCon).toLowerCase())
				})
			}
		}
	}
</script>

<style>
	.fixed {
		top: 45px;
	}

	page {
		padding-top: 100upx;
	}

	.bg-gradual-green {
		background-image: linear-gradient(45deg, #BAD4FF, #75ACFB);
	}

	.indexes {
		position: relative;


	}

	/* 
	.cu-list {
		height: 1000px;
	} */

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}

	.cu-avatar {
		background-color: rgba(0, 0, 0, 0);

	}

	.delCard {
		position: absolute;
		right: 94upx;
		top: 50%;
		margin-top: -8.8px;
	}

	.bg-img {
		padding: 40upx 0;
	}

	.emoji {
		width: 70upx;
		height: 70upx;
	}

	.page {
		margin: auto;
		padding: 0 150upx;
	}

	.load {
		background-color: rgba(255, 255, 255, 0);
		color: #1774CA;
		font-size: 25upx;
	}
</style>

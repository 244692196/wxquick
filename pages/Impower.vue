<template>
	<view class='impower'>
		<!-- 授权页面 -->
		<view class='middle'>
			<p>请稍后.....</p>
			<!-- <p>请稍后.....{{openid}}</p> -->
		</view>
	</view>
</template>

<script>
	import {
		gobalData
	} from "../static/js/properties.js"
	export default {
		data() {
			return {
				state: "",
				code: "",
				data: "",
				openid: "",
				mes:""
			}
		},
		onLoad(options) {
			gobalData.openId ==uni.getStorageSync('wxopenid')
			this.openid=gobalData.openId 
			if(gobalData.openId!=""){
				uni.redirectTo({
					url: '/pages/index/index'
				})
				return;
			}
			this.code = options.code
			this.state = options.state
			if (this.code == "" || this.code == null) {
				//从缓存中获取code值
				//this.code = uni.getStorageSync('wxcode')
			}
			if (this.code == "" || this.code == null) {
				//this.state = 1
				this.impower();
			} else {
				//this.state = 2
				uni.setStorageSync('wxcode', this.code);
				uni.setStorageSync('wxstate', this.state);
				this.wximpower()
				this.mes="123456"
			}
		},
		methods: {
			login() {
				//this.impower();
				uni.redirectTo({
					url: '/pages/index/index'
				})
			},
			impower() { //授权
				window.location.href =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx846efe6894dcac28&redirect_uri=http%3A%2F%2Fsg.oxoxo.xyz%2Fwxquick%2F&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
			},
			wximpower() { //授权
				this.openid='1'
				uni.request({
					url: gobalData.url_getcode + `?cityid=${gobalData.cityCode}&code=${this.code}&sign=123`, 
					method: 'GET',
					success: (res) => {
						this.mes="1"
						this.openid=res.data
						console.log(res.data);
						if (res.data.rep_code == '00') {
							this.openid = res.data.openId
							this.data = 'request success';
							uni.setStorageSync('wxopenid', this.openid);
							gobalData.openId = uni.getStorageSync('wxopenid')
							uni.redirectTo({
								url: '/pages/index/index'
							})
						} else { //失败了，重新授权
							uni.clearStorageSync('wxopenid')
							this.impower()
						}
					}
				});
			}
		}
	}
</script>

<style>
	.title {
		width: 100%;
		height: 200px;
	}

	.middle {
		width: 100%;
	}

	.middle p {
		width: 100%;
		height: 40px;
		font: 18px/40px '微软雅黑';
		text-align: center;
	}

	.middle button {
		width: 80%;
		margin: 50px auto;
	}
</style>

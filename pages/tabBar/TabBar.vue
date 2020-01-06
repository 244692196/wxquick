<template>
	<view class="tab_bar">
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="components">
				<view :style="{transform:(PageCur=='components'?'scale(1.2)':'')}" class='cuIcon-cu-image'>
					<image :src="'../../static/img/' + [PageCur == 'components'?'card1':'card2'] + '.png'"></image>
				</view>
				<view :style="{color:(PageCur=='components'?'#1296db':'')}">购券</view>
			</view>
			<view class="action" @click="NavChange" data-cur="basics">
				<view :style="{transform:(PageCur=='basics'?'scale(1.2)':'')}" class='cuIcon-cu-image'>
					<image :src="'../../static/img/' + [PageCur == 'basics'?'card4':'card3'] + '.png'"></image>
				</view>
				<view :style="{color:(PageCur=='basics'?'#1296db':'')}">绑卡</view>
			</view>
			<view class="action" @click="NavChange" data-cur="maps">
				<view :style="{transform:(PageCur=='maps'?'scale(1.2)':'')}" class='cuIcon-cu-image'>
					<image :src="'../../static/img/' + [PageCur == 'maps'?'card6':'card5'] + '.png'"></image>
				</view>
				<view :style="{color:(PageCur=='maps'?'#1296db':'')}">网点</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			PageCur: ''
		},

		methods: {
			NavChange: function(e) {
				let PageCur = e.currentTarget.dataset.cur
				if (PageCur == "components") {
					uni.navigateTo({
						url: "/pages/index/index"
					})
				} else if (PageCur == "basics") {
					uni.navigateTo({
						url: "/pages/basics/Card"
					})
				} else {
					uni.navigateTo({
						url: "/pages/map/Map"
					})
				}
			}
		}
	}
</script>

<style>
	.cu-bar.tabbar .action {
		font-size: 30upx;
	}

	.cu-bar.tabbar .action .cuIcon-cu-image {
		width: 30px;
		height: 30px
	}

	.cu-bar.foot {
		height: 140upx;
	}
</style>

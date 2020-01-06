<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height:800px;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/img/a.png'
				}]
			}
		},
		onLoad(params) {
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
			// console.log(JSON.stringify(params)=="{}");
			if (JSON.stringify(params) == "{}") return
			this.covers[0].latitude = params.latitude
			this.covers[0].longitude = params.longitude
			this.latitude = params.latitude
			this.longitude = params.longitude
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>
<style>
	.page-body {
		width: 100%;
		height: 100%;
	}
</style>

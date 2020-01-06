<template>
	<view class="map">
		<ul>
			<li class="map_info" v-for="(item,index) in newMaps" :key="index">
				<p class="terName">网点名称:{{item.terName}}</p>
				<p class="terNo">网点编号:{{item.terNo}}</p>

				<p @click="getSites(item.map)">
					<img src="../../static/img/dizhi.png" style="width: 34upx; margin-top: 4px">
					{{item.terAddr}}
				</p>
			</li>
		</ul>
		<view v-if="loadShow" class="cu-load bg-cyan" :class="!isLoad?'loading':'over'"></view>
		<view class="tabBar">
			<tab-bar :PageCur="map"></tab-bar>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'mapInfo',
		data() {
			return {
				map: "maps",
				maps: [{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '环球磁卡',
						terAddr: "温州道325号",
						map: {
							latitude: 39.1070030791,
							longitude: 117.2290831804
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '第六大道',
						terAddr: "天津市河东区津滨大道198号",
						map: {
							latitude: 39.116310,
							longitude: 117.266779
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '环球磁卡',
						terAddr: "温州道325号",
						map: {
							latitude: 39.1070030791,
							longitude: 117.2290831804
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '第六大道',
						terAddr: "天津市河东区津滨大道198号",
						map: {
							latitude: 39.116310,
							longitude: 117.266779
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '环球磁卡',
						terAddr: "温州道325号",
						map: {
							latitude: 39.1070030791,
							longitude: 117.2290831804
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '第六大道',
						terAddr: "天津市河东区津滨大道198号",
						map: {
							latitude: 39.116310,
							longitude: 117.266779
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '第六大道',
						terAddr: "天津市河东区津滨大道198号",
						map: {
							latitude: 39.116310,
							longitude: 117.266779
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '环球磁卡',
						terAddr: "温州道325号",
						map: {
							latitude: 39.1070030791,
							longitude: 117.2290831804
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '第六大道',
						terAddr: "天津市河东区津滨大道198号",
						map: {
							latitude: 39.116310,
							longitude: 117.266779
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '环球磁卡',
						terAddr: "温州道325号",
						map: {
							latitude: 39.1070030791,
							longitude: 117.2290831804
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '第六大道',
						terAddr: "天津市河东区津滨大道198号",
						map: {
							latitude: 39.116310,
							longitude: 117.266779
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '环球磁卡',
						terAddr: "温州道325号",
						map: {
							latitude: 39.1070030791,
							longitude: 117.2290831804
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '第六大道',
						terAddr: "天津市河东区津滨大道198号",
						map: {
							latitude: 39.116310,
							longitude: 117.266779
						}
					},
					{
						terNo: Math.floor(Math.random() * 10000000),
						terName: '环球磁卡',
						terAddr: "温州道325号",
						map: {
							latitude: 39.1070030791,
							longitude: 117.2290831804
						}
					},

				],
				newMaps: [],
				loadLen: 5,
				loadShow: 0,
				isLoad: 0
			}
		},
		onLoad() {
			this.loadLen = this.maps.length <= 6 ? this.maps.length : 6
		},
		onShow() {
			for (let i = 0; i < this.loadLen; i++) {
				this.newMaps.push(this.maps[i])
			}
		},
		onReachBottom() { //监听触底
			this.loadShow = 1 //触底显示

			//如果
			if (this.newMaps.length < this.maps.length && this.loadLen < this.maps.length) {
				if (this.maps.length - this.newMaps.length > 4) {

					this.loadLen += 4
				} else {
					this.loadLen += this.maps.length - this.newMaps.length
				}

				this.isLoad = 0
				this.loadMore()
			} else {
				this.isLoad = 1
			}


		},
		methods: {
			getSites(map) {
				uni.navigateTo({
					url: `/pages/map/Plat?latitude=${map.latitude}&longitude=${map.longitude}`
				});
			},
			loadMore() {
				let temp = []
				setTimeout(() => {
					for (let i = 0; i < this.loadLen; i++) {
						temp.push(this.maps[i])
					}
					this.newMaps = temp
					this.loadShow = 0
				}, 1000)

			}
		},
		onHide() {

			this.loadLen = this.newMaps.length
			this.newMaps.length = 0
			// console.log(this.loadLen)
		}
	}
</script>
<style>
	.map {
		width: 100%;
		height: 100%;
	}

	.map_info {
		box-sizing: border-box;
		width: 100%;
		height: 16%;
		background-color: #fff;
		padding: 23upx 100upx;
		font: 34upx/2 '微软雅黑';
		/* color: #000; */
		border-bottom: 3upx solid #ccc;

	}

	.terName {
		font-size: 37upx;
		font-weight: bold;
	}

	.tabBar {
		width: 100%;
		height: 140upx;
	}

	.cu-load {
		background-color: rgba(255, 255, 255, 0);
		color: #777;
		font-size: 28upx;
	}

	.loading {
		margin: 0;
	}
</style>

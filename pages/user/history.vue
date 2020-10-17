<template>
	<view  class="team">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs class="pickuplist_tabs" :tabs="navbar" :sliderWidth="150" :currentTab="currentTab>1?0:currentTab" @change="changeTab" itemWidth="50%"></tui-tabs>
		</view>
		<!-- 一级伙伴 -->
		<scroll-view scroll-y v-if="currentTab==0" class="one">
			<view class="FY FY-c FX-c" v-if="nodata_1" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="one_list" v-if="!!!nodata_1">
				<view class="one_list_1" v-for="(item, index) in oneLevel" :key="index">
					<view class="one_list_11" style="font-size: 38rpx;">{{item[0].u_name}}</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item[0].entry}}</view>
						<view>现货买入</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item[0].seller}}</view>
						<view>卖出</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item[0].pickup}}</view>
						<view>提货</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item[0].pfentry}}</view>
						<view>批发买入</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 二级伙伴 -->
		<scroll-view scroll-y v-if="currentTab==1" class="one">
			<view class="FY FY-c FX-c" v-if="nodata_2" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="one_list" v-if="!!!nodata_2">
				<view class="one_list_1" v-for="(item, index) in twoLevel" :key="index">
					<view class="one_list_11" style="font-size: 36rpx;">{{item[0].u_name}}</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item[0].entry}}</view>
						<view>现货买入</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item[0].seller}}</view>
						<view>卖出</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item[0].pickup}}</view>
						<view>提货</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item[0].pfentry}}</view>
						<view>批发买入</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import App from '../../App.vue';
	
	export default {
		data() {
			return {
				navbar: [
					{name: "一级伙伴"},
					{name: "二级伙伴"}
				],
				currentTab: 0,
				nodata_1: false,
				nodata_2: false,
				oneLevel: [],
				twoLevel: []
			}
		},
		onLoad: async function() {
			const showsharecount_res = await this.showsharecount(2);
			if (showsharecount_res.status === 200 && showsharecount_res.data.length !== 0 && !!showsharecount_res.data) {
				if (showsharecount_res.data.level_1.length === 0) { this.nodata_1 = true; } else { this.oneLevel = showsharecount_res.data.level_1; };
				if (showsharecount_res.data.level_2.length === 0) { this.nodata_2 = true; } else { this.twoLevel = showsharecount_res.data.level_2; };
			} else {
				this.nodata_1 = true;
				this.nodata_2 = true;
				this.showToast(3, '暂无内容!');
			};
		},
		methods: {
			// 信息反馈
			showToast: function(type, msg, msg2) {
				let params = { title: msg, imgUrl: "../../static/img/toast/check-circle.png", icon: true };
				switch (type) {
					case 1: params.title = msg; params.imgUrl = "../../static/img/toast/check-circle.png"; break;
					case 2: params.title = msg; params.imgUrl = "../../static/img/toast/fail-circle.png"; break;
					case 3: params.title = msg; params.imgUrl = "../../static/img/toast/info-circle.png"; break;
					case 4: params.title = msg; params.icon = false; break;
					case 5: params.title = msg; params.content = msg2; break;
					default: break;
				}
				this.$refs.toast.show(params)
			},
			// tab切换
			changeTab: async function(e){
				this.currentTab = e.index;
			},
			// 获取团队管理
			showsharecount: async function(type) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.showsharecount,
						data: { type },
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.team{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
		box-sizing: border-box;
	}
	.tabs{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		box-sizing: border-box;
		z-index: 999;
	}
	.one, .two{
		width: 100%;
		height: 100%;
		padding-top: 90rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	.one_list{
		.one_list_1{
			padding: 20rpx;
			display: flex;
			justify-content: space-around;
			background-color: #FFF;
			font-size: 28rpx;
			color: #666;
			border-radius: 20rpx;
			margin-bottom: 10rpx;
			.one_list_11{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				.one_list_11_num{
					font-size: 46rpx;
					color: #E3372B;
				}
			}
		}
	}
</style>

<template>
	<view  class="team">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs class="pickuplist_tabs" :tabs="navbar" :sliderWidth="150" :currentTab="currentTab>1?0:currentTab" @change="changeTab" itemWidth="50%"></tui-tabs>
		</view>
		<!-- 一级伙伴 -->
		<scroll-view scroll-y v-if="currentTab==0" class="one">
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="one_list">
				<view class="one_list_1" v-for="(item, index) in oneData" :key="index">
					<view class="one_list_11" style="font-size: 36rpx;">{{item.name}}</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item.num1}}</view>
						<view>卖出</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item.num2}}</view>
						<view>提货</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item.num3}}</view>
						<view>批发买入</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 二级伙伴 -->
		<scroll-view scroll-y v-if="currentTab==1" class="one">
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="one_list">
				<view class="one_list_1" v-for="(item, index) in twoData" :key="index">
					<view class="one_list_11" style="font-size: 36rpx;">{{item.name}}</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item.num1}}</view>
						<view>卖出</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item.num2}}</view>
						<view>提货</view>
					</view>
					<view class="one_list_11">
						<view class="one_list_11_num">{{item.num3}}</view>
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
					nodata: false,
					oneData: [
						{
							name: '王**',
							num1: 999,
							num2: 888,
							num3: 666
						},
						{
							name: '冯**',
							num1: 99,
							num2: 88,
							num3: 66
						},
						{
							name: '张**',
							num1: 959,
							num2: 858,
							num3: 656
						},
						{
							name: '李**',
							num1: 939,
							num2: 838,
							num3: 636
						}
					],
					twoData: []
			}
		},
		onLoad: function() {
			// const getAddressList_res = await this.getAddressList();
			// if (getAddressList_res.status === 200 && getAddressList_res.data.length !== 0 && getAddressList_res.data) {
			// 	this.addressList = getAddressList_res.data;
			// 	this.nodata = false;
			// } else {
			// 	this.nodata = true;
			// };
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
			changeTab: function(e){
				this.currentTab = e.index;
			},
			// 获取资金流水
			cashflow: async function(type) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.cashflow,
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
				width: 20%;
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

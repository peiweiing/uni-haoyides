<template>
	<view  class="team">
		<view class="bgColor"></view>
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs class="pickuplist_tabs" :tabs="navbar" :sliderWidth="150" :currentTab="currentTab>1?0:currentTab" @change="changeTab" itemWidth="50%"></tui-tabs>
		</view>
		<!-- 一级伙伴 -->
		<view  v-if="currentTab==0" class="one">
			<view class="FY FY-c FX-c" v-if="nodata_1" style="font-size: 16px;height: calc(90vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				<text style="color: #999; font-weight: bold;">暂无内容</text>
			</view>
			<view class="one_list" v-if="!!!nodata_1">
				<view class="one_list_1" v-for="(item, index) in oneLevel" :key="index">
					<view class="one_list_1_top">{{nameHide(item.u_name)}}</view>
					<view class="one_list_1_bottom">
						<view class="mobile">手机号码：{{item.u_acc}}</view>
						<view class="time">{{getTime(item.dl_bindtime)}}&nbsp;加入</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 二级伙伴 -->
		<view  v-if="currentTab==1" class="one">
			<view class="FY FY-c FX-c" v-if="nodata_2" style="font-size: 16px;height: calc(90vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				<text style="color: #999; font-weight: bold;">暂无内容</text>
			</view>
			<view class="one_list" v-if="!!!nodata_1">
				<view class="one_list_1" v-for="(item, index) in oneLevel" :key="index">
					<view class="one_list_1_top">{{nameHide(item.u_name)}}</view>
					<view class="one_list_1_bottom">
						<view class="mobile">手机号码：{{item.entry}}</view>
						<view class="time">{{getTime(item.dl_bindtime)}}&nbsp;加入</view>
					</view>
				</view>
			</view>
		</view>
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
			const showsharecount_res = await this.showsharecount();
			console.log(showsharecount_res);
			if (showsharecount_res.status === 200 && showsharecount_res.data.level_1_list.length !== 0) {
				this.oneLevel = showsharecount_res.data.level_1_list;
			} else {
				this.nodata_1 = true;
			};
			if (showsharecount_res.status === 200 && showsharecount_res.data.level_2_list.length !== 0) {
				this.twoLevel = showsharecount_res.data.level_2_list;
			} else {
				this.nodata_2 = true;
			};
		},
		computed:{
			// 获取时间(年月日)
			getTime() {
				return function(data) {
					let year = new Date(data * 1000).getFullYear();
					let month = new Date(data * 1000).getMonth()+1;
					let date = new Date(data * 1000).getDate();
					if (month < 10) { month = "0" + month; }	
					if (date < 10) { date = "0" + date; }
					return year + "-" + month + "-" + date;
				}
			},
			// 获取时间(时分秒)
			getTime2() {
				return function(data) {
					let hour = new Date(data * 1000).getHours();
					let minute = new Date(data * 1000).getMinutes();
					let second = new Date(data * 1000).getSeconds();
					if (hour < 10) { hour = "0" + hour; }
					if (minute < 10) { minute = "0" + minute; }
					if (second < 10) { second = "0" + second; }
					return hour + ":" + minute + ":" + second;
				}
			},
			// 姓名保护
			nameHide() {
				return function(data) {
					if (data == null) { return; };
					if (data.length === 2) {
						let fristName = data.substr(0,1);
						return fristName + '*';
					} else {
						let fristName = data.substr(0,1);
						let lastName = data.substr(1,1);
						return fristName + '*' + lastName;
					};
				}
			}
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
				console.log(e);
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
	  .bgColor{
	    z-index: -1;
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: #EEE;
	  }
	.team{
		box-sizing: border-box;
	}
	.tabs{
		position: fixed;
		top: 44px;
		// #ifdef APP-PLUS
		top: 0;
		// #endif
		// #ifdef  MP
		top: 0;
		// #endif
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
			flex-direction: column;
			background-color: #FFF;
			border-radius: 20rpx;
			margin-bottom: 10rpx;
			.one_list_1_top{
				padding-left: 20rpx;
				font-size: 32rpx;
				font-weight: bold;
				line-height: 64rpx;
				color: #333;
				box-sizing: border-box;
				border-bottom: 2rpx solid #EEE;
			}
			.one_list_1_bottom{
				padding-top: 10rpx;
				display: flex;
				font-size: 28rpx;
				color: #999;
				.mobile{
					flex: 1;
				}
			}
		}
	}
</style>

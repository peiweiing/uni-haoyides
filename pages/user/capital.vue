<template>
	<view class="capital">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs 
			class="pickuplist_tabs"
			:tabs="navbar"
			:sliderWidth="150"
			:currentTab="currentTab>1?0:currentTab"
			@change="changeTab"
			itemWidth="50%"
			></tui-tabs>
		</view>
		<!-- 今日 -->
		<scroll-view scroll-y v-if="currentTab==0" class="today">
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<tui-list-view v-if="!nodata">
				<tui-list-cell :lineLeft="false" v-for="(item, index) in todayList" :key="index">
					<view class="tui-item-box">
						<view class="tui-msg-box">
							<view class="tui-msg-item">
								<view class="tui-msg-name">{{item.ucf_cate}}</view>
								<view class="tui-msg-content">
									{{getTime(item.ucf_time)}}
									{{getTime2(item.ucf_time)}}
								</view>
							</view>
						</view>
						<view class="tui-msg-right">
							<view class="" :style="'color:'+(item.ucf_type === '支出' ? '#9E2036' : '#07C160')">
								{{item.ucf_type === '支出' ? '-' : '+'}}
								{{item.ucf_amount}}
							</view>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</scroll-view>
		<!-- 历史 -->
		<scroll-view scroll-y v-if="currentTab==1" class="history">
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<tui-list-view v-if="!nodata">
				<tui-list-cell :lineLeft="false" v-for="(item, index) in historyList" :key="index">
					<view class="tui-item-box">
						<view class="tui-msg-box">
							<view class="tui-msg-item">
								<view class="tui-msg-name">{{item.ucf_cate}}</view>
								<view class="tui-msg-content">
									{{getTime(item.ucf_time)}}
									{{getTime2(item.ucf_time)}}
								</view>
							</view>
						</view>
						<view class="tui-msg-right">
							<view class="" :style="'color:'+(item.ucf_type === '支出' ? '#9E2036' : '#07C160')">
								{{item.ucf_type === '支出' ? '-' : '+'}}
								{{item.ucf_amount}}
							</view>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</scroll-view>
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				navbar: [
					{name: "今日"},
					{name: "历史"}
				],
				currentTab: 0,
				nodata: false,
				todayList: [],
				historyList: []
			}
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
			}
		},
		onLoad: async function() {
			const todayList_res = await this.cashflow(1);
			console.log(todayList_res);
			if (todayList_res.status === 200 && todayList_res.data.length !== 0 && todayList_res.data) {
				this.todayList = todayList_res.data;
				this.nodata = false;
			} else {
				// this.showToast("暂无内容");
				this.nodata = true;
			};
		},
		methods: {
			// 信息反馈
			showToast: function(data) { uni.showToast({ title: data, mask: true, icon: "none" }) },
			// tab切换
			changeTab: async function(e){
				this.currentTab = e.index;
				if (e.index === 1) {
					const historyList_res = await this.cashflow(2);
					console.log(historyList_res);
					if (historyList_res.data && historyList_res.status === 200 && historyList_res.data.length !== 0) {
						this.historyList = historyList_res.data;
						this.nodata = false;
					} else {
						// this.showToast("暂无内容");
						this.nodata = true;
					};
				} else {
					const todayList_res = await this.cashflow(1);
					console.log(todayList_res);
					if (todayList_res.data && todayList_res.status === 200 && todayList_res.data.length !== 0) {
						this.todayList = todayList_res.data;
						this.nodata = false;
					} else {
						// this.showToast("暂无内容");
						this.nodata = true;
					};
				};
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
	.capital{
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
	.today, .history{
		width: 100%;
		height: 100%;
		padding-top: 90rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tui-ml-auto {
		margin-left: auto;
	}
	.tui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
	}
	.tui-logo {
		height: 52rpx;
		width: 52rpx;
		flex-shrink: 0;
	}
	.tui-flex {
		display: flex;
		align-items: center;
	}
	.tui-msg-box {
		display: flex;
		align-items: center;
	}
	.tui-msg-pic {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: block;
		margin-right: 24rpx;
		flex-shrink: 0;
	}
	.tui-msg-item {
		max-width: 500rpx;
		min-height: 80rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34rpx;
		line-height: 1;
		color: #262b3a;
	}
	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 26rpx;
		line-height: 1;
		color: #9397a4;
	}
	.tui-msg-right {
		height: 88rpx;
		margin-left: auto;
		display: flex;
		align-items: center;
		font-size: 50rpx;
		font-weight: lighter;
	}
	/deep/ .tui-list-cell{
		border-radius: 20rpx;
		margin-bottom: 10rpx;
	}
</style>

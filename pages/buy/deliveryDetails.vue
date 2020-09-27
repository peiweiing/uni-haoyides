<template>
	<view class="deliveryDetails">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs 
			:tabs="navbar"
			:currentTab="currentTab > 2 ? 0 : currentTab"
			@change="changeTab"
			itemWidth="33.3333%"
			></tui-tabs>
		</view>
		<!-- 当日零售量 -->
		<scroll-view scroll-y class="retail" v-if="currentTab==0">
			<view style="height: 80rpx;"></view>
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="retailList" v-if="!nodata">
				当日零售量
			</view>
		</scroll-view>
		<!-- 当日批发量 -->
		<scroll-view scroll-y class="wholesale" v-if="currentTab==1">
			<view style="height: 80rpx;"></view>
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="wholesaleList" v-if="!nodata">
				当日批发量
			</view>
		</scroll-view>
		<!-- 全部 -->
		<scroll-view scroll-y class="all" v-if="currentTab==2">
			<view style="height: 80rpx;"></view>
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="allList" v-if="!nodata">
				<view class="listCell" v-for="item in pickupList">
					{{item.g_title}}
				</view>
			</view>
		</scroll-view>
		<view class="confirm_btn">
			<button
			class="confirm_btn_1"
			hover-class="tui-button-hover"
			type="primary"
			>
				确 定 选 择 (0)
			</button>
		</view>
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				currentTab: 0,
				navbar: [
					{name: "当日零售量"},
					{name: "当日批发量"},
					{name: "全部"}
				],
				goodId: 0,
				pickupList: [],
				nodata: false
			}
		},
		onLoad: async function(option) {
			// this.goodId = option.id;
			this.goodId = 7;
			const pickuplist_res_onLoad = await this.pickuplist(1);
			console.log(pickuplist_res_onLoad);
			if (pickuplist_res_onLoad.status === 200 && pickuplist_res_onLoad.data && pickuplist_res_onLoad.data.length !== 0) {
				this.pickupList = pickuplist_res_onLoad.data;
				this.nodata = false;
			} else {
				this.nodata = true;
				this.showToast(pickuplist_res_onLoad.msg);
			};
		},
		methods: {
			// 信息反馈
			showToast: function(data) { uni.showToast({ title: data, icon: "none", duration: 2000 }) },
			// tab切换
			changeTab: async function(e){
				this.currentTab = e.index;
				const pickuplist_res_tab = await this.pickuplist(this.currentTab+1);
				console.log(pickuplist_res_tab);
				if (pickuplist_res_tab.status === 200 && pickuplist_res_tab.data && pickuplist_res_tab.data.length !== 0) {
					this.pickupList = pickuplist_res_tab.data;
					this.nodata = false;
				} else {
					this.nodata = true;
					this.showToast(pickuplist_res_tab.msg);
				};
			},
			// 获取提货明细列表
			pickuplist: async function(type) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.pickuplist,
						data: { type, g_id: this.goodId },
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.deliveryDetails{
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
		border: 6rpx solid #F00;
		z-index: 999;
	}
	.retail, .wholesale, .all{
		box-sizing: border-box;
		border: 6rpx solid #000;
		height: 100%;
	}
	.confirm_btn{
		position: absolute;
		bottom: 80rpx;
		left: 40rpx;
		right: 40rpx;
		box-sizing: border-box;
	}
	.confirm_btn_1{
		background-color: #9E2036;
	}
</style>

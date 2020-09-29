<template>
	<!-- 提现 -->
	<view class="withdrawal">
		<form @submit="formSubmit">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs 
			:tabs="navbar"
			:currentTab="currentTab>1?0:currentTab"
			@change="changeTab"
			itemWidth="50%"
			></tui-tabs>
		</view>
		<!-- 提现申请 -->
		<scroll-view scroll-y v-if="currentTab==0" class="apply">
			<view>
				<view style="height: 80rpx;"></view>
				<view class="info">
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">当前账户余额：</view>
							<input
							placeholder-class="tui-phcolor"
							disabled
							class="tui-input"
							:placeholder="`￥${balance}`"
							maxlength="50"
							type="digit"
							 />
						</view>
					</tui-list-cell> 
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">提现金额：</view>
							<input
							placeholder-class="tui-phcolor"
							class="tui-input"
							name="amount"
							placeholder="请输入提现金额"
							maxlength="50"
							type="text"
							v-model="withmoney"
							/>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">确认提现金额：</view>
							<input
							placeholder-class="tui-phcolor"
							class="tui-input"
							name="amount2"
							placeholder="请输入确认提现金额"
							maxlength="50"
							type="text"
							v-model="confirm_money"
							/>
						</view>
					</tui-list-cell>
				</view>
				<view class="info_2">
					<view class="info_2_content">
						<view class="info_2_icon">
							<text class="info_2_iconText" style="opacity: 0;"></text>
							<tui-icon name="circle-selected" :size="30" :color="'#9E2036'"></tui-icon>
							<text class="info_2_iconText" style="border-color: #9E2036;"></text>
						</view>
						<text class="info_2_font">提交申请</text>
					</view>
					<view class="info_2_content">
						<view class="info_2_icon">
							<text class="info_2_iconText"></text>
							<tui-icon name="circle-selected" :size="30" :color="'#999'"></tui-icon>
							<text class="info_2_iconText"></text>
						</view>
						<text class="info_2_font">审核</text>
					</view>
					<view class="info_2_content">
						<view class="info_2_icon">
							<text class="info_2_iconText"></text>
							<tui-icon name="circle-selected" :size="30" :color="'#999'"></tui-icon>
							<text class="info_2_iconText" style="opacity: 0;"></text>
						</view>
						<text class="info_2_font">成功提现</text>
					</view>
				</view>
				<!-- <view class="info_3">
					预计到账时间2个工作日内
				</view> -->
			</view>
		</scroll-view>
		<!-- 提现进度 -->
		<scroll-view scroll-y v-if="currentTab==1" class="progress">
			<view style="height: 80rpx;"></view>
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view v-if="!nodata">
				<view class="progressList" v-for="item in progressList">
					<view class="progressList_left">
						<view class="left_top">提现金额</view>
						<view class="left_bottom">￥{{Number(item.ra_amount).toFixed(2)}}</view>
					</view>
					<view class="progressList_center">
						<view>提现时间</view>
						<view>{{getTime(item.ra_datetime)}} {{getTime2(item.ra_datetime)}}</view>
					</view>
					<view class="progressList_right">
						<view>提现状态</view>
						<view class="left_bottom">{{item.ra_progress + '...'}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="confirm_box" v-if="con_btn">
			<button
			class="tui-button-primary"
			hover-class="tui-button-hover"
			formType="submit"
			type="primary"
			>
				确 认 提 现
			</button>
		</view>
		</form>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import App from "../../App.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				navbar: [
					{name: "提现申请"},
					{name: "提现进度"}
				],
				currentTab: 0,
				nodata: false, // 暂无内容
				balance: "00.00", // 当前账户余额
				withmoney: "", // 提现金额
				confirm_money: "", // 确认提现金额
				progressList: [], // 提现记录
				con_btn: true // 确认按钮控制
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
			const account_res = await this.account();
			if (account_res.status === 200 && account_res.data.length !== 0 && account_res.data) {
				this.balance = account_res.data[0].bal_trades;
			} else {
				this.showToast(2, "获取信息失败!请重试...");
			};
		},
		methods: {
			// 信息反馈
			// showToast: function(data) { uni.showToast({ title: data, icon: "none" }) },
			// 信息反馈
			showToast: function(type, msg, msg2) {
				let params = { title: msg, imgUrl: "../../static/img/toast/check-circle.png", icon: true };
				switch (type) {
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
				if (e.index === 1) {
					this.con_btn = false;
					const withdrawallist_res = await this.withdrawallist();
					if (withdrawallist_res.status === 200 && withdrawallist_res.data.length !== 0 && withdrawallist_res.data) {
						this.progressList = withdrawallist_res.data;
						this.nodata = false;
					} else {
						this.nodata = true;
					};
				} else {
					this.con_btn = true;
				};
			},
			// 表单提交
			formSubmit: async function(e) {
				//表单规则
				let rules = [
					{
						name: "amount",
						rule: ["required", "isAmount"],
						msg: ["请输入提现金额!", "请输入正确的金额，允许保留两位小数!"]
					}, 
					{
						name: "amount2",
						rule: ["required", "isSame:amount"],
						msg: ["请输入确认提现金额!", "两次输入的金额不一致!"]
					}
				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				// 判断提现金额是否符合数字规则
				if (checkRes) { this.showToast(3, checkRes); return };
				// 判断提现金额是否小于等于零
				if (this.withmoney <= 0) { this.showToast(3, "提现金额必须大于零!"); return };
				// 提交参数
				const withmoney = { withmoney: this.withmoney };
				// 确认提现
				const withdrawaladd_res = await this.withdrawaladd(withmoney);
				// 信息反馈
				// console.log(withdrawaladd_res);
				if (withdrawaladd_res.status === 200) {
					this.showToast(5, withdrawaladd_res.msg, '即将返回个人中心...');
					setTimeout(() => { uni.switchTab({ url: "./userCenter" }) }, 2500);
				} else {
					this.showToast(2, "提现失败!请重试...");
				};
			},
			// 获取用户数据信息
			account: async function() {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.account,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 提现申请
			withdrawaladd: async function(data) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.withdrawaladd,
						data: data,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 获取获取提现记录
			withdrawallist: async function() {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.withdrawallist,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdrawal{
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
	.apply, .progress{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 80rpx 40rpx;
	}
	.progress{
		padding: 0 20rpx;
		padding-bottom: 20rpx;
	}
	.info{
		border-radius: 20rpx;
		overflow: hidden;
	}
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-title {
		width: 240rpx;
		text-align: right;
		font-size: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}
	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}
	.info_2{
		width: 100%;
		height: 200rpx;
		background-color: #FFF;
		border-radius: 20rpx;
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.info_2_content{
		text-align: center;
	}
	.info_2_icon{
		display: flex;
		align-items: center;
		.info_2_iconText{
			width: 70rpx;
			height: 2rpx;
			box-sizing: border-box;
			border-top: 2rpx dashed #999;
		}
	}
	.info_2_font{
		font-size: 28rpx;
	}
	.info_3{
		margin-top: 40rpx;
		width: 100%;
		text-align: center;
		color: #999999;
		font-size: 28rpx;
	}
	.confirm_box{
		position: absolute;
		bottom: 80rpx;
		left: 40rpx;
		right: 40rpx;
	}
	.tui-button-primary{
		background-color: #9E2036;
	}
	.progressList{
		padding: 10rpx 40rpx;
		width: 100%;
		height: 160rpx;
		background-color: #FFF;
		border-radius: 20rpx;
		margin: 10rpx 0;
		display: flex;
		box-sizing: border-box;
	}
	.progressList_left, .progressList_right, .progressList_center{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #999999;
		font-size: 28rpx;
		view{
			line-height: 50rpx;
		}
	}
	.progressList_center{
		flex: 1;
	}
	.left_bottom{
		color: #9E2036;
		font-size: 36rpx;
	}
</style>

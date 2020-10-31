<template>
	<!-- 提现 -->
	<view class="withdrawal">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs  :tabs="navbar" :sliderWidth="150" :currentTab="currentTab>1?0:currentTab" @change="changeTab" itemWidth="50%"></tui-tabs>
		</view>
		<!-- 提现申请 -->
		<scroll-view scroll-y v-if="currentTab==0" class="apply" @touchstart="touchstart" @touchend="touchend">
			<view>
				<view style="height: 40rpx;"></view>
				<view class="info">
					<tui-list-cell :hover="false" @click="changePay(0)">
						<view class="tui-line-cell">
							<view class="tui-title" :class="payChoose==0?'FY-c FX-sb':''">
								<tui-icon
								name="check"
								:size="20"
								color="#00AAEE"
								v-if="payChoose==0"></tui-icon>
								<text style="color: #9E2036;font-weight: bold;">支付宝账户：</text>
								</view>
							<input placeholder-class="tui-phcolor" class="tui-input" :disabled="payChoose==1" :placeholder="ua_alipayacc === '' ? '请填写支付宝账户' : ''" maxlength="50" type="text" v-model="ua_alipayacc"/>
						</view>
					</tui-list-cell> 
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">
								支付宝姓名：
								</view>
							<input placeholder-class="tui-phcolor" class="tui-input" :disabled="payChoose==1" placeholder="请填写支付宝姓名" maxlength="50" type="text" v-model="ua_alipay_name"/>
						</view>
					</tui-list-cell> 
				</view>
				<view class="info" style="margin-top: 10rpx;">
					<tui-list-cell :hover="false" @click="changePay(1)">
						<view class="tui-line-cell">
							<view class="tui-title" :class="payChoose==1?'FY-c FX-sb':''">
								<tui-icon
								name="check"
								:size="20"
								color="#80D640"
								v-if="payChoose==1"></tui-icon>
								<text style="color: #9E2036;font-weight: bold;">银行名称：</text>
							</view>
							<input placeholder-class="tui-phcolor" class="tui-input" :disabled="payChoose==0" placeholder="请填写银行名称" maxlength="50" type="text" v-model="ua_bankname"/>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">银行卡号：</view>
							<input placeholder-class="tui-phcolor" class="tui-input" :disabled="payChoose==0" placeholder="请填写银行卡号" maxlength="50" type="number" v-model="ua_cardnum"/>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">收款人：</view>
							<input placeholder-class="tui-phcolor" class="tui-input" :disabled="payChoose==0" placeholder="请填写收款人" maxlength="50" type="text" v-model="ua_payee"/>
						</view>
					</tui-list-cell>
				</view>
				<view style="height: 40rpx;"></view>
				<view class="info">
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">当前账户余额：</view>
							<input placeholder-class="tui-phcolor" disabled class="tui-input" maxlength="50" type="text" v-model="balance"/>
						</view>
					</tui-list-cell> 
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">提现金额：</view>
							<input placeholder-class="tui-phcolor" class="tui-input" name="amount" placeholder="请输入提现金额" maxlength="50" type="text" v-model="withmoney"/>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">确认提现金额：</view>
							<input placeholder-class="tui-phcolor" class="tui-input" name="amount2" placeholder="请输入确认提现金额" maxlength="50" type="text" v-model="confirm_money"/>
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
			</view>
		</scroll-view>
		<!-- 提现进度 -->
		<scroll-view scroll-y v-if="currentTab==1" class="progress" @touchstart="touchstart" @touchend="touchend">
			<view style="height: 80rpx;"></view>
			<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>暂无内容
			</view>
			<view v-if="!nodata">
				<view class="progressList" v-for="(item, index) in progressList" :key="index">
					<view class="progressList_top">
						<view class="progressList_left">
							<view class="left_top">提现金额</view>
							<view class="left_bottom">{{Number(item.ra_amount).toFixed(2)}}</view>
						</view>
						<view class="progressList_center">
							<view class="left_top">打款金额</view>
							<view class="left_bottom">{{Number(item.ra_final_amount).toFixed(2)}}元</view>
						</view>
						<view class="progressList_right">
							<view class="left_top">手续费</view>
							<view class="left_bottom">{{Number(item.ra_service).toFixed(2)}}元</view>
						</view>
					</view>
					<view class="progressList_bottom">
						<view>
							{{getTime(item.ra_datetime)}}
						</view>
						<view style="color: #9E2036; font-weight: bold;">
							{{item.ra_progress}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="confirm_box" v-if="con_btn">
			<button class="tui-button-primary" hover-class="tui-button-hover" @click="submit" type="primary">确 认 提 现</button>
		</view>
	</view>
</template>

<script>
	import App from "../../App.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				payChoose:0,
				navbar: [{name: "提现申请"}, {name: "提现进度"}],
				currentTab: 0,
				nodata: false, // 暂无内容
				ua_alipayacc: '', // 支付宝账户
				ua_alipay_name: '', // 支付宝姓名
				ua_bankname:'',
				ua_cardnum:'',
				ua_payee:'',
				ua_acc_type:1,
				balance: "￥00.00", // 当前账户余额
				withmoney: "", // 提现金额
				confirm_money: "", // 确认提现金额
				progressList: [], // 提现记录
				con_btn: true, // 确认按钮控制
				// 监听用户滑动操作
				startData: { clientX: 0, clientY: 0 }
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
				this.balance = '￥' + account_res.data[0].bal_trades;
				if (account_res.data[0].ua_alipayacc) {
					this.ua_alipayacc = account_res.data[0].ua_alipayacc;
				};
				this.ua_alipay_name = account_res.data[0].ua_alipay_name;
				this.ua_bankname = account_res.data[0].ua_bankname;
				this.ua_cardnum = account_res.data[0].ua_cardnum;
				this.ua_payee = account_res.data[0].ua_payee;
			} else {
				this.showToast('系统繁忙 请重试');
			};
		},
		methods: {
			changePay: function(data) {
				if(data==0){
					this.payChoose=0;
					this.ua_acc_type=1;
					// this.ua_bankname='';this.ua_cardnum='';this.ua_payee='';
				}else if(data==1){
					this.payChoose=1;
					this.ua_acc_type=2;
					// this.ua_alipayacc='';
				}
			},
			// 信息反馈
			showToast: function(msg) { uni.showToast({ title: msg, icon: "none" }) },
			// tab切换
			changeTab: function(e){
				this.currentTab = e.index;
				if (e.index === 1) { this.con_btn = false; this.withdrawallistAjax(); } else { this.con_btn = true; };
			},
			// 确认提现
			submit: async function() {
				let that =this;
				// 是否填写支付宝账户
				// if (!this.ua_alipayacc) { this.showToast('请填写支付宝账户'); return; };
				if (!this.ua_alipayacc&&!this.ua_bankname) { this.showToast('请填写提现账户'); return; };
				// if (this.payChoose==0&&!this.ua_alipay_name||!this.ua_alipayacc) { this.showToast('请完善支付宝账户信息'); return; };
				// if (this.payChoose==0&&!this.ua_bankname||!this.ua_cardnum||!this.ua_payee) { this.showToast('请完善银行账户信息'); return; };
				if(this.payChoose==0){
					if(!this.ua_alipay_name||!this.ua_alipayacc){
						 that.showToast('请完善选中账户信息');
						 return;
					}
				}else{
					console.log(1)
					if(!this.ua_bankname||!this.ua_cardnum||!this.ua_payee){
						 that.showToast('请完善选中账户信息');
						 return;
					}
				}
				// 是否填写提现金额
				if (this.withmoney === '') { this.showToast('请提现金额'); return; };
				// 提现金额是否填写正确
				if (isNaN(this.withmoney)) { this.showToast('提现金额必须为合法数字'); return; };
				// 提现金额是否小于等于零
				if (this.withmoney <= 0) { this.showToast('提现金额不得小于零'); return; };
				// 提现金额是否多于两位小数
				let str = this.withmoney + '';
				const index = str.indexOf('.');
				if (index !== -1) {
					let str2 = str.substr(index+1, str.length -1);
					if (str2.length >2) { this.showToast('只能保留两位小数'); return; };
				};
				// 确认提现金额是否填写
				if (this.confirm_money === '') { this.showToast('请填写确认提现金额'); return; };
				// 判断提现金额是否相等
				if (this.withmoney !== this.confirm_money) { this.showToast('两次提现金额不相等'); return; };
				// 提交参数
				const withmoney={withmoney:this.withmoney,ua_alipayacc:this.ua_alipayacc,ua_alipay_name:this.ua_alipay_name,ua_bankname:this.ua_bankname,ua_cardnum:this.ua_cardnum,ua_payee:this.ua_payee,ua_acc_type:this.ua_acc_type};
				// 确认提现
				const withdrawaladd_res = await this.withdrawaladd(withmoney);
				// 信息反馈
				if (withdrawaladd_res.status === 200) {
					this.showToast(withdrawaladd_res.msg + ' 即将返回');
					setTimeout(() => { uni.switchTab({ url: "./userCenter" }) }, 1500);
				} else {
					this.showToast('系统繁忙 请重试');
				};
			},
			// 触摸监听起始
			touchstart: function(e) {
				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;
			},
			// 触摸监听结束
			touchend: function(e) {
				const subX = e.changedTouches[0].clientX - this.startData.clientX;
				const subY = e.changedTouches[0].clientY - this.startData.clientY;
				if (subX > 50) {
					console.log('向左切换');
					if (this.currentTab > 0) { this.currentTab = this.currentTab - 1; this.con_btn = true; };
				} else if (subX < -50) {
					console.log('向右切换');
					if (this.currentTab < 1) { this.currentTab = this.currentTab + 1; this.con_btn = false; this.withdrawallistAjax(); };
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
			// 加载用户提现记录
			withdrawallistAjax: async function() {
				const withdrawallist_res = await this.withdrawallist();
				if (withdrawallist_res.status === 200 && withdrawallist_res.data.length !== 0 && withdrawallist_res.data) {
					this.progressList = withdrawallist_res.data;
					this.nodata = false;
				} else {
					this.nodata = true;
				};
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
		width: 260rpx;
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
	.confirm_box{
		position: absolute;
		bottom: 0;
		left: 40rpx;
		right: 40rpx;
	}
	.tui-button-primary{
		background-color: #9E2036;
	}
	.progressList{
		padding: 10rpx 40rpx;
		width: 100%;
		background-color: #FFF;
		border-radius: 20rpx;
		margin: 10rpx 0;
		box-sizing: border-box;
	}
	.progressList_top{
		display: flex;
		box-sizing: border-box;
		padding-bottom: 10rpx;
		border-bottom: 2rpx solid #EEE;
		
	}
	.progressList_bottom{
		padding-top: 10rpx;
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		color: #999;
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

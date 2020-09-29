<template>
	<view class="recharge">
		<form @submit="formSubmit">
			<scroll-view scroll-y class="container">
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
							<view class="tui-title">充值金额：</view>
							<input
							placeholder-class="tui-phcolor"
							class="tui-input"
							name="amount"
							placeholder="请输入充值金额"
							maxlength="50"
							type="number"
							v-model="total"
							/>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">确认充值金额：</view>
							<input
							placeholder-class="tui-phcolor"
							class="tui-input"
							name="amount2"
							placeholder="请输入确认充值金额"
							maxlength="50"
							type="number"
							v-model="conTotal"
							/>
						</view>
					</tui-list-cell>
				</view>
				
				<!-- <view class="choose">
					请选择支付方式
				</view> -->
				<!-- <view class="info">
					<tui-list-cell @click="changePay(1)">
						<view class="payment_cho">
							<view class="payment">
								<tui-icon
								name="wechat"
								:size="30"
								color="#80D640"
								></tui-icon>
								<text style="opacity: 0;">一</text>
								微信支付
							</view>
							<tui-icon
							:style="{ opacity: (payChoose === 1 ? 0 : 1) }"
							name="check"
							:size="30"
							color="#80D640"
							></tui-icon>
						</view>
					</tui-list-cell>
					<tui-list-cell @click="changePay(2)">
						<view class="payment_cho">
							<view class="payment">
								<tui-icon
								name="alipay"
								:size="30"
								color="#00AAEE"
								></tui-icon>
								<text style="opacity: 0;">一</text>
								支付宝支付
							</view>
							<tui-icon
							:style="{ opacity: payChoose }"
							name="check"
							:size="30"
							color="#00AAEE"
							></tui-icon>
						</view>
					</tui-list-cell>
				</view> -->
			</scroll-view>
			<view class="confirm_box">
				<!-- <button
				class="tui-button-primary"
				hover-class="tui-button-hover"
				formType="submit"
				type="primary"
				>
					确 认 充 值
				</button> -->
				<button
				class="tui-button-primary"
				hover-class="tui-button-hover"
				@tap="onrecharges"
				type="primary"
				>
					确 认 充 值
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
				balance: "", // 当前账户余额信息
				payChoose: 1, // 支付方式
				total: "" , // 充值金额
				conTotal: "", // 确认充值金额
				orderInfo: "", // 订单信息
				payment_res_1: "", // resultStatus结果码(9000)
				payment_res_2: "", // code结果码(10000)
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
			showToast: function(type, msg, msg2) {
				let params = { title: msg, imgUrl: "../../static/img/toast/check-circle.png", icon: true, duration: 1000 };
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
			onrecharges(){
				let that =this;
				let data ={payChoose:that.payChoose,money:that.total};
				if(that.total>0||that.conTotal>0){
					uni.getStorage({
						key: 'user',
						success: function (res) {
							console.log(res.data);
							that.user = res.data
							if(that.user!=1){
								uni.showModal({
									title: '提示',
									content: '请先实名认证',
									success: function (res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../user/realName',
											})
											console.log('用户点击确定');
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									},
								});
							}else{
								if(that.total!=''&&that.conTotal!=''&&that.total==that.conTotal){
									// 请求:
									// that.sendRequest({
									// 	url :App.getRechargeInfo,
									// 	method:'POST',
									// 	data:data,
									// 	success : function(res){
									// 		console.log("确认充值",res.data)
									// 		let data = res.data;
									// 		let datas = encodeURIComponent(JSON.stringify(data))
									// 		uni.navigateTo({
									// 			url:"recharges?data="+ datas,
									// 			success : function(nav){
									// 				that.total = ""; // 输入金额输入框清零
									// 				that.conTotal = ""; // 确认金额输入框清零
									// 			}
									// 		})
									// 	},
									// 	fail:function(e){
									// 		console.log("fail:" + JSON.stringify(e));
									// 	}
									// });
									
									uni.navigateTo({
										url:"recharges?money="+ that.total,
										success : function(nav){
											that.total = ""; // 输入金额输入框清零
											that.conTotal = ""; // 确认金额输入框清零
										}
									})
									
								}else{
									uni.showToast({
										icon: 'none',
										title: '请查看金额是否填写异常'
									});
								}
								
							}
						},
					});
				}else{
					uni.showToast({
						icon: 'none',
						title: '请查看金额是否填写异常'
					});
					
				}
				
				
			},
			// 表单提交
			formSubmit: async function(e) {
				//表单规则
				let rules = [{
					name: "amount",
					rule: ["required", "isAmount"],
					msg: ["请输入充值金额!", "请输入正确的金额，允许保留两位小数!"]
				},{
					name: "amount2",
					rule: ["required", "isSame:amount"],
					msg: ["请输入确认金额!", "两次输入的金额不一致!"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				// 判断充值金额是否符合数字规则
				if (checkRes) { this.showToast(3, checkRes); return };
				// 判断充值金额是否小于等于零
				if (this.amount <= 0) { this.showToast(3, "充值金额必须大于零!"); return };
				// 判断充值方式
				if (this.payChoose === 0) { this.showToast(3, "目前只支持支付宝支付!"); return };
				// 获取用户手机里的服务商
				const getProvider_res = await this.getProvider();
				// 获取订单信息
				const recharge_res = await this.recharge(this.total);
				if (recharge_res.status !== 200) { this.showToast(2, recharge_res.msg); return };
				this.orderInfo = recharge_res.data.orderInfo;
				// 调起支付宝支付
				const requestPayment_res = await this.requestPayment(this.orderInfo);
				// console.log("支付完成返回数据:", requestPayment_res)
				// 获取支付完成返回resultStatus结果码
				this.payment_res_1 = JSON.parse(requestPayment_res.rawdata).resultStatus;
				// 获取支付完成返回code结果码
				const result_info = JSON.parse(requestPayment_res.rawdata).result;
				const index = result_info.indexOf(';');
				const result_info_2 = result_info.slice(0, index-1);
				this.payment_res_2 = JSON.parse(result_info_2).alipay_trade_app_pay_response.code;
				// 信息反馈
				if (this.payment_res_2 == 10000) {
					let payment_info = "";
					switch(this.payment_res_1){
						case "9000" : payment_info = "订单支付成功!"; break;
						case "8000" : payment_info = "正在处理中，支付结果未知~"; break;
						case "4000" : payment_info = "订单支付失败!"; break;
						case "5000" : payment_info = "重复请求!"; break;
						case "6001" : payment_info = "用户中途取消!"; break;
						case "6002" : payment_info = "网络连接出错!"; break;
						case "6004" : payment_info = "支付结果未知~"; break;
						case "其他" : payment_info = "其它支付错误!"; break;
					}
					this.showToast(5, payment_info, '即将返回个人中心...');
				} else {
					this.showToast(2, "系统出错!请稍后再试...");
				}
				this.total = ""; // 输入金额输入框清零
				this.conTotal = ""; // 确认金额输入框清零
				setTimeout(() => { uni.switchTab({ url: "./userCenter" }) }, 2500); // 返回个人中心
			},
			// 支付方式修改
			changePay: function(data) { data === 1 ? this.payChoose = 0 : this.payChoose = 1 },
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
			// 获取用户手机里的服务商
			getProvider: async function() {
				return await new Promise((resolve, reject) => {
					uni.getProvider({
					    service: 'payment',
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 获取订单信息
			recharge: async function(total) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.recharge,
						data: { total },
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 调起支付宝支付
			requestPayment: async function(orderInfo) {
				return await new Promise((resolve, reject) => {
					uni.requestPayment({
						provider: 'alipay',
						orderInfo,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.recharge{
		box-sizing: border-box;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
	}
	.container {
		padding: 80rpx 40rpx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 180rpx;
	}
	.info{
		border-radius: 20rpx;
		overflow: hidden;
	}
	.choose{
		font-size: 32rpx;
		color: #808080;
		margin: 40rpx;
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
	.confirm_box{
		position: absolute;
		bottom: 80rpx;
		left: 40rpx;
		right: 40rpx;
		box-sizing: border-box;
	}
	.tui-button-primary{
		background-color: #9E2036;
	}
	.payment_cho{
		padding-right: 20rpx;
		display: flex;
		justify-content: space-between;
		.payment{
			display: flex;
			align-items: center;
			font-size: 32rpx;
		}
	}
</style>

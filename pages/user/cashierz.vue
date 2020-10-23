<template>
	<view class="recharge">
		<form @submit="formSubmit">
			<scroll-view scroll-y class="container">
				
				<view class="choose">
					订单信息
				</view>
				<view class="info">
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">商品名称：</view>
							<input
							placeholder-class="tui-phcolor"
							disabled
							class="tui-input"
							:placeholder="orderinfo.g_title"
							maxlength="50"
							type="digit"
							 />
						</view>
					</tui-list-cell> 
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">商品编码：</view>
							<input
							placeholder-class="tui-phcolor"
							disabled
							class="tui-input"
							:placeholder="orderinfo.g_code"
							maxlength="50"
							type="digit"
							 />
						</view>
					</tui-list-cell> 
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">订单价格(元)：</view>
							<input
							placeholder-class="tui-phcolor"
							disabled
							class="tui-input"
							:placeholder="`￥${(+orderinfo.total_money).toFixed(2)}`"
							maxlength="50"
							type="digit"
							 />
						</view>
					</tui-list-cell> 
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">订单数量(份)：</view>
							<input
							placeholder-class="tui-phcolor"
							disabled
							class="tui-input"
							:placeholder="orderinfo.num+''"
							maxlength="50"
							type="digit"
							 />
						</view>
					</tui-list-cell> 
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">服务费(元)：</view>
							<input
							placeholder-class="tui-phcolor"
							disabled
							class="tui-input"
							:placeholder="`￥${(+orderinfo.service_money).toFixed(2)}`"
							maxlength="50"
							type="digit"
							 />
						</view>
					</tui-list-cell> 
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">合计(元)：</view>
							<input
							placeholder-class="tui-phcolor"
							disabled
							class="tui-input"
							:placeholder="`￥${(+orderinfo.order_total).toFixed(2)}`"
							maxlength="50"
							type="digit"
							 />
						</view>
					</tui-list-cell> 
				</view>
				<view class="choose">
					请选择支付方式
				</view>
				<view class="info">
					<tui-list-cell @click="changePay(0)" v-if="pay_method.balpay==1">
						<view class="payment_cho">
							<view class="payment">
								<!-- <tui-icon
								name="coupon"
								:size="30"
								color="#9E2036"
								></tui-icon> -->
								<image style="width: 30px;height: 33px;" src="../../static/img/yue.png" mode=""></image>
								<text style="opacity: 0;">一</text>
								余额支付
							</view>
							<tui-icon
							name="check"
							:size="30"
							color="#9E2036"
							v-if='payChoose==0'></tui-icon>
						</view>
					</tui-list-cell>
					<tui-list-cell @click="changePay(1)" v-if="pay_method.wxpay==1">
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
							name="check"
							:size="30"
							color="#80D640"
							v-if='payChoose==1'></tui-icon>
						</view>
					</tui-list-cell>
					<tui-list-cell @click="changePay(2)" v-if="pay_method.alipay==1">
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
							name="check"
							:size="30"
							color="#00AAEE"
							v-if='payChoose==2'></tui-icon>
						</view>
					</tui-list-cell>
				</view>
			</scroll-view>
			<view class="confirm_box">
				<button
				:disabled="disabled"
				class="tui-button-primary"
				hover-class="tui-button-hover"
				formType="submit"
				type="primary"
				>
					确 认 订 单
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
				orderinfo: "", // 当前订单信息
				pay_method:'',//支付方式，
				payChoose: 0, // 支付方式
				// total: "" , // 充值金额
				// conTotal: "", // 确认充值金额
				orderInfo: "", // 订单信息
				payment_res_1: "", // resultStatus结果码(9000)
				payment_res_2: "", // code结果码(10000)
				eid:'',uid:'',num:'',
				disabled:false,
			}
		},
		onLoad: async function(e) {
			console.log("收银台：",e);
			var that = this;
			that.eid = e.gid;that.num=e.num;that.uid=e.uid;
			that.sendRequest({
				url: App.entrustOrderInfo,
				method: 'POST',
				data: {"g_id":that.eid,"ut_id":that.uid,"entry_num":that.num},
				success: (res) => {
					console.log("摘牌买入",res);
					console.log(res.data.pay_method);
					that.pay_method=res.data.pay_method;
					if(res.status==200){
						that.orderinfo=res.data.orderinfo;
					}else{
						that.showToast(1, res.msg);
					}
				},
				complete: ()=> {
					console.log('摘牌执行了')
					that.disabled=false;
				},
			});
			// 获取应用版本
			// plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			// 	console.log(inf.version)
			// });
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
			// 表单提交
			formSubmit(e){
				console.log(e);
				var that = this;
				that.disabled=true;
				if(that.payChoose==0){
					that.sendRequest({
						url: App.entrusBuy,
						method: 'POST',
						data: {"g_id":that.eid,'ut_id':that.uid,'entry_num':that.num},
						success: (res) => {
							console.log('余额支付',res);
							that.showToast(1, res.msg);
							setTimeout(function(){
								let pages = getCurrentPages();
								let nowPage = pages[ pages.length - 1];
								let prevPage = pages[ pages.length - 2 ];
								prevPage.$vm.detail = res.data;
								uni.navigateBack({delta:1});
							},800)
						},
						complete: ()=> {
							console.log('执行了')
							that.disabled=false;
						},
					});
				}else if(that.payChoose==1){
					that.sendRequest({
						url: App.payorder,
						method: 'POST',
						data: {"g_id":that.eid,'pay_method':1},
						success: (res) => {
							console.log('微信支付',res);
							that.showToast(1, res.msg);
						},
						complete: ()=> {
							console.log('执行了')
							that.disabled=false;
						},
					});
				}else if(that.payChoose==2){
					that.sendRequest({
						url: App.entrustPayOrder,
						method: 'POST',
						data: {"g_id":that.eid,'ut_id':that.uid,'entry_num':that.num,'pay_method':2},
						success: (res) => {
							console.log('支付宝方式',res);
							that.showToast(1, res.msg);
							that.orderInfo=res.data.orderInfo;
							uni.requestPayment({
							    provider: 'alipay',
							    orderInfo: that.orderInfo, //微信、支付宝订单数据
							    success: function (res) {
									console.log(res)
									// 获取支付完成返回resultStatus结果码
									const astatus = JSON.parse(res.rawdata).resultStatus;
									const result = JSON.parse(res.rawdata).result;
									const index = result.indexOf(';');
									const results = result.slice(0, index-1);
									const acode = JSON.parse(results).alipay_trade_app_pay_response.code;
									
							        console.log('success:' + JSON.stringify(res));
							        console.log('success状态码1:' + astatus);//订单支付成功
							        console.log('success状态码2:' + acode);//调用成功
									// 信息反馈
									if (acode == 10000) {
										let payinfo = "";
										switch(astatus){
											case "9000" : payinfo = "订单支付成功!"; break;
											case "8000" : payinfo = "正在处理中，支付结果未知~"; break;
											case "4000" : payinfo = "订单支付失败!"; break;
											case "5000" : payinfo = "重复请求!"; break;
											case "6001" : payinfo = "用户中途取消!"; break;
											case "6002" : payinfo = "网络连接出错!"; break;
											case "6004" : payinfo = "支付结果未知~"; break;
											case "其他" : payinfo = "其它支付错误!"; break;
										}
										that.showToast(5, payinfo, '');
										setTimeout(function(){
											uni.navigateBack({delta:1});
										},800)
									} else {
										that.showToast(2, "系统出错!请稍后再试...");
									}
							    },
							    fail: function (err) {
									console.log(err)
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
							
						},
						complete: ()=> {
							console.log('执行了')
							that.disabled=false;
						},
					});
				}
			},
			// formSubmit: async function(e) {
			// 	//表单规则
			// 	let rules = [
			// 		{
			// 			name: "amount",
			// 			rule: ["required", "isAmount"],
			// 			msg: ["请输入充值金额!", "请输入正确的金额，允许保留两位小数!"]
			// 		}, 
			// 		{
			// 			name: "amount2",
			// 			rule: ["required", "isSame:amount"],
			// 			msg: ["请输入确认金额!", "两次输入的金额不一致!"]
			// 		}
			// 	];
			// 	// 获取用户手机里的服务商
			// 	// const getProvider_res = await this.getProvider();
			// 	// 调起支付宝支付
			// 	const requestPayment_res = await this.requestPayment(this.orderInfo);
			// 	// console.log("支付完成返回数据:", requestPayment_res)
			// 	// 获取支付完成返回resultStatus结果码
			// 	this.payment_res_1 = JSON.parse(requestPayment_res.rawdata).resultStatus;
			// 	// 获取支付完成返回code结果码
			// 	const result_info = JSON.parse(requestPayment_res.rawdata).result;
			// 	const index = result_info.indexOf(';');
			// 	const result_info_2 = result_info.slice(0, index-1);
			// 	this.payment_res_2 = JSON.parse(result_info_2).alipay_trade_app_pay_response.code;
			// 	// 信息反馈
			// 	if (this.payment_res_2 == 10000) {
			// 		let payment_info = "";
			// 		switch(this.payment_res_1){
			// 			case "9000" : payment_info = "订单支付成功!"; break;
			// 			case "8000" : payment_info = "正在处理中，支付结果未知~"; break;
			// 			case "4000" : payment_info = "订单支付失败!"; break;
			// 			case "5000" : payment_info = "重复请求!"; break;
			// 			case "6001" : payment_info = "用户中途取消!"; break;
			// 			case "6002" : payment_info = "网络连接出错!"; break;
			// 			case "6004" : payment_info = "支付结果未知~"; break;
			// 			case "其他" : payment_info = "其它支付错误!"; break;
			// 		}
			// 		this.showToast(5, payment_info, '即将返回个人中心...');
			// 	} else {
			// 		this.showToast(2, "系统出错!请稍后再试...");
			// 	}
			// },
			// 支付方式修改
			changePay: function(data) {
				if(data==0){
					this.payChoose=0;
					this.disabled=false;
				}else if(data==1){
					this.payChoose=1;
					this.disabled=false;
				}else if(data==2){
					this.payChoose=2;
					this.disabled=false;	
				}
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
			// recharge: async function(total) {
			// 	return await new Promise((resolve, reject) => {
			// 		this.sendRequest({
			// 			method: "POST",
			// 			url: App.recharge,
			// 			data: { total },
			// 			success: res => { resolve(res) },
			// 			fail: err => { reject(err) }
			// 		})
			// 	})
			// },
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recharge{
		position: absolute;
		top: 0;
		bottom: 0;
		box-sizing: border-box;
		width: 100%;
		background-color: #EEE;
	}
	.container {
		padding: 0 40rpx 40rpx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	.uni-scroll-view-content{
		padding-bottom: 40rpx;
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
	.tui-cell-hover{
		background-color: #fff!important;
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
		bottom: 0;
		left: 0;
		right: 0;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.tui-button-primary{
		background-color: #9E2036!important;
	}
	.tui-button-hover{
		background-color: #bd2541!important;
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

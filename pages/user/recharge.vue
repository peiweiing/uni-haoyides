<template>
	<view class="container">
		<form @submit="formSubmit">
			<view class="info">
				<tui-list-cell :hover="false" unlined>
					<view class="tui-line-cell">
						<view class="tui-title">当前账户余额：</view>
						<input placeholder-class="tui-phcolor" disabled class="tui-input" placeholder="￥999.00" maxlength="50"
						 type="digit" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">充值金额：</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="amount" placeholder="请输入充值金额" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">确认充值金额：</view>
						<input placeholder-class="tui-phcolor" class="tui-input" name="amount2" placeholder="请输入确认充值金额" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
			</view>
			<view class="choose">
				请选择支付方式
			</view>
			<view class="info">
				<tui-list-cell @click="changePay('wechat')" :hover="true">
					<view class="payment_cho">
						<view class="payment">
							<tui-icon name="wechat" :size="30" color="#80D640"></tui-icon>
							<text style="opacity: 0;">一</text>
							微信支付
						</view>
						<tui-icon :style="{ opacity: (payChoose === 1 ? 0 : 1) }" name="check" :size="30" color="#80D640"></tui-icon>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="changePay('alipay')" :hover="true">
					<view class="payment_cho">
						<view class="payment">
							<tui-icon name="alipay" :size="30" color="#00AAEE"></tui-icon>
							<text style="opacity: 0;">一</text>
							支付宝支付
						</view>
						<tui-icon :style="{ opacity: payChoose }" name="check" :size="30" color="#00AAEE"></tui-icon>
					</view>
				</tui-list-cell>
			</view>
			<view class="confirm_box">
				<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit" type="primary">确 认 充 值</button>
			</view>
		</form>
	</view>
</template>

<script>
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				payChoose: 0
			}
		},
		methods: {
			formSubmit: function(e) {
				//表单规则
				let rules = [{
					name: "amount",
					rule: ["required", "isAmount"],
					msg: ["请输入充值金额", "请输入正确的金额，允许保留两位小数"]
				}, {
					name: "amount2",
					rule: ["required", "isSame:amount"],
					msg: ["请输入确认金额", "两次输入的金额不一致"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			changePay: function(data) {
				data === "wechat" ? this.payChoose = 0 : this.payChoose = 1
				console.log(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background:rgba(238,238,238,1);
	}
	.container {
		padding: 80rpx 30rpx;
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
		left: 30rpx;
		right: 30rpx;
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

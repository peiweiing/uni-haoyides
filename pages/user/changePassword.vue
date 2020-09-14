<template>
	<!-- 修改密码 -->
	<view class="changePassword">
		<form @submit="formSubmit">
			<scroll-view scroll-y class="content">
					<view class="content_1">
						<view class="tips">
							温馨提示：密码为8~20位数字和字母组合，
							为了您的资金安全，
							禁止使用全数字、全字母或连续性字符作为密码。
						</view>
						<view class="submit">
							<tui-list-cell :hover="false">
								<view class="tui-line-cell">
									<view class="tui-title">当前密码:</view>
									<input
									placeholder-class="tui-phcolor"
									class="tui-input"
									placeholder="请输入当前密码"
									maxlength="50"
									type="text"
									v-model="oldpwd"
									/>
								</view>
							</tui-list-cell>
							<tui-list-cell :hover="false">
								<view class="tui-line-cell">
									<view class="tui-title">新密码:</view>
									<input
									placeholder-class="tui-phcolor"
									class="tui-input"
									name="pwd"
									placeholder="请输入新密码"
									maxlength="50"
									type="text"
									v-model="changepwd"
									/>
								</view>
							</tui-list-cell>
							<tui-list-cell :hover="false">
								<view class="tui-line-cell">
									<view class="tui-title">确认密码:</view>
									<input
									placeholder-class="tui-phcolor"
									class="tui-input"
									name="pwd2"
									placeholder="请输入确认密码"
									maxlength="50"
									type="text"
									v-model="confirmpwd"
									/>
								</view>
							</tui-list-cell>
						</view>
					</view>
			</scroll-view>
			<view class="confirm_box">
				<button
				class="tui-button-primary"
				hover-class="tui-button-hover"
				formType="submit"
				type="primary"
				>
				确 认 修 改</button>
			</view>
		</form>
	</view>
</template>

<script>
	import App from "../../App.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				oldpwd: "",
				changepwd: "",
				confirmpwd: ""
			}
		},
		methods: {
			// 信息反馈
			showToast: function(data) { uni.showToast({ title: data, icon: "none" }) },
			// 表单提交
			formSubmit: function(e) {
				//表单规则
				let rules = [
					{
						name: "pwd",
						rule: ["required", "isEnAndNo"],
						msg: ["请输入新密码!", "新密码为8~20位数字和字母组合!"]
					},
					{
						name: "pwd2",
						rule: ["required", "isEnAndNo"],
						msg: ["请输入确认密码!", "新密码为8~20位数字和字母组合!"]
					}
				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				// 判断当前密码是否有输入
				if (!!!this.oldpwd) { this.showToast("请输入当前密码!"); return };
				// 判断修改是否符合数字规则
				if (checkRes) { this.showToast(checkRes); return };
				// 上传参数
				const pwd_body = {
					oldpwd: this.oldpwd,
					changepwd: this.changepwd,
					confirmpwd: this.confirmpwd
				};
				var _this = this;
				// 确认提示
				uni.showModal({
				    title: '提示',
				    content: '确认修改密码？',
				    success: async function (res) {
				        if (res.confirm) {
							// 数据上传并反馈
							const updatepwd_res = await _this.updatepwd(pwd_body);
							console.log("确认修改密码:", updatepwd_res);
							if (updatepwd_res.status === 200) {
								// 输入框清空并返回
								_this.oldpwd = "";
								_this.changepwd = "";
								_this.confirmpwd = "";
								_this.showToast("修改密码成功！即将返回个人中心...");
								setTimeout(() => { uni.switchTab({ url: "./userCenter" }) }, 3000);
							} else {
								// 输入框清空并返回
								_this.oldpwd = "";
								_this.changepwd = "";
								_this.confirmpwd = "";
								_this.showToast("修改密码失败!请重试...");
							};
				        }
				    }
				});
			},
			// 确认修改
			updatepwd: async function(data) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.updatepwd,
						data,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.changePassword{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
		box-sizing: border-box;
	}
	.content{
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-bottom: 180rpx;
	}
	.content_1{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.tips{
		width: 90%;
		padding: 80rpx 0;
		color: #999;
		font-size: 30rpx;
	}
	.submit{
		box-sizing: border-box;
		border-radius: 20rpx;
		overflow: hidden;
		width: 90%;
	}
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-title {
		line-height: 32rpx;
		font-size: 32rpx;
		width: 180rpx;
		flex-shrink: 0;
		text-align: right;
	}
	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: hidden;
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
</style>

<template>
	<!-- 修改密码 -->
	<view class="changePassword">
		<form @submit="formSubmit">
			<scroll-view scroll-y class="content">
					<view class="content_1">
						<view class="tips">
							温馨提示：密码不得少于6位，
							为了您的资金安全，
							不要使用过于简单的数字或字母组合或连续性字符作为密码。
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
									type="password"
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
									type="password"
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
									type="password"
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
		
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" title="提示" :content="content" :button="button"></tui-modal>
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
				confirmpwd: "",
				content:'提示',
				modal: false,
				button: [
					{
						text: '取消',
						type: 'red',
						plain: true //是否空心
					},
					{
						text: '确认',
						type: 'red',
						plain: false
					}
				],
				
			}
		},
		methods: {
			// 信息反馈
			showToast: function(type, msg, msg2) {
				let params = {
					title: msg,
					imgUrl: "../../static/img/toast/check-circle.png",
					icon: true,
					duration: 1500
				};
				switch (type) {
					case 1:
						params.title = msg;
						params.imgUrl = "../../static/img/toast/check-circle.png";
						break;
					case 2:
						params.title = msg;
						params.imgUrl = "../../static/img/toast/fail-circle.png";
						break;
					case 3:
						params.title = msg;
						params.imgUrl = "../../static/img/toast/info-circle.png";
						break;
					case 4:
						params.title = msg;
						params.icon = false;
						break;
					case 5:
						params.title = msg;
						params.content = msg2;
						break;
					default:
						break;
				}
				this.$refs.toast.show(params);
			},
			handleClick: async function(e) {
				var _this = this;
				let index = e.index;
				const pwd_body = {
					oldpwd: _this.oldpwd,
					changepwd: _this.changepwd,
					confirmpwd: _this.confirmpwd
				};
				if (index === 0) {
					// _this.tui.toast('你点击了取消按钮');
					_this.modal = false;
				} else {
					// _this.tui.toast('你点击了确定按钮');
					_this.modal = false;
					// 数据上传并反馈
					const updatepwd_res = await _this.updatepwd(pwd_body);
					console.log("确认修改密码:", updatepwd_res);
					if (updatepwd_res.status === 200) {
						// 输入框清空并返回
						_this.oldpwd = "";
						_this.changepwd = "";
						_this.confirmpwd = "";
						_this.showToast(1, "修改成功 即将返回");
						setTimeout(() => { uni.switchTab({ url: "./userCenter" }) }, 1500);
					} else {
						// 输入框清空并返回
						_this.oldpwd = "";
						_this.changepwd = "";
						_this.confirmpwd = "";
						_this.showToast(2, "系统繁忙 请重试");
					};
				}
			},
				// 表单提交
			formSubmit: function(e) {
				//表单规则
				let rules = [
					{
						name: "pwd",
						rule: ["required"],
						msg: ["请输入新密码"]
					},
					{
						name: "pwd2",
						rule: ["required"],
						msg: ["请输入确认密码"]
					}
				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				// 判断当前密码是否有输入
				if (this.oldpwd === '') { this.showToast(3, "请输入当前密码"); return };
				// 判断修改是否符合数字规则
				if (checkRes) { this.showToast(3, checkRes); return };
				// 判断修改是否符合数字规则
				if (this.changepwd.length < 6) { this.showToast(3, '新密码不得少于6位'); return };
				// 判断修改是否符合数字规则
				if (this.changepwd !== this.confirmpwd) { this.showToast(3, '两次密码不一致'); return };
				// 上传参数
				const pwd_body = {
					oldpwd: this.oldpwd,
					changepwd: this.changepwd,
					confirmpwd: this.confirmpwd
				};
				var _this = this;
				// 确认提示
				
				_this.modal = true;
				_this.content = "确认修改密码?";
				// uni.showModal({
				//     title: '提示',
				//     content: '确认修改密码？',
				//     success: async function (res) {
				//         if (res.confirm) {
				// 			// 数据上传并反馈
				// 			const updatepwd_res = await _this.updatepwd(pwd_body);
				// 			console.log("确认修改密码:", updatepwd_res);
				// 			if (updatepwd_res.status === 200) {
				// 				// 输入框清空并返回
				// 				_this.oldpwd = "";
				// 				_this.changepwd = "";
				// 				_this.confirmpwd = "";
				// 				_this.showToast("修改密码成功！即将返回个人中心...");
				// 				setTimeout(() => { uni.switchTab({ url: "./userCenter" }) }, 3000);
				// 			} else {
				// 				// 输入框清空并返回
				// 				_this.oldpwd = "";
				// 				_this.changepwd = "";
				// 				_this.confirmpwd = "";
				// 				_this.showToast("修改密码失败!请重试...");
				// 			};
				//         }
				//     }
				// });
				
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

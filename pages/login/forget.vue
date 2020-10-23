<template>
	<view>
		<!-- 手机号 -->
		<view class="input">
			<view class="icon">
				<image style="width: 28rpx;" src="../../static/register_sj.png" mode="widthFix"></image>
			</view>
			<view>
				<input type="number" placeholder="请输入手机号" v-model="mobile"/>
			</view>
		</view>
		<!-- 验证码 -->
		<view class="input">
			<view class="yanzhengma">
				<view class="icon">
					<image src="../../static/register_yzm.png" mode="widthFix"></image>
				</view>
				<view>
					<input type="number" v-model="ma" placeholder="请输入验证码"/>
				</view>
			</view>
			<view class="ma" :hover-class="yanzhengma ? 'ma-active' : ''" hover-start-time="0" hover-stay-time="100" @click="getCaptcha">
				<view v-if="yanzhengma">获取验证码</view>
				<view v-if="!yanzhengma">
					<tui-countdown :time="60" :hours="false" :minutes="false" :size="28" :height="50" scale :isColon="false" borderColor="transparent" color="#9E2036"></tui-countdown>
				</view>
			</view>
		</view>
		<!-- 密码 -->
		<view class="input">
			<view class="icon">
				<image src="../../static/register_mima.png" mode="widthFix"></image>
			</view>
			<view>
				<input type="number" v-model="pass" placeholder="请输入密码"/>
			</view>
		</view>
		<!-- 确认密码 -->
		<view class="input">
			<view class="icon">
				<image src="../../static/register_mima.png" mode="widthFix"></image>
			</view>
			<view>
				<input type="number" v-model="pass2" placeholder="请再次输入密码"/>
			</view>
		</view>
		<!-- 确认修改 -->
		<view class="confirm_box" @click="register">确 认 修 改</view>
	</view>
</template>

<script>
	import App from '../../App.vue';
	
	export default {
		data() {
			return {
				yanzhengma: true,
				mobile: '',
				ma: '',
				pass: '',
				pass2: ''
			}
		},
		methods: {
			// 轻提示
			showToast: function(msg) { uni.showToast({ title: msg, icon: 'none' }) },
			// 页面跳转
			nav: function(url) { uni.navigateTo({ url }); },
			// 获取验证码
			getCaptcha: function() {
				if (this.yanzhengma) {
					if (this.mobile === '') { this.showToast('请填写手机号'); return; };
					if (this.mobile.length !== 11) { this.showToast('手机号码格式不正确'); return; };
					this.yanzhengma = false;
					const mobile = { mobile: this.mobile };
					this.verifyCodeAjax(mobile);
					setTimeout(() => { this.yanzhengma = true; }, 60000);
				};
			},
			// 确认
			register: function() {
				if (this.mobile === '') { this.showToast('请填写手机号'); return; };
				if (this.mobile.length !== 11) { this.showToast('手机号码格式不正确'); return; };
				if (this.ma === '') { this.showToast('请填写验证码'); return; };
				if (this.pass === '') { this.showToast('请填写密码'); return; };
				if (this.pass.length < 6) { this.showToast('密码不能少于6位'); return; };
				if (this.pass2 === '') { this.showToast('请填写确认密码'); return; };
				if (this.pass !== this.pass2) { this.showToast('两次输入密码不一致'); return; };
				const data = { mobile: this.mobile, pwd: this.pass, phonecode: this.ma };
				this.forgetpwdAjax(data);
			},
			// 返回验证码数据
			verifyCodeAjax: async function(mobile) {
				const verifyCode_res = await this.verifyCode(mobile);
				if (verifyCode_res.data && verifyCode_res.status === 200 && verifyCode_res.data.length !== 0) {
					this.showToast(verifyCode_res.msg);
				} else {
					this.showToast('系统繁忙 请重试');
				};
			},
			// 获取验证码
			verifyCode: async function(mobile) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.verifyCode,
						data: mobile,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 返回确认数据
			forgetpwdAjax: async function(data) {
				const forgetpwd_res = await this.forgetpwd(data);
				if (forgetpwd_res.status === 200) {
					this.showToast(forgetpwd_res.msg + ' 即将返回');
					setTimeout(() => { uni.navigateBack(); }, 1500);
				} else {
					this.showToast('系统繁忙 请重试');
				};
			},
			// 提交
			forgetpwd: async function(data) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.forgetpwd,
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
	page{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		padding: 120rpx 60rpx 0;
		box-sizing: border-box;
		background-color: #FFF;
	}
	.input{
		height: 86rpx;
		margin-bottom: 40rpx;
		box-sizing: border-box;
		padding: 0 24rpx;
		color: #999;
		border-bottom: 2rpx solid #EEE;
		display: flex;
		align-items: center;
		.icon{
			width: 30rpx;
			line-height: 86rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{ width: 100%; }
		}
		input{
			box-sizing: border-box;
			color: #999;
			height: 86rpx;
			margin-left: 30rpx;
		}
		.yanzhengma{
			display: flex;
			flex: 1;
		}
		.ma{
			width: 82*2rpx;
			display: flex;
			justify-content: center;
			font-size: 28rpx;
			line-height: 58rpx;
			box-sizing: border-box;
			border: 2rpx solid #9E2036;
			border-radius: 10rpx;
			color: #9E2036;
			background-color: #FFF;
		}
		.ma-active{
			color: #FFF;
			background-color: #9E2036;
		}
	}
	.confirm_box{
		position: fixed;
		bottom: 100rpx;
		left: 60rpx;
		right: 60rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		color: #FFF;
		box-sizing: border-box;
		border: 2rpx solid #9E2036;
		border-radius: 40rpx;
		background-color: #9E2036;
	}
</style>

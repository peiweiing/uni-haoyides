<template>
	<view class="container">
		<view class="loginImg FX-c por">
			<view class="logo FX-c FY-fe poa">
				<image class="img" src="../../static/img/logo.png" mode=""></image>
			</view>
		</view>
		<tui-tabs :tabs="navbar" :currentTab="currentTab>1?0:currentTab" @change="change" itemWidth="50%"></tui-tabs>
		<view class="tui-form" v-if="currentTab==0">
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#6d7a87" :size="20"></tui-icon>
					
						<input
							:adjust-position="false"
							:value="mobile"
							placeholder="请输入手机号"
							placeholder-class="tui-phcolor"
							type="number"
							maxlength="11"
							@input="inputMobile"
						/>
						<view class="tui-icon-close" v-show="mobile" @tap="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
						<input
							:adjust-position="false"
							:value="password"
							placeholder="请输入密码"
							:password="true"
							placeholder-class="tui-phcolor"
							type="text"
							maxlength="36"
							@input="inputPwd"
						/>
						<view class="tui-icon-close" v-show="password" @tap="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
			</view>
			<!-- <view class="tui-cell-text">
				<view class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @tap="href(1)">忘记密码？</view>
				<view hover-class="tui-opcity" :hover-stay-time="150">
					没有账号？
					<text class="tui-color-primary" @tap="href(2)">注册</text>
				</view>
			</view> -->
			<view class="tui-btn-box"><tui-button :disabledGray="true" :disabled="disabled" :shadow="true" shape="circle">登录</tui-button></view>
		</view>
		
		<view class="tui-form" v-if="currentTab==1">
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#6d7a87" :size="20"></tui-icon>
						<input :value="mobile" placeholder="请输入手机号" placeholder-class="tui-phcolor" type="number" maxlength="11" @input="inputMobile" />
						<view class="tui-icon-close" v-show="mobile" @tap="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="shield" color="#6d7a87" :size="20"></tui-icon>
						<input placeholder="请输入验证码" placeholder-class="tui-phcolor" type="text" maxlength="6" @input="inputCode" />
						<view class="tui-btn-send" :class="{ 'tui-gray': isSend }" :hover-class="isSend ? '' : 'tui-opcity'" :hover-stay-time="150">{{ btnSendText }}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
						<input :value="password" placeholder="请输入密码" :password="true" placeholder-class="tui-phcolor" type="text" maxlength="40" @input="inputPwd" />
						<view class="tui-icon-close" v-show="password" @tap="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
			</view>
			
			<view class="tui-cell-text FY FY-fs">
				<view class="FX FY-c">
					<checkbox-group name="ai">
						<label>
							<checkbox v-model="check" @click="checked"/>
						</label>
					</checkbox-group>
					注册代表同意
				</view>
				<view class="">确认阅读并理解
					<view style="display: inline;" class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @tap="protocol">《用户服务协议》、《隐私政策》、《现货交易管理办法》</view>
				的内容，自愿申请成为商城会员
				</view>
			</view>
			
			<view class="tui-btn-box"><tui-button :disabledGray="true" :disabled="disabled" :shadow="true" shape="circle">注册</tui-button></view>
		</view>
			
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	computed: {
		disabled: function() {
			let bool = true;
			if (this.mobile && this.password) {
				bool = false;
			}
			return bool;
		},
		
	},
	data() {
		return {
			navbar: [
				{name: "用户登录"},
				{name: "用户注册"},
			],
			currentTab: 0,
			mobile: '',
			password: '',
			code: '',
			check:'',
			popupShow: false,
			isSend: false,
			btnSendText: '获取验证码' //倒计时格式：(60秒)
		};
	},
	onLoad(options) {
		setTimeout(() => {
			this.logout();
		}, 0);
	},
	methods: {	
		...mapMutations(['login', 'logout']),
		back() {
			uni.navigateBack();
		},
		inputCode(e) {
			this.code = e.detail.value;
		},
		inputMobile: function(e) {
			this.mobile = e.detail.value;
		},
		inputPwd: function(e) {
			this.password = e.detail.value;
		},
		protocol(){
			this.tui.href("/pages/doc/protocol/protocol")
		},
		change(e) {
			this.currentTab = e.index
		},
		goNavBar() {
			uni.navigateTo({
				url: "/pages/index/navbar/navbar"
			})
		},
		checked(e){
			console.log(e)
			console.log(this.check)
			
		},
		clearInput(type) {
			if (type == 1) {
				this.mobile = '';
			} else {
				this.password = '';
			}
		},
		href(type) {
			let url = '../forgetPwd/forgetPwd';
			if (type == 2) {
				url = '../reg/reg';
			}
			this.tui.href(url);
		},
		showOtherLogin() {
			//打开后 不再关闭
			this.popupShow = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.loginImg{
		height: 420rpx;
		margin-bottom: 100rpx;
		.logo{
			width: 160rpx;
			height: 160rpx;
			background-color: #fff;
			bottom:-60rpx;
			box-sizing: border-box;
			box-shadow: 0 0 20rpx #ccc;
			border-radius: 40rpx;
			// padding: 5%;
			.img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.tui-page-title {
		width: 100%;
		font-size: 48rpx;
		font-weight: bold;
		color: $uni-text-color;
		line-height: 42rpx;
		padding: 110rpx 40rpx 40rpx 40rpx;
		box-sizing: border-box;
	}
	.tui-form {
		// padding-top: 50rpx;
		.tui-view-input {
			width: 100%;
			box-sizing: border-box;
			padding: 0 40rpx;
			.tui-cell-input {
				width: 100%;
				display: flex;
				align-items: center;
				padding-top: 48rpx;
				padding-bottom: $uni-spacing-col-base;
				input {
					flex: 1;
					padding-left: $uni-spacing-row-base;
				}
				.tui-icon-close {
					margin-left: auto;
				}
				.tui-btn-send {
					width: 156rpx;
					text-align: right;
					flex-shrink: 0;
					font-size: $uni-font-size-base;
					color: $uni-color-primary;
				}
				.tui-gray {
					color: $uni-text-color-placeholder;
				}
			}
		}
		.tui-cell-text {
			width: 100%;
			padding: 40rpx $uni-spacing-row-lg;
			box-sizing: border-box;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
			display: flex;
			align-items: center;
			.tui-color-primary {
				color: $uni-color-primary;
				padding-left: $uni-spacing-row-sm;
			}
		}
		.tui-btn-box {
			width: 100%;
			padding: 0 $uni-spacing-row-lg;
			box-sizing: border-box;
			margin-top: 80rpx;
		}
	}
}
</style>


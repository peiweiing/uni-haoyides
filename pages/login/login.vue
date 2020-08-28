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
						<tui-icon name="mobile" color="#9E2036" :size="20"></tui-icon>
					
						<input
							:adjust-position="false"
							v-model="mobile"
							placeholder="请输入手机号"
							placeholder-class="tui-phcolor"
							type="number"
							maxlength="11"
							@blur="inputMobile"
						/>
						<view class="tui-icon-close" v-show="mobile" @tap="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#9E2036" :size="20"></tui-icon>
						<input
							:adjust-position="false"
							v-model="password"
							placeholder="请输入密码"
							:password="true"
							placeholder-class="tui-phcolor"
							type="text"
							maxlength="36"
							@blur="inputPwd"
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
			<view class="tui-btn-box"><tui-button :disabledGray="true" :disabled="disabled" :shadow="true" shape="circle" @click="onlogin">登录</tui-button></view>
		</view>
		
		<view class="tui-form" v-if="currentTab==1">
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#9E2036" :size="20"></tui-icon>
						<input v-model="mobiles" placeholder="请输入手机号" placeholder-class="tui-phcolor" type="number" maxlength="11" @blur="inputMobiles" />
						<view class="tui-icon-close" v-show="mobile" @tap="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="shield" color="#9E2036" :size="20"></tui-icon>
						<input v-model="code" placeholder="请输入验证码" placeholder-class="tui-phcolor" type="text" maxlength="6" @blur="inputCodes" />
						<button :class="cls ? 'sub':'subs'" type="primary" @click="messages">{{word}}</button>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#9E2036" :size="20"></tui-icon>
						<input v-model="passwords" placeholder="请输入密码" :password="true" placeholder-class="tui-phcolor" type="text" maxlength="40" @blur="inputPwds" />
						<view class="tui-icon-close" v-show="password" @tap="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
			</view>
			
			<view class="tui-cell-text FY FY-fs">
				<view class="FX FY-c">
					<checkbox-group name="ai">
						<label>
							<checkbox v-model="check" checked="checked" @click="checked"/>
						</label>
					</checkbox-group>
					注册代表同意
				</view>
				<view class="">确认阅读并理解
					<view style="display: inline;" class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @tap="protocol">
						<text @tap="showModal1">《用户服务协议》、</text>
						<text @tap="showModal2">《隐私政策》、</text>
						<text @tap="showModal3">《现货交易管理办法》</text>
					</view>
				的内容，自愿申请成为商城会员
				</view>
			</view>
			
			<view class="tui-btn-box"><tui-button :disabledGray="true" :disabled="disabled" :shadow="true" shape="circle" @click="onregister">注册</tui-button></view>
		</view>
			
			<!--底部抽屉-->
			<tui-bottom-popup :show="bottomPopup" @close="hideModal">
				<view class="region-box">
					<view
						class="region-txt"
						:class="[index == regionArr.length - 3 || index == regionArr.length - 2 || index == regionArr.length - 1 ? 'grow' : '']"
						v-for="(item, index) in regionArr"
						:key="index"
						:data-index="index"
					>
						<image class="img1" v-if="tap1==true" src="../../static/img/login1.png" mode=""></image>
						<image class="img2" v-if="tap2==true" src="../../static/img/login2.jpg" mode=""></image>
						<!-- <image v-if="tap3==true" src="../../static/img/login3.jpg" mode=""></image> -->
					<!-- 	<text class="w40" v-if="tap1==true">{{ item.title }}</text>
						<text class="w40" v-if="tap2==true">{{ item.text }}</text>
						<text class="w40" v-if="tap3==true">{{ item.txt }}</text> -->
					</view>
					<view class="FX-c w100" style="margin: 20rpx 0;">
						<tui-button type="bronze" width="280rpx" height="90rpx" :size="32" @click="confirm">确定</tui-button>
					</view>
				</view>
			</tui-bottom-popup>
	</view>
</template>

<script>
import App from '../../App.vue'
import { mapMutations } from 'vuex';
export default {
	computed: {
		disabled: function() {
			let bool = true;
			if (this.mobile && this.password||this.mobiles && this.passwords) {
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
			regionArr: [
				{
					title:"../../static/img/login1.png",
					text:'../../static/img/login2.jpg',
					txt:'../../static/img/login1.jpg',
				},
			],
			currentTab: 0,
			mobile: '',password: '',
			mobiles: '',passwords: '',code: '',
			word: '获取验证码',
			check:'',
			cls:'',isOvertime:false,
			boola:true,boolb:true,
			boolas:true,boolbs:true,boolcs:true,
			tap1:false,tap2:false,tap3:false,
			bottomPopup: false,
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
		hideModal: function() {
			this.bottomPopup = false;
		},
		confirm: function() {
			this.bottomPopup = false;
		},
		showModal1: function() {this.bottomPopup = true;
			this.tap1 = true;this.tap2 = false;this.tap3 = false;
		},showModal2: function() {this.bottomPopup = true;
			this.tap2 = true;this.tap1 = false;this.tap3 = false;
		},showModal3: function() {this.bottomPopup = true;
			this.tap3 = true;this.tap1 = false;this.tap2 = false;
		},
		inputMobile: function(e) {
			let regs = /^[1][3,4,5,7,8][0-9]{9}$/;
			console.log(this.mobile)
			if(!this.mobile){this.boola=false;    
				uni.showToast({
					icon: 'none',
					title: '手机号不可为空'
				});
			}else if(!regs.test(this.mobile)){this.boola=false;  
				uni.showToast({
					icon: 'none',
					title: '请确认手机号是否正确'
				});}else{this.boola=true;}
			this.mobile = e.detail.value;
		},inputPwd: function(e) {
			if(!this.password){this.boolb=false;
				uni.showToast({
					icon: 'none',
					title: '密码不可为空'
				});}else{this.boolb=true;}
			this.password = e.detail.value;
		},
		inputMobiles: function(e) {
			let regs = /^[1][3,4,5,7,8][0-9]{9}$/;
			console.log(this.mobiles)
			if(!this.mobiles){this.boolas=false;    
				uni.showToast({
					icon: 'none',
					title: '手机号不可为空'
				});
			}else if(!regs.test(this.mobiles)){this.boolas=false;  
				uni.showToast({
					icon: 'none',
					title: '请确认手机号是否正确'
				});}else{this.boolas=true;this.cls=true;}
			this.mobiles = e.detail.value;
		},inputCode(e) {
			if(!this.code){this.boolb=false;
				uni.showToast({
					icon: 'none',
					title: '验证码不可为空'
				});}else{this.boolb=true;}
			this.code = e.detail.value;
		},inputPwds: function(e) {
			if(!this.password){this.boolbs=false;
				uni.showToast({
					icon: 'none',
					title: '密码不可为空'
				});}else{this.boolbs=true;}
			this.password = e.detail.value;
		},messages(){
			console.log('点击了')
			let regs = /^[1][3,4,5,7,8][0-9]{9}$/;
			let that = this,time = 60;
			if(that.mobiles!=''&&regs.test(that.mobiles)){
				console.log('执行')
				var sendTimer = setInterval(function(){
					var sub=document.getElementsByClassName('sub')[0];
					that.isOvertime = true;time--;
					that.word = time+'S后重试';
					sub.style.backgroundColor='#ccc';
					if(time < 0){
						that.isOvertime = false;
						clearInterval(sendTimer);
						that.word = "获取验证码";
						sub.style.backgroundColor='#9E2036';
						sub.style.color='#fff';
					}
				},1000);
				var phone ={'mobile':this.mobiles}
				uni.request({
					url:App.verifyCode,method: 'POST',data: phone,
					success: (res)=>{
						console.log("请求成功")
						console.log(res)
						if(res.data.msg=="登录成功"){
							uni.setStorage({
								key:'token',
								data:res.data.data.token,
								success(){
									uni.setStorage({
										key:'user',
										data:res.data.data.token
									})
								}
							})
							// that.tankuang=true;that.tishi = '登录成功!'
							// setTimeout(function(){
							// 	that.tankuang=false;
							// 	uni.switchTab({
							// 		url: '/pages/index'
							// 	});
							// },1500);
						}else{
							// that.tankuang=true;that.tishi = '登录失败，请重新登录!'
							// setTimeout(function(){
							// 	that.tankuang=false;
							// },1000)
						}
					},
					fail: (err)=>{
						console.log("请求失败")
						console.log(err)
						that.tankuang=true;
						that.tishi = '登录失败，请重新登录!'
						setTimeout(function(){
							that.tankuang=false;
						},1000)
					}
				})
			}
		},
		onregister(){
			var that =this;
			var regist ={'mobile':this.mobiles,'phonecode':this.code,'pwd':this.password}
			uni.request({
				url:App.register,method: 'POST',data: regist,
				success: (res)=>{
					console.log("请求成功")
					console.log(res)
					if(res.data.msg=="注册成功"){
						uni.showToast({
							icon: 'none',
							title: '注册成功'
						})
						setTimeout(function(){
							that.currentTab=0
						},1500);
						setTimeout(function(){
							uni.showToast({
								icon: 'none',
								title: '请登录'
							})
						},1800);
					}else{
						uni.showToast({
							icon: 'none',
							title: '注册失败'
						})
					}
				},
				fail: (err)=>{
					console.log("请求失败")
					console.log(err)
					that.tankuang=true;
					that.tishi = '登录失败，请重新登录!'
					setTimeout(function(){
						that.tankuang=false;
					},1000)
				}
			})
		},
		onlogin(){
			var that =this;
			var login ={'account':this.mobile,'password':this.password,"type":1}
			uni.request({
				url:App.login,method: 'POST',data: login,
				success: (res)=>{
					console.log("请求成功")
					console.log(res)
					if(res.data.msg=="登录成功"){
						// var tokens =res.data.data.token
							uni.setStorage({
								key:'token',
								data:res.data.data.token,
								success(){
									uni.setStorage({
										key:'user',
										data:res.data.data.token
									})
								}
							})
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						setTimeout(function(){
							uni.switchTab({
								url: "../index/index"
							})
						},1000);
					}else{
						uni.showToast({
							icon: 'none',
							title: '登录失败'
						})
					}
				},
				fail: (err)=>{
					console.log("请求失败")
					console.log(err)
					that.tankuang=true;
					that.tishi = '登录失败，请重新登录!'
					setTimeout(function(){
						that.tankuang=false;
					},1000)
				}
			})
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
				padding-top: 24rpx;
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
			// margin-top: 80rpx;
		}
	}
}
.region-box{
	// height: 26rem;
	// overflow-y: auto;
}
.region-txt{
	height: 26rem;
	overflow-y: auto;
}
.region-box .img1{
	width: 100%;
	height: 160rem;
}
.region-box .img2{
	width: 100%;
	height: 50rem;
}
.region-box .img3{
	width: 100%;
	height: 200rem;
}

	.sub{
		font-size: 24rpx;
		padding: 0;
		width: 30%;
		height: 1.4rem;
		line-height: 1.4rem;
		// border-radius: 2rem;
		color: #FFFFFF;
		background-color:#9E2036;
	}
	.subs{
		font-size: 24rpx;
		padding: 0;
		width: 30%;
		height: 1.4rem;
		line-height: 1.4rem;
		// border-radius: 2rem;
		color: #FFFFFF;
		background-color:#ccc;
	}
</style>


<template>
	<view class="realName">
		<form @submit="formSubmit">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">
						姓<text style="opacity: 0;">一</text>名
					</view>
					<input :focus="isInputFocus_1" placeholder-class="tui-phcolor" class="tui-input" name="name" :disabled="isRealName" :placeholder="isRealName ? u_info.u_name : '请输入姓名'" maxlength="50" type="text" v-model="realname"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">身份证</view>
					<input :focus="isInputFocus_2" placeholder-class="tui-phcolor" class="tui-input" name="idcard" :disabled="isRealName" :placeholder="isRealName ? u_info.u_idcard.toString() : '请输入身份证号码'" maxlength="50" type="text" v-model="idcard"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">手机号</view>
					<input :focus="isInputFocus_3" placeholder-class="tui-phcolor" class="tui-input" name="mobile" disabled :value="u_info.u_acc" maxlength="50" type="text"/>
				</view>
			</tui-list-cell>
			<view class="tui-box-upload">
				<view class="tui-box-upload_box1">
					<tui-upload class="upload-button" :value="value1" :serverUrl="serverUrl" @complete="result" @remove="remove" :forbidDel='forbidDel'></tui-upload>
					<view class="tui-box-upload_text1">身份证人像面</view>
				</view>
				<view class="tui-box-upload_box2">
					<tui-upload class="upload-button" :value="value2" :serverUrl="serverUrl" @complete="result" @remove="remove" :forbidDel='forbidDel'></tui-upload>
					<view class="tui-box-upload_text2">身份证国徽面</view>
				</view>
			</view>
			<view class="tui-btn-box">
				<button class="confirm-btn" hover-class="tui-button-hover" formType="submit" type="primary" :disabled="isRealName">{{isRealName ? "您已经实名认证过了" : "开始验证"}}</button>
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
				realname: "",
				idcard: "",
				mobile: "",
				isInputFocus_1: false,
				isInputFocus_2: false,
				isInputFocus_3: false,
				imageData: [],
				serverUrl: App.uploadEditor, // 上传地址
				value1:[], // 初始化图片
				value2:[], // 初始化图片
				forbidDel: false,
				token: "",
				isRealName: false,
				u_info: {
					u_acc: ''
				}
			}
		},
		onLoad: function() {
			var that =this;
			that.sendRequest({
				method: "POST",
				url: App.Idrealuserinfo,
				success: res => {
					that.u_info.u_acc = res.data[0].u_acc;
					console.log(that.u_info.u_acc);
					if (res.data[0].u_auth === 1) {
						that.isRealName = true;
						this.showToast(3, '您已经实名认证过了!'); 
						that.u_info = res.data[0];
						that.forbidDel = true;
						that.value1.push(that.u_info.idcard_front_url);
						that.value2.push(that.u_info.idcard_back_url);
					}
				},
				fail:function(e){
					console.log("getchannel  fail:" + JSON.stringify(e));
				}
			});
		},
		methods: {
			// 信息反馈
			showToast: function(type, msg, msg2) {
				let params = { title: msg, imgUrl: "../../static/img/toast/check-circle.png", icon: true };
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
			formSubmit: function(e) {
				if (e.detail.value.name === "") {
					this.isInputFocus_1 = true
				} else if (e.detail.value.idcard === "") {
					this.isInputFocus_2 = true
				} else if (e.detail.value.mobile === "") {
					this.isInputFocus_3 = true
				}
				//表单规则
				let rules = [
					{
						name: "name",
						rule: ["required", "isChinese", "minLength:2", "maxLength:4"],
						msg: ["请输入姓名!", "姓名必须全部为中文!", "姓名必须2个或以上字符!", "姓名不能超过4个字符!"]
					},
					{
						name: "idcard",
						rule: ["required", "isIdCard"],
						msg: ["请输入身份证号码!", "请输入正确的身份证号码!"]
					},
					{
						name: "mobile",
						rule: ["required", "isMobile"],
						msg: ["请输入手机号!", "请输入正确的手机号!"]
					}
				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					if (this.imageData.length !== 2) {
						this.showToast(3, '请上传身份证件照片!');
					} else {
						if (this.imageData[0].indexOf("blob:") === -1 && this.imageData[1].indexOf("blob:") === -1) {
							var that =this;
							that.sendRequest({
								method: "POST",
								url: App.Idcardreal,
								data: {
									realname: that.realname,
									idcard: that.idcard,
									mobile: that.mobile,
									idcardf: that.imageData[0],
									idcardb: that.imageData[1]
								},
								success: (res) => {
									console.log(res);
									if(res.status!==200){
										this.showToast(2, res.msg);
									}else{
										uni.setStorageSync('user',1);
										this.showToast(1, res.msg);
										setTimeout(() => { uni.navigateBack() }, 1500);
									}
								},
								fail:function(e){
									console.log(e);
								}
							});
						} else {
							this.showToast(2, '请重新上传照片!');
						}
					}
				} else {
					this.showToast(3, checkRes);
				}
			},
			result: function(e) {
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				let index = e.index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.realName {
		padding: 40rpx;
	}
	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;	
		padding: 24rpx 60rpx 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 32rpx;
	}
	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}
	.tui-title {
		font-size: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}
	.tui-box-upload {
		width: 100%;
		height: 732rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		position: relative;
		justify-content: center;
		box-sizing: border-box;
		.tui-box-upload_image1{
			width: 544rpx;
			height: 346rpx;
			padding: 40rpx 0 0;
			margin: auto;
			box-sizing: border-box;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tui-box-upload_box1, .tui-box-upload_box2{
			position: relative;
			width: 100%;
			height: 346rpx;
			overflow: hidden;
		}
		.tui-box-upload_text1, .tui-box-upload_text2{
			z-index: 999;
			position: absolute;
			top: 50rpx;
			left: 350rpx;
			font-size: 40rpx;
			color: #FFF;
		}
	}
	.tui-btn-box {
		position: fixed;
		bottom: 40rpx;
		left: 40rpx;
		right: 40rpx;
		.confirm-btn{
			background-color: #9E2036;
		}
	}
	.tui-box-upload /deep/ .tui-upload-add{
		width: 544rpx;
		height: 306rpx;
		margin: 40rpx auto 0;
		border-radius: 20rpx;
		background-color: #EEE;
	}
	.tui-box-upload /deep/ .tui-image-item{
		width: 544rpx;
		height: 306rpx;
		margin: 40rpx auto 0;
		border-radius: 20rpx;
		background-color: #F7F7F7;
	}
	.tui-box-upload /deep/ .tui-item-img{
		width: 544rpx;
		height: 306rpx;
	}
</style>

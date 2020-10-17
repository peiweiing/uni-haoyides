<template>
	<view class="distribution">
		<view class="top_img">
			<image src="../../static/tp/tp.png" mode="widthFix"></image>
			<view class="top_box">
				<view class="top_box_1" style="border-right: 2rpx solid #EEE;">
					<view class="top_box_1_top">{{(+info.u_com).toFixed(2)}}</view>
					<view class="top_box_1_bottom">累计佣金</view>
				</view>
				<view class="top_box_1">
					<view class="top_box_1_top">{{(+info.ua_goodsvalue).toFixed(2)}}</view>
					<view class="top_box_1_bottom">累计商品值</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="content_title">我的团队</view>
			<view class="content_box">
				<view class="content_box_1" style="border-right: 2rpx solid #EEE;">
					<view class="content_box_1_top">{{info.u_level_totalnum}}</view>
					<view class="content_box_1_bottom">团队人数</view>
				</view>
				<view class="content_box_1" style="border-right: 2rpx solid #EEE;">
					<view class="content_box_1_top">{{info.level_acctive_total}}</view>
					<view class="content_box_1_bottom">今日活跃</view>
				</view>
				<view class="content_box_1" style="border-right: 2rpx solid #EEE;">
					<view class="content_box_1_top">{{info.level_effect_total}}</view>
					<view class="content_box_1_bottom">今日达标</view>
				</view>
				<view class="content_box_1">
					<view class="content_box_1_top">{{info.u_retailer_level}}</view>
					<view class="content_box_1_bottom">团队级别</view>
				</view>
			</view>
			<view class="content_bottom">
				<view class="content_bottom_1" @click="readyShare">
					<image src="../../static/tp/yj.png" mode="widthFix"></image>
					<text class="content_bottom_text">发起拼购</text>
				</view>
				<view class="content_bottom_1" @click="nav('./reward')">
					<image src="../../static/tp/yf.png" mode="widthFix"></image>
					<text class="content_bottom_text">拼购奖励</text>
				</view>
				<view class="content_bottom_1" @click="nav('./teamManage')">
					<image src="../../static/tp/yr.png" mode="widthFix"></image>
					<text class="content_bottom_text">团队管理</text>
				</view>
				<view class="content_bottom_1" @click="nav('./history')">
					<image src="../../static/tp/ye.png" mode="widthFix"></image>
					<text class="content_bottom_text">历史交易</text>
				</view>
			</view>
		</view>
		<!-- 背景蒙版 -->
		<view class="share" v-if="isShare" @click="isShare = false"></view>
		<!-- 分享弹出 -->
		<view class="share_box" v-if="isShare">
			<image :src="imageUrl" mode="widthFix"></image>
			<!-- 分享按钮 -->
			<view class="share_btn">
				<tui-button class="share_btn_1" shape="circle" type="white" @click="share">点击立即分享</tui-button>
			</view>
		</view>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import App from '../../App.vue';
	
	export default {
		data() {
			return {
				isShare: false,
				imageUrl: '',
				imageLocal: '',
				info: {
					u_retailer_level: '一般',
					level_acctive_total: 0,
					level_effect_total: 0,
					u_level_totalnum: 0,
					u_com: '00',
					ua_goodsvalue: '00.00'
				}
			}
		},
		onLoad: async function() {
			const showsharedata_res = await this.showsharedata();
			if (showsharedata_res.status === 200 && showsharedata_res.data.length !== 0 && !!showsharedata_res.data) {
				this.info = showsharedata_res.data;
			} else {
				 this.showToast(3, '系统出错了!请重试!');
			};
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
			// 发起分享
			readyShare: async function() {
				this.isShare = true;
				var _this = this;
				if (_this.imageUrl === '') {
					const shareimg_res = await _this.shareimg();
					if (shareimg_res.status === 200 && !!shareimg_res.data) {
						_this.imageUrl = shareimg_res.data.image;
						uni.downloadFile({
							url: _this.imageUrl,
							success: (res) => { _this.imageLocal = res.tempFilePath; },
							fail: (err) => { _this.showToast(2, '系统出错了!请重试!'); }
						});
					} else { _this.showToast(2, '系统出错了!请重试!'); };
				};
			},
			// 分享
			share: function() {
				uni.shareWithSystem({
					type: 'image',
					summary: '分享',
					imageUrl: this.imageLocal,
					success: () => { this.showToast(1, '分享成功!'); },
					fail: () => { this.showToast(2, '抱歉!分享失败!'); }
				});
			},
			// 跳转页面
			nav: function(url) { uni.navigateTo({ url }); },
			// 获取分享图片
			shareimg: async function() {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.shareimg,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 获取分销中心
			showsharedata: async function(type) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.showsharedata,
						data: { type },
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.distribution{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFF;
	}
	.top_img{
		position: relative;
		width: 100%;
		font-size: 0;
		image{ width: 100%; }
		.top_box{
			position: absolute;
			bottom: -100rpx;
			left: 40rpx;
			right: 40rpx;
			height: 200rpx;
			display: flex;
			font-size: 32rpx;
			box-sizing: border-box;
			border-radius: 40rpx;
			background-color: #FFF;
			box-shadow: 0rpx 0rpx 20rpx #EEE;
			.top_box_1{
				flex: 1;
				margin: 20rpx 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				.top_box_1_top{
					font-size: 68rpx;
					color: #E3372B;
					box-sizing: border-box;
				}
				.top_box_1_bottom{
					font-size: 28rpx;
					color: #666;
					box-sizing: border-box;
				}
			}
		}
	}
	.content{
		margin-top: 100rpx;
		padding: 0 40rpx;
		.content_title{
			padding-top: 40rpx;
			padding-bottom: 20rpx;
			font-size: 36rpx;
			color: #666;
		}
		.content_box{
			display: flex;
			font-size: 32rpx;
			box-sizing: border-box;
			border-radius: 40rpx;
			background-color: #FFF;
			box-shadow: 0rpx 0rpx 20rpx #EEE;
			.content_box_1{
				flex: 1;
				margin: 20rpx 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				.content_box_1_top{
					font-size: 34rpx;
					color: #E3372B;
					margin-bottom: 10rpx;
					box-sizing: border-box;
				}
				.content_box_1_bottom{
					font-size: 26rpx;
					color: #666;
					box-sizing: border-box;
				}
			}
		}
		.content_bottom{
			display: flex;
			flex-wrap: wrap;
			margin: 40rpx 0;
			.content_bottom_1{
				width: 50%;
				position: relative;
				image{ width: 100%; }
				.content_bottom_text{
					position: absolute;
					top: 50%;
					left: 50%;
					font-size: 40rpx;
					color: #666;
					margin-left: -80rpx;
					margin-top: -26rpx;
				}
			}
		}
	}
	.share{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		opacity: 0.3;
	}
	.share_box{
		z-index: 999;
		position: fixed;
		width: 500rpx;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		border-radius: 20rpx;
		background-color: #FFF;
		box-shadow: 0rpx 0rpx 20rpx #EEE;
		font-size: 0;
		image{
			width: 100%;
			border-radius: 20rpx;
		}
	}
	.share_btn{
		position: absolute;
		bottom: -120rpx;
		left: 50rpx;
		right: 50rpx;
	}
</style>

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
		<view class="share" v-if="isShare" @click="mengban">
			<!-- 分享弹出 -->
			<view class="share_box">
				<view class="share_image">
					<image :src="imageUrl" mode="widthFix"></image>
				</view>
				<view class="share_btn" @click="share('图片')">点 击 分 享 二 维 码</view>
				<scroll-view scroll-x class="share_url">{{shareUrl}}</scroll-view>
				<view class="share_btn" @click="share('链接')">点 击 分 享 链 接</view>
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
				shareUrl: '',
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
				 this.showToast(6, '网络繁忙 请重试', '分销中心数据拉取失败');
			};
		},
		methods: {
			// 信息反馈
			showToast: function(type, msg, msg2) {
				let params = { title: msg, content: '', imgUrl: '', icon: true };
				switch (type) {
					case 1: params.title = msg; params.imgUrl = "../../static/img/toast/check-circle.png"; break;
					case 2: params.title = msg; params.imgUrl = "../../static/img/toast/fail-circle.png"; break;
					case 3: params.title = msg; params.imgUrl = "../../static/img/toast/info-circle.png"; break;
					case 4: params.title = msg; params.icon = false; break;
					case 5: params.title = msg; params.content = msg2; params.imgUrl = "../../static/img/toast/check-circle.png"; break;
					case 6: params.title = msg; params.content = msg2; params.imgUrl = "../../static/img/toast/fail-circle.png"; break;
					case 7: params.title = msg; params.content = msg2; params.imgUrl = "../../static/img/toast/info-circle.png"; break;
					default: break;
				}
				this.$refs.toast.show(params)
			},
			// 跳转页面
			nav: function(url) { uni.navigateTo({ url }); },
			// 背景蒙版
			mengban: function() { this.isShare = false; },
			// 发起分享
			readyShare: function() {
				this.isShare = true;
				if (this.imageUrl === '') { this.shareimgAjax(); };
			},
			// 拉取手机分享
			share: function(num) {
				this.isShare = false;
				if (num === '图片') {
					uni.shareWithSystem({
						type: 'image',
						summary: '分享二维码',
						imageUrl: this.imageLocal,
						success: () => {},
						fail: () => {}
					});
				} else if (num === '链接') {
					uni.shareWithSystem({
						summary: this.shareUrl,
						success: () => {},
						fail: () => {}
					});
				};
			},
			// 加载分享图片
			shareimgAjax: async function() {
				const shareimg_res = await this.shareimg();
				if (shareimg_res.status === 200 && !!shareimg_res.data) {
					this.shareUrl = shareimg_res.data.reg_url;
					this.imageUrl = shareimg_res.data.image;
					uni.downloadFile({
						url: this.imageUrl,
						success: res => { this.imageLocal = res.tempFilePath; },
						fail: err => { this.showToast(6, '二维码保存失败', '请重试'); }
					});
				} else {
					this.showToast(6, '二维码获取失败', '请重试');
				};
			},
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
			// 获取分销中心数据
			showsharedata: async function() {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.showsharedata,
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
	
	
	
	// 分享蒙版
	.share{
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.share_box{
		width: 500rpx;
		.share_image{
			box-sizing: border-box;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 20rpx #EEE;
			font-size: 0;
			overflow: hidden;
			image{
				width: 100%;
			}
		}
		.share_url{
			padding: 0 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			font-size: 32rpx;
			color: #999;
			white-space:nowrap;
			box-shadow: 0rpx 0rpx 20rpx #EEE;
			background-color: #FFF;
		}
		.share_btn{
			margin: 40rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			box-sizing: border-box;
			border-radius: 40rpx;
			font-size: 32rpx;
			background-color: #FFF;
			box-shadow: 0rpx 0rpx 20rpx #EEE;
		}
	}
</style>

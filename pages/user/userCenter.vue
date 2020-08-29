<template>
	<view class="boxcs">
		<view class="tui-mybg-box">
			<view class="tui-header-center">
				<view class="header_image">
					<image :src="userInfo.u_avatar" class="tui-avatar"></image>
				</view>
				<view class="tui-info">
					<view class="tui-nickname">
						{{userInfo.u_nickname}}
						<image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image>
					</view>
					<view class="tui-explain">这家伙很懒…</view>
				</view>
				<view class="tui-btn-edit">
					<tui-button
					type="white"
					:plain="true"
					shape="circle"
					width="128rpx"
					height="40rpx"
					:size="22"
					@click="goRealName"
					>
					实名认证</tui-button>
				</view>
			</view>
		</view>
		<view class="tui-content-box">
			<view class="tui-box tui-order-box">
				<view class="tui-order-list">
					<view class="tui-order-item">
						<view class="tui-icon-box">
							￥{{userInfo.bal_trades}}
						</view>
						<view class="tui-order-text">总资产</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-icon-box">
							{{userInfo.bal_point}}
						</view>
						<view class="tui-order-text">总库存</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-icon-box">
							{{userInfo.g_inv}}
						</view>
						<view class="tui-order-text">锁定库存</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-icon-box">
							{{userInfo.g_lockinv}}
						</view>
						<view class="tui-order-text">积分</view>
					</view>
				</view>
				<tui-list-cell class="balance">
					<view class="balance_text">账户余额：
						<text class="balance_textNum">￥{{userInfo.bal_trades}}</text>
					</view>
					<view>
						<tui-button class="tui-btn-balance">充值</tui-button>
					</view>
					<view>
						<tui-button class="tui-btn-balance">提现</tui-button>
					</view>
				</tui-list-cell>
				<tui-list-cell class="yesterday_detail" :arrow="true">
					<text class="yesterday_text">昨日收益</text>
					<text class="yesterday_text yesterday_text_center">+99.99</text>
					<text class="yesterday_text">分销收益明细</text>
				</tui-list-cell>
			</view>
			<tui-grid>
				<block v-for="(item,index) in dataList" :key="index">
					<tui-grid-item :cell="3" @click="details(item.url)" class="tui-grid-item">
						<view class="tui-grid-icon">
							<tui-icon :name="item.name" :size="item.size" :color="item.color"></tui-icon>
						</view>
						<text class="tui-grid-label">{{item.title}}</text>
					</tui-grid-item>
				</block>
			</tui-grid>
				<image style="width: 100%;height: 200rpx;" src="../../static/img/userimg.png" mode=""></image>
			<tui-list-cell @click="detail" :arrow="true">
				<view class="tui-item-box">
					<tui-icon name="position" :size="24" color="#ff7900"></tui-icon>
					<text class="tui-list-cell_name">修改地址</text>
				</view>
			</tui-list-cell>
			<tui-list-cell @click="detail" :arrow="true">
				<view class="tui-item-box">
					<tui-icon name="setup" :size="24" color="#5677fc"></tui-icon>
					<view class="tui-list-cell_name">修改密码</view>
				</view>
			</tui-list-cell>
		</view>
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				userInfo: {
					bal_point: "00.00",
					bal_trades: "00.00",
					g_inv: 0,
					g_lockinv: 0,
					u_avatar: "../../static/img/headerImg.jpg",
					u_nickname: "呼噜猪zzZ ",
				},
				dataList: [
					{name: "wallet",title: "我的库存",color: "#9E2036",size: 30,url:"pickupProgress"},
					{name: "feedback",title: "资金流水",color: "#9E2036",size: 30,url:""},
					{name: "nodata",title: "积分流水",color: "#9E2036",size: 30,url:""}
				],
				banner: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
				current: 0
			}
		},
		onLoad: function() {
			uni.request({
				method: "POST",
				url: App.index,
				success: res => {
					console.log(res.data.data)
					const data = res.data.data[0]
					// this.userInfo = res.data.data[0]
					data.bal_point ? this.userInfo.bal_point = data.bal_point : ''
					data.bal_trades ? this.userInfo.bal_trades = data.bal_trades : ''
					data.g_inv ? this.userInfo.g_inv = data.g_inv : ''
					data.g_lockinv ? this.userInfo.g_lockinv = data.g_lockinv : ''
					data.u_avatar ? this.userInfo.u_avatar = data.u_avatar : ''
					data.u_nickname ? this.userInfo.u_nickname = data.u_nickname : ''
				}
			})
		},
		methods: {
			change: function(e) {
				this.current = e.detail.current;
			},
			details: function(e) {
				console.log(e)
				uni.navigateTo({
					url: '/pages/user/'+e
				});
			},
			goRealName: function() {
				uni.navigateTo({
					url: "./realName"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width:100%;
		height:100%;
		background:rgba(238,238,238,1);
	}
	.tui-icon-box {
		position: relative;
		font-size: 38rpx;
		color: #8B8B8B;
		font-weight: lighter;
	}
	.boxcs{
		background-color: #fff;
	}
	.tui-mybg-box {
		width: 100%;
		height: 280rpx;
		position: relative;
		background-color: #9E2036;
	}
	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 40rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.header_image{
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
		.tui-avatar{
			width: 100%;
			height: 100%;
		}
	}
	/* .tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
	} */
	.tui-info {
		width: 60%;
		padding-left: 30rpx;

	}
	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}
	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}
	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}
	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -72rpx;
		z-index: 10;
	}
	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}
	.tui-order-list {
		width: 100%;
		height: 140rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tui-order-item {
		height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.tui-order-text {
		font-size: 24rpx;
		color: #FF0000;
		font-weight: bold;
	}
	.tui-tool-box {
		margin-top: 20rpx;
	}
	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}
	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}
	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}
	.balance{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.tui-btn-balance{
		width: 100rpx !important;
		height: 60rpx !important;
		line-height: 60rpx !important;
	}
	.center_swiper{
		width: 100%;
		margin: 20rpx 0;
		padding: 20rpx 0;
		border-radius: 6rpx;
		background-color: #FFF;
	}
	.balance_text{
		font-size: 30rpx;
		color: #999;
	}
	.balance_textNum{
		font-size: 40rpx;
		font-weight: lighter;
	}
	.yesterday_detail{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.yesterday_text{
		font-size: 24rpx;
		color: #FF0000;
		font-weight: bold;
	}
	.yesterday_text_center{
		font-size: 30rpx;
		font-weight: lighter;
	}
	.tui-title {
		padding: 50rpx 30rpx 30rpx 30rpx;
		font-size: 32rpx;
		color: #333;
		box-sizing: border-box;
		font-weight: bold;
		clear: both;
	}
	.tui-grid-icon {
		width: 64rpx;
		height: 64rpx;
		margin: 0 auto;
		text-align: center;
		vertical-align: middle;
	}
	.tui-grid-label {
		display: block;
		text-align: center;
		font-weight: 400;
		color: #999;
		font-size: 24rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10rpx;
	}
	.tui-grid-label-5 {
		margin-top: 0 !important;
		color: #8a5966 !important;
	}
	.tui-item-box{
		display: flex;
		align-items: center;
	}
	.tui-list-cell_name{
		padding-left: 10rpx;
	}
</style>

<template>
	<view class="boxcs">
		<view class="tui-mybg-box">
			<view class="tui-header-center">
				<view class="header_image">
					<!-- <image :src="userInfo.u_avatar" class="tui-avatar" v-if="userInfo.u_avatar"></image> -->
					<image src="../../static/img/touxiang.png" class="tui-avatar"></image>
				</view>
				<view class="tui-info">
					<view class="tui-nickname">
						{{userInfo.u_acc}}
						<!-- <image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image> -->
					</view>
					<!-- <view class="tui-explain">这家伙很懒…</view> -->
				</view>
				<view class="">
					
				</view>
				<view class="FX-c FY-c">
					<tui-button
					class="tui-bor"
					type="white"
					:plain="true"
					width="160rpx"
					height="60rpx"
					:size="28"
					@click="navigateTo('./realName')"
					>
					实名认证
					</tui-button>
					<view class="" style="color: #fff; margin-left: -20rpx; font-size: 16px;">
						>
					</view>
					<!-- <tui-list-cell class="yesterday_detail" :arrow="true" style="width: 10%;padding: 0;">	 -->
					<!-- <tui-list-cell class="yesterday_detail" style="width: 10%;padding: 0;">	
					</tui-list-cell> -->
				</view>
			</view>
			
			<view class="tui-order-list tui-one">
				<view class="tui-order-item FY">
					<view class="tui-order-text FY-c">总资产(元)
						<image style="width: 40rpx;height: 36rpx;margin-left: 10rpx;" src="../../static/img/show.png" v-if="property" @click="proper"></image>
						<image style="width: 40rpx;height: 36rpx;margin-left: 10rpx;" src="../../static/img/hide.png" v-else @click="propers"></image>
					</view>
					<view class="tui-icon-box" v-if="propertys">{{(+userInfo.total_acc).toFixed(2)}}</view>
					<view class="tui-icon-box" v-else>*****</view>
				</view>
			</view>
			
			<view class="tui-order-list tui-two">
				<view class="tui-order-item">
					<view class="tui-order-text">总库存</view>
					<view class="tui-icon-box">
						{{userInfo.total_inv}}
					</view>
				</view>
				<view class="tui-order-item">
					<view class="tui-order-text">锁定库存</view>
					<view class="tui-icon-box">
						{{userInfo.g_lockinv}}
					</view>
				</view>
				<view class="tui-order-item">
					<view class="tui-order-text">商品值</view>
					<view class="tui-icon-box">
						{{userInfo.bal_point}}
					</view>
				</view>
			</view>
		</view>
		<view class="tui-content-box">
			
			<view class="tui-box tui-order-box">
				<view class="tui-boxcs">
					<view class="balance" style="width: 50%;">
						<view class="balance_text">账户余额(元)
							<text class="balance_textNum" v-if="propertys">{{(+userInfo.bal_trades).toFixed(2)}}</text>
							<text class="balance_textNum" v-else>*****</text>
						</view>
					</view>
					<!-- <view class="yesterday_detail" :arrow="true"> -->
					<view class="tui-xian">
						
					</view>
					<view class="yesterday_detail" style="width: 50%;justify-content: space-around;">
						<view class="FY-c FX-c">
							<text class="yesterday_text">昨日收益</text>
							<text class="yesterday_text yesterday_text_center">+0.00</text>
						</view>
						<view class="FY-c FX-c">
							<text class="yesterday_text" @click="cashier()">分销收益明细</text>
							<tui-list-cell class="yesterday_detail" :arrow="true" style="width: 10%;">	
							</tui-list-cell>
						</view>
					</view>
				</view>
				
				<tui-list-cell class="balance" style="width: 100%;padding: 0 10% 4%;">
					<tui-button class="baone" shape="circle" width="180rpx" height="66rpx" :size="38" @click="navigateTo('./recharge')">充值</tui-button>
					<tui-button class="batwo" shape="circle" width="180rpx" height="66rpx" :size="38" @click="navigateTo('./withdrawal')">提现</tui-button>
				</tui-list-cell>
			</view>
			
			<tui-grid>
				<view v-for="(item,index) in dataList" :key="index" class="liuShui">
					<view :cell="3" @click="navigateTo(item.url)" class="tui-grid-item">
						<view class="tui-grid-icon">
							<tui-icon :name="item.name" :size="item.size" :color="item.color"></tui-icon>
						</view>
						<text class="tui-grid-label">{{item.title}}</text>
					</view>
				</view>
			</tui-grid>
				<image style="width: 100%;height: 200rpx;" src="../../static/img/20200914101930.jpg" mode=""></image>
			<tui-list-cell @click="navigateTo('./changeAddress')" :arrow="true">
				<view class="tui-item-box">
					<tui-icon name="position" :size="24" color="#ff7900"></tui-icon>
					<text class="tui-list-cell_name">收货地址</text>
				</view>
			</tui-list-cell>
			<tui-list-cell @click="navigateTo('./changePassword')" :arrow="true">
				<view class="tui-item-box">
					<tui-icon name="setup" :size="24" color="#5677fc"></tui-icon>
					<view class="tui-list-cell_name">修改密码</view>
				</view>
			</tui-list-cell>
			<tui-list-cell @click='openActionSheet' :arrow="true">
				<view class="tui-item-box">
					<tui-icon name="shut" :size="24" color="#FF0000"></tui-icon>
					<view class="tui-list-cell_name">退出登录</view>
				</view>
			</tui-list-cell>
		</view>
		<!-- 底部退出登录弹窗 -->
		<tui-actionsheet
		:show="showActionSheet"
		:tips="tips"
		:item-list="itemList"
		:mask-closable="maskClosable"
		:color="color"
		:size="size"
		:is-cancel="isCancel"
		@click="itemClick"
		@cancel="closeActionSheet"
		></tui-actionsheet>
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				property:true,
				propertys:true,
				mobile: "",
				userInfo: {
					bal_point: "00.00",
					bal_trades: "00.00",
					g_inv: 0,
					g_lockinv: 0,
					u_avatar: "../../static/img/headerImg.jpg",
					u_nickname: "",
					u_acc: "加载中...",
					total_acc: 0
				},
				dataList: [
					{name: "feedback",title: "资金流水",color: "#9E2036",size: 30,url:"./capital"},
					{name: "nodata",title: "积分流水",color: "#9E2036",size: 30,url:"./integral"}
				],
				banner: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
				current: 0,
				// 底部退出登录弹窗
				showActionSheet: false,
				maskClosable: true,
				tips: "退出登录会清除您的登录信息，确认退出吗？",
				itemList: [{ text: "退出登录", color: "#E3302D" }],
				color: "#9a9a9a",
				size: 26,
				isCancel: true
			}
		},
		onShow: function() {
			var that =this;
			that.sendRequest({
				method: "POST",
				url: App.index,
				success: res => {
					if (res.status === 200) {
						const data = res.data
						data.bal_point ? that.userInfo.bal_point = Number(data.bal_point).toFixed(2) : ''
						data.bal_trades ? that.userInfo.bal_trades = data.bal_trades : ''
						data.g_inv ? that.userInfo.g_inv = data.g_inv : ''
						data.g_lockinv ? that.userInfo.g_lockinv = data.g_lockinv : ''
						data.u_avatar ? that.userInfo.u_avatar = data.u_avatar : ''
						data.u_nickname ? that.userInfo.u_nickname = data.u_nickname : ''
						data.u_acc ? that.userInfo.u_acc = data.u_acc : ''
						data.total_acc ? that.userInfo.total_acc = data.total_acc : ''
						that.userInfo.total_inv = data.total_inv
					} else {
						this.showToast(res.msg)
					}
				}
			})
		},
		methods: {
			proper(){
				console.log("dianji")
				this.property=false;
				this.propertys=false;
			},
			propers(){
				console.log("dianji");
				this.property=true;
				this.propertys=true;
			},
			cashier(){
				// uni.navigateTo({
				// 	 url: "./cashier" 
				// });
			},
			// 信息反馈
			showToast: function(data) { uni.showToast({ title: data, icon: "none", mask: true }) },
			change: function(e) { this.current = e.detail.current; },
			details: function(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/user/'+e
				});
			},
			// 跳转页面
			navigateTo: function(url) { uni.navigateTo({ url }) },
			// 底部退出登录弹窗
			closeActionSheet: function() { this.showActionSheet = false; },
			openActionSheet: function() { this.showActionSheet = true; },
			itemClick: function(e) {
				let index = e.index;
				this.closeActionSheet();
				var _this = this;
				_this.sendRequest({
					method: "POST",
					url: App.logout,
					success: res => {
						if (res.status === 200) {
							uni.clearStorageSync();
							_this.showToast("退出成功！即将跳转至登录页面...");
							setTimeout(() => { uni.navigateTo({ url: "../login/login" }) }, 2000);
						} else {
							_this.showToast(res.msg + "操作失败！请重试...");
						}
					},
					fail: err => {
						_this.showToast(err.msg + "操作失败！请重试...");
					}
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
	.tui-one{
		margin-top: 6%;
		margin-bottom: 2%;
	}
	.tui-one .tui-icon-box {
		position: relative;
		font-size: 80rpx;
		color: #fff;
		font-weight: bold;
	}
	.tui-two .tui-icon-box{
		position: relative;
		font-size: 40rpx;
		color: #fff;
		font-weight: bold;
		margin-left: 6%;
	}
	.boxcs{
		background-color: #FFF;
		width: 100%;
	}
	.tui-mybg-box {
		width: 100%;
		height: 560rpx;
		// background-color: #9E2036;    
		background: url(/static/img/bgcimg.png) no-repeat;
		background-size: 100% 100%;
	}
	.tui-header-center {
		width: 100%;
		height: 128rpx;
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
		box-sizing: border-box;
		border: 4rpx solid #999999;
		.tui-avatar{
			width: 100%;
			height: 100%;
		}
	}
	.tui-bor:after{
		border: none!important;
	}
	.tui-info {
		width: 60%;
		padding-left: 40rpx;

	}
	.tui-nickname {
		font-size: 40rpx;
		font-weight: lighter;
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
	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-top: -20%;
		padding-bottom: 15%;
	}
	.tui-box {
		width: 100%;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 0 10rpx #ccc;
		
	}
	.tui-boxcs{
		display: flex;
		justify-content: space-between;
		padding: 4%;
	}
	.tui-xian{
		height: inherit;
		background: #ccc;
		width: 2px;
	}
	.tui-order-list {
		width: 100%;
		// height: 140rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tui-order-item {
		height: 100%;
		flex: 1;
		display: flex;
		align-items: baseline;
	}
	.tui-order-text {
		font-size: 26rpx;
		color: #ccc;
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
		width: 50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.baone{
		background-color: #E57441!important;
	}
	.batwo{
		background-color: #3FB887!important;
	}
	.tui-btn-balance{
		width: 100rpx !important;
		height: 60rpx !important;
		line-height: 60rpx !important;
	}
	.green_button{
		background-color: #07C160 !important;
	}
	.red_button{
		background-color: #9E2036 !important;
	}
	.center_swiper{
		width: 100%;
		margin: 20rpx 0;
		padding: 20rpx 0;
		border-radius: 6rpx;
		background-color: #FFF;
	}
	.balance_text{
		width: 100%;
		font-size: 30rpx;
		color: #999;
		display: flex;
		flex-direction: column;
	}
	.balance_textNum{
		font-size: 48rpx;
		font-weight: bold;
		color: #9D2137;
		width: 80%;
		overflow-x: auto;
	}
	.yesterday_detail{
		display: flex;
		flex-direction: column;
	}
	.yesterday_text{
		font-size: 26rpx;
		color: #999;
	}
	.yesterday_text_center{
		font-size: 32rpx;
		color: #9D2137;
	}
	.tui-title {
		padding: 50rpx 30rpx 30rpx 30rpx;
		font-size: 32rpx;
		color: #333;
		box-sizing: border-box;
		font-weight: bold;
		clear: both;
	}
	/deep/ .tui-grids{
		padding: 30rpx 0;
		display: flex !important;
		justify-content: space-around !important;
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
		font-size: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10rpx;
	}
	.tui-item-box{
		display: flex;
		align-items: center;
	}
	.tui-cell-hover{
		background-color: rgb(255,255,255)!important;
	}
	.tui-list-cell_name{
		padding-left: 20rpx;
		font-size: 34rpx;
	}
</style>

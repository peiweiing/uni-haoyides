<template>
	<view class="tradeCenter">
		<scroll-view scroll-y class="container">
			<view class="bgcImg"></view>
			<!--banner-->
			<view class="tui-banner-box">
				<swiper
					:indicator-dots="true"
					:autoplay="true"
					:interval="5000"
					:duration="150"
					class="tui-banner-swiper"
					:circular="true"
					previous-margin="30rpx"
					next-margin="30rpx"
				>
					<swiper-item v-for="(item, index) in banner" :key="index" class="tui-banner-item">
						<image
							:src="item"
							class="tui-slide-image"
							:class="[current != index ? 'tui-banner-scale' : '']"
							mode="scaleToFill"
							lazy-load
							@tap="swiper"
						/>
					</swiper-item>
				</swiper>
			</view>
			<!--banner-->
			<view class="divcs">
				<view class="tui-title">
					现货交易
				</view>
				<view class="xianhuo_1">
					<view v-for="(item,index) in dataList1" :key="index">
							<view :cell="3" @click="detail(item.url)" class="xianhuo_2">
								<view class="xianhuo_img">
									<image :src="item.imgUrl"></image>
								</view>
								<text class="xianhuo_text">{{item.title}}</text>
							</view>
						</view>
				</view>
			</view>
			<view class="divcs">
				<view class="tui-title">
					批发
				</view>
					<view class="pifa_1">
						<view v-for="(item,index) in dataList2" :key="index" style="flex: 1;">
							<view :cell="3" @click="detail(item.url)" class="pifa_2">
								<view class="pifa_img">
									<image :src="item.imgUrl"></image>
								</view>
								<text class="pifa_text">{{item.title}}</text>
							</view>
						</view>
					</view>
			</view>
			<view class="divcs">
				<view class="tui-title">
					我的库存
				</view>
				<view class="kucun_1">
					<view v-for="(item,index) in dataList4" :key="index" style="flex: 1;">
						<view :cell="3" @click="detail(item.url)" class="kucun_2">
							<view class="kucun_img">
								<image :src="item.imgUrl"></image>
							</view>
							<text class="kucun_text">{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 40rpx;"></view>
		</scroll-view>
	</view>
</template>

<script>
	import App from '../../App.vue';
	export default {
		data() {
			return {
				current: 0,
				banner: [],
				dataList1: [
					{imgUrl: "../../static/img/20200912135930.png",title:'买入',url:'entrustedPurchase'},
					{imgUrl: "../../static/img/maichu.png",title:'卖出',url:'consignmentSale'},
					{imgUrl: "../../static/img/0917095534.jpg",title:'提货',url:'pickupProgress'},
				],
				dataList2: [
					{imgUrl: "../../static/img/pifa.png",title:'批发买入',url:'wholesaleList'},
					{imgUrl: "../../static/img/mingxi.png",title:'批发明细',url:'wholesaleDetail'},
				],
				dataList4: [
					{imgUrl: "../../static/img/kucun.png",title:'现货库存',url:'xianHuo'},
					{imgUrl: "../../static/img/dongjie.png",title:'冻结库存',url:'dongJie'},
					{imgUrl: "../../static/img/users.png",title:'我的委托',url:'entrust'},
				],
			}
		},
		onShow: function() {
			var that = this;
			that.sendRequest({
				url :App.getlunbo,
				method:'POST',
				data: { ch_image_type: 2 },
				success : function(res){
					// console.log(res.data);
					that.banner = [];
					if (res.status === 200 && res.data.length !== 0 && res.data) {
						for (let i = 0; i < res.data.length; i++) {
							that.banner.push(res.data[i].ch_image);
						};
					};
				},
				fail:function(e){
					console.log(e);
				}
			});
		},
		methods: {		
			// change: function(e) {
			// 	this.current = e.detail.current;
			// 	console.log(this.current)
			// },
			swiper(e){
				console.log(e)
			},
			detail: function(e) {
				console.log(e)
				uni.navigateTo({
					url: '/pages/buy/'+e
				});
			},
			details: function(e) {
				this.tui.toast("click~");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tradeCenter{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-sizing: border-box;
		background-color: #EEE;
	}
.container {
	height: 100%;
	box-sizing: border-box;
	.bgcImg{
		height: 200rpx;
	}
	.divcs{
		background-color: #fff;
		margin: 5%;
		border-radius: 20rpx;
		.tui-grid{
			padding: 2%;
		}
		.tui-grids{
			border-radius: 20rpx;
		}
	}
	.xianhuo_1{
		display: flex;
		justify-content: space-around;
		padding: 20rpx 0;
	}
	.xianhuo_2{
		width: 200rpx;
		position: relative;
		.xianhuo_img{
			height: 100rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.xianhuo_text{
			position: absolute;
			top: 26rpx;
			left: 12rpx;
			font-size: 36rpx;
			color: #FFF;
			font-weight: lighter;
		}
	}
	.pifa_1{
		display: flex;
		padding: 40rpx 0;
	}
	.pifa_2{
		display: flex;
		align-items: center;
		box-sizing: border-box;
		border-right: 2rpx solid #EEE;
		justify-content: center;
		.pifa_img{
			width: 48rpx;
			height: 48rpx;
			margin-right: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.pifa_text{
			font-size: 32rpx;
		}
	}
	.pifa_1>view:last-child .pifa_2{
		border: none;
	}
	.kucun_1{
		display: flex;
		padding: 40rpx 0;
	}
	.kucun_2{
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		border-right: 2rpx solid #EEE;
		.kucun_img{
			width: 48rpx;
			height: 48rpx;
			margin-bottom: 10rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.kucun_text{
			font-size: 32rpx;
		}
	}
	.kucun_1>view:last-child .kucun_2{
		border: none;
	}
}

/*banner*/

.tui-banner-box {
	width: 100%;
	margin-top: -25%;
	box-sizing: border-box;
	/* background: #fff; */
}

.tui-banner-swiper {
	width: 100%;
	height: 170*2rpx;
}

.tui-banner-item {
	padding: 0 10rpx;
	box-sizing: border-box;
}
.tui-slide-image {
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 20rpx;
	/* transition: all 0.1s linear; */
}

.tui-banner-scale {
	// transform: scaleY(0.9);
	transform-origin: center center;
}

/* #ifdef MP-WEIXIN */
.tui-banner-swiper .wx-swiper-dot {
	width: 8rpx;
	height: 8rpx;
	display: inline-flex;
	background: none;
	justify-content: space-between;
}

.tui-banner-swiper .wx-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16rpx;
	overflow: hidden;
}

.tui-banner-swiper .wx-swiper-dot-active::before {
	background: #fff;
}

.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
	width: 16rpx;
}

/* #endif */

/* #ifndef MP-WEIXIN */
>>> .tui-banner-swiper .uni-swiper-dot {
	width: 8rpx;
	height: 8rpx;
	display: inline-flex;
	background: none;
	justify-content: space-between;
}

>>> .tui-banner-swiper .uni-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 16rpx;
	overflow: hidden;
}

>>> .tui-banner-swiper .uni-swiper-dot-active::before {
	background: #fff;
}

>>> .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
	width: 16rpx;
}

/* #endif */
/*banner*/

	.tui-title {
		// padding: 50rpx 30rpx 30rpx 30rpx;
		padding: 3%;
		font-size: 36rpx;
		color: #333;
		box-sizing: border-box;
		font-weight: bold;
		clear: both;
		border-bottom: 2rpx solid #EEE;
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
		color: #333;
		font-size: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10rpx;
	}
	.tui-grid-label-5 {
		margin-top: 0 !important;
		color: #8a5966 !important;
	}
	
</style>

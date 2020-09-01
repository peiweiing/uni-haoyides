<template>
	<view class="container">
		<view class="bgcImg">
			
		</view>
		<!--banner-->
		<view class="tui-banner-box">
			<swiper
				:indicator-dots="true"
				:autoplay="true"
				:interval="5000"
				:duration="150"
				class="tui-banner-swiper"
				:circular="true"
				previous-margin="60rpx"
				next-margin="60rpx"
			>
				<swiper-item v-for="(item, index) in banner" :key="index" class="tui-banner-item">
					<!-- <image
						:src="'https://thorui.cn/images/mall/banner/' + item"
						class="tui-slide-image"
						:class="[current != index ? 'tui-banner-scale' : '']"
						mode="scaleToFill"
						lazy-load
						@tap="detail"
					/> --><image
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
				现货
			</view>
			<tui-grid>
				<block v-for="(item,index) in dataList1" :key="index">
					<tui-grid-item :cell="3" @click="detail(item.url)">
						<view class="tui-grid-icon">
							<tui-icon :name="item.name" :size="item.size" :color="item.color"></tui-icon>
						</view>
						<text class="tui-grid-label">{{item.title}}</text>
					</tui-grid-item>
				</block>
			</tui-grid>
		</view>
		
		<view class="divcs">
			<view class="tui-title">
				委托
			</view>
			<tui-grid>
				<block v-for="(item,index) in dataLists" :key="index">
					<tui-grid-item :cell="3" @click="detail(item.url)">
						<view class="tui-grid-icon">
							<tui-icon :name="item.name" :size="item.size" :color="item.color"></tui-icon>
						</view>
						<text class="tui-grid-label">{{item.title}}</text>
					</tui-grid-item>
				</block>
			</tui-grid>
		</view>
			
		<view class="divcs">
			<view class="tui-title">
				批发
			</view>
			<tui-grid>
				<block v-for="(item,index) in dataList2" :key="index">
					<tui-grid-item :cell="3" @click="detail(item.url)">
						<view class="tui-grid-icon">
							<tui-icon :name="item.name" :size="item.size" :color="item.color"></tui-icon>
						</view>
						<text class="tui-grid-label">{{item.title}}</text>
					</tui-grid-item>
				</block>
			</tui-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				// banner: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
				banner: ['../../static/img/swiper01.jpg', '../../static/img/swiper02.jpg'],
				dataList1: [
					{name: "unreceive",size: 30,title:'现货买入',color: "#9E2036",url:'distGoodsList'},
				],
				dataList2: [
					{name: "cart",size: 30,title:'批发买入',color: "#9E2036",url:'wholesaleList'},
				],
				dataLists: [
					{name: "member",size: 30,title:'委托买入',color: "#9E2036",url:'entrustedPurchase'},
					{name: "wealth",size: 30,title:'委托卖出',color: "#9E2036",url:'consignmentSale'},
					{name: "share",size: 30,title:'我的委托',color: "#9E2036",url:'entrust'},
					{name: "bankcard",size: 30,title:'摘牌买入',color: "#9E2036",url:'EntrusBuyList'},
					{name: "redpacket",size: 30,title:'摘牌卖出',color: "#9E2036",url:'entrusSellList'},
				],
			}
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
.container {
	min-height: calc(100vh);
	padding-bottom: 2%;
	box-sizing: border-box;
	background-color: #EDEDED;
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
	height: 240rpx;
}

.tui-banner-item {
	padding: 0 16rpx;
	box-sizing: border-box;
}

.tui-slide-image {
	width: 100%;
	height: 240rpx;
	display: block;
	border-radius: 12rpx;
	/* transition: all 0.1s linear; */
}

.tui-banner-scale {
	transform: scaleY(0.9);
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
		padding: 2%;
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

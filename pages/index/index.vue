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
				@change="change"
			>
				<swiper-item v-for="(item, index) in banner" :key="index" class="tui-banner-item">
					<image
						:src="'https://thorui.cn/images/mall/banner/' + item"
						class="tui-slide-image"
						:class="[current != index ? 'tui-banner-scale' : '']"
						mode="scaleToFill"
						lazy-load
						@tap="detail"
					/>
				</swiper-item>
			</swiper>
		</view>
		<!--banner-->
		
		<view class="tui-rolling-news">
			<tui-icon name="news-fill" :size='28' color='#5677fc'></tui-icon>
			<swiper vertical autoplay circular interval="3000" class="tui-swiper">
				<swiper-item v-for="(item,index) in newsList" :key="index" class="tui-swiper-item">
					<view class="tui-news-item" @tap='newdetail'>{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="tui-product-box">
			<view class="tui-block__box tui-mtop__20">
				<view class="tui-group-name" @tap="more">
					<view>
						<text>排行榜</text>
						<text class="tui-sub__desc">大家都在买</text>
					</view>
					<view class="tui-more__box">
						<text>更多</text>
						<tui-icon name="arrowright" :size="36" unit="rpx" color="#999"></tui-icon>
					</view>
				</view>
				<view class="tui-new-box">
					<view class="tui-new-item" :class="[index != 0 && index != 1 ? 'tui-new-mtop' : '']" v-for="(item, index) in newProduct"
					 :key="index" @tap="details">
						<image :src="'/static/images/mall/new/' + (item.type == 1 ? 'new' : 'discount') + '.png'" class="tui-new-label"
						 v-if="item.isLabel"></image>
						<view class="tui-title-box">
							<view class="tui-new-title">{{ item.name }}</view>
							<view class="tui-new-price FY-c">
								<text class="tui-new-present">￥{{ item.present }}</text>
								<text class="tui-new-original">￥{{ item.original }}</text>
							</view>
						</view>
						<image :src="'/static/images/mall/new/' + item.pic" class="tui-new-img"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="tui-product-box">
			<view class="tui-title__img">
				<image src="../../static/img/goodslist.png" mode="widthFix"></image>
			</view>
			<view class="tui-product-list">
				<view class="tui-product-container">
					<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 != 0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="details">
							<image :src="'/static/images/mall/product/' + item.img + '.jpg'" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.sale }}</text>
										<text class="tui-factory-price">￥{{ item.factory }}</text>
									</view>
									<view class="tui-pro-pay FX-sa">
										<tui-button type="green" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="detail">买入</tui-button>
										<tui-button type="tomato" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="detail">卖出</tui-button>
									</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
						<!-- <template is="productItem" data="{{item,index:index}}" /> -->
					</block>
				</view>
				<view class="tui-product-container">
					<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 == 0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="details">
							<image :src="'/static/images/mall/product/' + item.img + '.jpg'" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{ item.name }}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.sale }}</text>
										<text class="tui-factory-price">￥{{ item.factory }}</text>
									</view>
									<view class="tui-pro-pay FX-sa">
										<tui-button type="green" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="detail">买入</tui-button>
										<tui-button type="tomato" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="detail">卖出</tui-button>
									</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
			</view>
		</view>
		
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<!-- <tui-nomore v-if="!pullUpOn"></tui-nomore> -->
		<!--加载loadding-->
		<view class="tui-safearea-bottom"></view>
	</view>
</template>

<script>
	import App from '../../App.vue'

	export default {
		data() {
			return {
				current: 0,
				banner: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
				newsList: [
					"致力发展负责任的人工智能 中国发布八大治理原则",
					"格兰仕暗示拜访拼多多后遭天猫打压，拼多多高层赞其有勇气",
					"阿里计划将每股普通股拆为8股，增加筹资灵活性"
				],
				newProduct: [
					{name: '时尚舒适公主裙高街修身长裙',present: 198,original: 298,pic: '1.jpg',type: 1,isLabel: true},
					{name: '高街修身雪纺衫',present: 398,original: 598,pic: '2.jpg',type: 2,isLabel: true}
				],
				productList: [
					{img: 1,name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',sale: 599,factory: 899,payNum: 2342},
					{img: 2,name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',sale: 29,factory: 69,payNum: 999},
					{img: 3,name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',sale: 299,factory: 699,payNum: 666},
					{img: 4,name: '百雀羚套装女补水保湿护肤品',sale: 1599,factory: 2899,payNum: 236},
					{img: 5,name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',sale: 599,factory: 899,payNum: 2399}
				],
			}
		},
		onLoad() {

		},
		methods: {	
			change: function(e) {
				this.current = e.detail.current;
			},
			detail: function() {
				uni.navigateTo({
					url: '/pages/template/mall/productDetail/productDetail'
				});
			},
			newdetail(e) {
				this.tui.toast('详情功能尚未完善~')
			},
			more: function(e) {
				let key = e.currentTarget.dataset.key || '';
				uni.navigateTo({
					url: '../productList/productList?searchKey=' + key
				});
			},
			details: function() {
				uni.navigateTo({
					url: '../list/distGoodsDetail'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.container {
	min-height: calc(100vh);
	padding-bottom: 100rpx;
	box-sizing: border-box;
	background-color: #EDEDED;
	.bgcImg{
		height: 320rpx;
	}
	.divcs{
		background-color: #fff;
		margin: 5%;
		border-radius: 20rpx;
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
	height: 100%;
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


	.tui-rolling-news {
		width: 100%;
		margin: 6% 0;
		padding: 4% 2%;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.tui-swiper {
		font-size: 28rpx;
		height: 50rpx;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center
	}

	.tui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}



	.tui-product-box {
		margin-top: 20rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
	}
	.tui-title__img {
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		justify-content: center;
	}
	.tui-title__img image {
		width: 352rpx;
		height: 32rpx;
	}
	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		/* padding-top: 20rpx; */
	}
	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}
	.tui-product-container:last-child {
		margin-right: 0;
	}
	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}
	.tui-pro-img {
		width: 100%;
		display: block;
	}
	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}
	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.tui-pro-price {
		padding-top: 18rpx;
	}
	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}
	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}
	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
	.tui-block__box {
		width: 100%;
		padding: 0 25rpx 25rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.tui-mtop__20 {
		margin-top: 20rpx;
	}
	.tui-group-name {
		width: 100%;
		font-size: 34rpx;
		line-height: 34rpx;
		font-weight: bold;
		text-align: center;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
	}

	.tui-sub__desc {
		color: #34c7a9;
		font-size: 28rpx;
		font-weight: 400;
		padding-left: 25rpx;
	}
	.tui-more__box {
		display: flex;
		align-items: center;
		font-weight: 400;
		color: #999;
	}
	.tui-new-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.tui-new-item {
		width: 49%;
		height: 180rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #f5f2f9;
		position: relative;
		border-radius: 12rpx;
	}
	.tui-new-label {
		width: 56rpx;
		height: 56rpx;
		border-top-left-radius: 12rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
	.tui-new-mtop {
		margin-top: 2%;
	}
	.tui-title-box {
		font-size: 24rpx;
	}
	.tui-new-title {
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.tui-new-price {
		padding-top: 18rpx;
	}
	.tui-new-present {
		color: #ff201f;
		font-weight: bold;
	}
	.tui-new-original {
		display: inline-block;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
		transform: scale(0.8);
		transform-origin: center center;
	}
	.tui-new-img {
		width: 148rpx;
		height: 148rpx;
		display: block;
		flex-shrink: 0;
	}
</style>

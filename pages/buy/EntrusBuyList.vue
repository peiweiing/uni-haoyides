<template>
	<view class="container">
		<view class="product-list">
			<!--商品列表-->
			<view class="pro-item" @tap="detail" v-for="(item,index) in productList" :key="index">
				<image :src="'/static/images/product/'+item.img+'.jpg'" class="pro-img" mode="widthFix" />
				<view class="pro-content">
					<view class="pro-tit">{{item.name}}</view>
					<view>
						<view class="pro-price">
							<text class="sale-price">￥{{item.sale}}</text>
							<text class="factory-price">￥{{item.factory}}</text>
						</view>
						<view class="btn-box FX-fe">
							<tui-button type="tomato" plain shape="rightAngle" width="100rpx" height="50rpx" :size="24" @click="showModal">买入</tui-button>
						</view>
						<!-- <view class="btn-box">
							<tui-button shape="circle" shadow @click="showModal">从底部弹出</tui-button>
						</view> -->
					</view>
				</view>
			</view>
			<!--商品列表-->
		</view>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
		
		<!--底部抽屉-->
		<tui-bottom-popup :show="bottomPopup" @close="hideModal">
			<view class="region-box">
				<view
					class="region-txt"
					:class="[index == regionArr.length - 3 || index == regionArr.length - 2 || index == regionArr.length - 1 ? 'grow' : '', tabIndex == index ? 'active' : '']"
					v-for="(item, index) in regionArr"
					:key="index"
					:data-index="index"
				>
					<text class="w40">{{ item }}</text>
				</view>
				<view class="FX-sb w100">
					<tui-button type="green" width="280rpx" height="90rpx" :size="32" @click="cancel">取消</tui-button>
					<tui-button type="bronze" width="280rpx" height="90rpx" :size="32" @click="confirm">确定</tui-button>
				</view>
			</view>
		</tui-bottom-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageIndex: 1,
				bottomPopup: false,
				productList: [
					{img: 1,name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',sale: 599,factory: 899,payNum: 2342},
					{img: 2,name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',sale: 29,factory: 69,payNum: 999},
					{img: 3,name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',sale: 299,factory: 699,payNum: 666},
					{img: 4,name: '百雀羚套装女补水保湿护肤品',sale: 1599,factory: 2899,payNum: 236},
					{img: 5,name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',sale: 599,factory: 899,payNum: 2399}
				],
				regionArr: [
					'陆羽经云南茶叶','编码:16888802','批发价:¥130.00','批发资格:2份','买入数量：2份','合计:¥260.00',
				],
				regionTxt: '粤',
				tabIndex: 26,
				loadding: false,
				pullUpOn: true
			}
		},
		methods: {
			// detail(e) {
			// 	uni.navigateTo({
			// 		url: '/pages/template/mall/productDetail/productDetail'
			// 	})
			// },
			showModal: function() {
				this.bottomPopup = true;
			},
			hideModal: function() {
				this.bottomPopup = false;
			},
			cancel: function() {
				this.bottomPopup = false;
			},
			// getRegion: function(e) {
			// 	const index = e.currentTarget.dataset.index;
			// 	this.regionTxt = this.regionArr[index];
			// 	this.tabIndex = index;
			// 	this.bottomPopup = false;
			// 	this.tui.toast('您选择了：' + this.regionArr[index]);
			// },
		},
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.productList = this.loadData;
				this.pageIndex = 1;
				this.pullUpOn = true;
				this.loadding = false;
				uni.stopPullDownRefresh();
				this.tui.toast("刷新成功")
			}, 200)
		},
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 3) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				this.productList = this.productList.concat(this.loadData);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.product-list {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 30rpx 30rpx 0 30rpx;
		background: #fff;
	}

	.pro-item {
		background: #fff;
		box-sizing: border-box;
		width: 49%;
		position: relative;
		margin-bottom: 2%;
	}

	.pro-item::after {
		content: '';
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1rpx solid #eaeef1;
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		left: 0;
		top: 0;
	}

	.pro-img {
		width: 100%;
		display: block;
	}

	.pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
		height: 230rpx;
	}

	.pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.pro-price {
		padding-top: 18rpx;
	}

	.sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #ea1500;
	}

	.factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
	.btn-box {
		position: relative;
		z-index: 9;
	}

	.btn-box:first-child {
		margin-top: 50rpx;
	}

	.d-container {
		width: 400rpx;
		padding: 80rpx 30rpx;
	}

/*底部抽屉样式 start*/

.region-box {
	width: 100%;
	padding: 10%;
	margin-bottom: 8%;
	box-sizing: border-box;
	overflow: hidden;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
}

.region-txt {
	width: 45%;
	height: 82rpx;
	line-height: 82rpx;
	border-radius: 6rpx;
	font-size: 30rpx;
	color: #333;
	text-align: center;
	margin-bottom: 24rpx;
	/* flex-grow: 1; */
}

.region-txt:nth-of-type(6n) {
	margin-right: 0;
}

.grow {
	flex-grow: 0;
}


/*底部抽屉样式 end*/
</style>

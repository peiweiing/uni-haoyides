<template>
	<view class="pickupProgress">

		<!-- tab标签 -->
		<tui-tabs 
		class="pickuplist_tabs"
		:tabs="navbar"
		:currentTab="currentTab>1?0:currentTab"
		@change="changeTab"
		itemWidth="50%"
		></tui-tabs>
		
		<!-- 我的库存 -->
		<view v-if="currentTab==0">
			<view class="entrusbuylist" v-for="(item, index) in dataList_1" :key="index">
				<view class="entrusbuylist_main">
					<view class="entrusbuylist_left">
						<view class="entrusbuylist_left_img">
							<image :src="item.imgUrl"></image>
						</view>
						<view class="entrusbuylist_left_text">
							{{item.code}}
						</view>
					</view>
					<view class="entrusbuylist_center" style="flex: 1;" @click="pickupdetail(item.id)">
						<view class="entrusbuylist_right_title">{{item.title}}</view>
						<view class="entrusbuylist_right_price">
							<text>挂牌价:￥{{item.price > 999999 ? "999999.00+" : item.price.toFixed(2)}}</text>
							<text>数量:{{item.num > 999 ? '999+' : item.num}}份</text>
						</view>
					</view>
					<view class="entrusbuylist_right">
						<view class="tui-btn-box">
							<tui-button class="ntrusbuylist_right_button" type="green" plain @click="clickButton()">
								{{item.button}}
							</tui-button>
						</view>
					</view>
				</view>
				<scroll-view
				scroll-y
				class="entrusbuylist_middle"
				:class="item.id === bool ? (isactiveMiddle ? 'activeMiddle' : 'closeMiddle') : 'closeMiddle'"
				@click="pickupdetail(item.id)"
				>
					提货进度详情
				</scroll-view>
				<view class="entrusbuylist_secondary" @click="pickupdetail(item.id)">
					<tui-icon
					class="pickupdetail_button"
					name="arrowdown"
					:size="20"
					:color="'#999'"
					:class="item.id === bool ? (isbuttonRotate ? '' : 'activeButton') : ''"
					></tui-icon>
				</view>
			</view>
		</view>
		
		<!-- 提货进度 -->
		<view v-if="currentTab==1">
			<view class="entrusbuylist" v-for="(item, index) in dataList_2" :key="index">
				<view class="entrusbuylist_main">
					<view class="entrusbuylist_left">
						<view class="entrusbuylist_left_img">
							<image :src="item.imgUrl"></image>
						</view>
						<view class="entrusbuylist_left_text">
							{{item.code}}
						</view>
					</view>
					<view class="entrusbuylist_center" style="flex: 1;" @click="pickupdetail(item.id)">
						<view class="entrusbuylist_right_title">{{item.title}}</view>
						<view class="entrusbuylist_right_price">
							<text>挂牌价:￥{{item.price > 999999 ? "999999.00+" : item.price.toFixed(2)}}</text>
							<text>数量:{{item.num > 999 ? '999+' : item.num}}份</text>
						</view>
					</view>
					<view class="entrusbuylist_right">
						<view class="tui-btn-box">
							<tui-button class="ntrusbuylist_right_button" type="green" plain @click="clickButton()">
								{{item.button}}
							</tui-button>
						</view>
					</view>
				</view>
				<scroll-view
				scroll-y
				class="entrusbuylist_middle"
				:class="item.id === bool ? (isactiveMiddle ? 'activeMiddle' : 'closeMiddle') : 'closeMiddle'"
				@click="pickupdetail(item.id)"
				>
					提货进度详情
				</scroll-view>
				<view class="entrusbuylist_secondary" @click="pickupdetail(item.id)">
					<tui-icon
					class="pickupdetail_button"
					name="arrowdown"
					:size="20"
					:color="'#999'"
					:class="item.id === bool ? (isbuttonRotate ? '' : 'activeButton') : ''"
					></tui-icon>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				navbar: [
					{name: "我的库存"},
					{name: "提货进度"}
				],
				currentTab: 0,
				dataList_1: [
					{
						id: 123,
						imgUrl: "",
						title: "陆羽经云南茶叶",
						price: 2800,
						num: 10,
						code: 123456789,
						button: "库存累计中"
					},
					{
						id: 456,
						imgUrl: "",
						title: "陆羽经云南茶叶",
						price: 220,
						num: 100,
						code: 123456789,
						button: "库存累计中"
					}
				],
				dataList_2: [
					{
						id: 52652,
						imgUrl: "",
						title: "陆羽经云南茶叶",
						price: 2800,
						num: 10,
						code: 12345678988,
						button: "库存累计中"
					},
					{
						id: 4545,
						imgUrl: "",
						title: "陆羽经云南茶叶",
						price: 220,
						num: 130,
						code: 12378945,
						button: "库存累计中"
					},
					{
						id: 457845,
						imgUrl: "",
						title: "陆羽经云南茶叶",
						price: 2270,
						num: 180,
						code: 1236789,
						button: "库存累计中"
					},
					{
						id: 45455,
						imgUrl: "",
						title: "陆羽经云南茶叶",
						price: 2260,
						num: 10,
						code: 456423146,
						button: "库存累计中"
					}
				],
				isactiveMiddle: false,
				isbuttonRotate: true,
				bool: 0
			}
		},
		methods: {
			changeTab: function(e){
				this.currentTab = e.index
			},
			clickButton: function() {
				console.log("库存累计中", Math.random())
			},
			pickupdetail: function(id) {
				this.bool = id
				this.isactiveMiddle = !this.isactiveMiddle
				this.isbuttonRotate = !this.isbuttonRotate
			}
		},
		onPullDownRefresh: function(){
			console.log("刷新了页面", Math.random())
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background:rgba(238,238,238,1);
	}
	.entrusbuylist{
		padding: 18rpx 20rpx;
		background: rgba(255,255,255,1);
		border-radius: 6rpx;
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		position: relative;
		.entrusbuylist_main{
			display: flex;
			.entrusbuylist_left{
				width:120rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.entrusbuylist_left_img{
					flex: 1;
					width:100%;
					height:100%;
					background:rgba(253,87,87,1);
					border-radius:6rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.entrusbuylist_left_text{
					font-size:20rpx;
					color:rgba(102,102,102,1);
					transform: scale(0.9);
				}
			}
			.entrusbuylist_center{
				width: 100%;
				padding: 20rpx;
				padding-top: 0;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.entrusbuylist_right_title{
					font-size: 30rpx;
					color:rgba(51,51,51,1);
				}
				.entrusbuylist_right_price{
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color:rgba(153,153,153,1);
				}
			}
			.entrusbuylist_right{
				display: flex;
				padding: 24rpx 0;
				align-items: center;
				position: relative;
				.ntrusbuylist_right_button{
					width: 160rpx !important;
					height:80rpx !important;
					font-size:22rpx !important;
					line-height:80rpx !important;
				}
			}
		}
		.entrusbuylist_middle{
			transition: 0.3s all linear;
			margin-bottom: 10rpx;
			font-size: 32rpx;
			text-align: center;
			line-height: 400rpx;
			color:rgba(51,51,51,1);
		}
		.entrusbuylist_secondary{
			display: flex;
			justify-content: center;
			.pickupdetail_button{
				line-height: 10rpx;
				transition: 0.3s all linear;
			}
		}
	}
	.activeButton{
		transform: rotate(180deg);
	}
	.activeMiddle{
		height: 600rpx;
		overflow: hidden;
		transition: 0.3s all linear;
	}
	.closeMiddle{
		height: 0;
		overflow: hidden;
		transition: 0.3s all linear;
	}
</style>

<template>
	<view class="pickupProgress">
		<!-- tab标签 -->
		<tui-tabs 
		class="pickuplist_tabs"
		:tabs="navbar"
		:currentTab="currentTab > 2 ? 0 : currentTab"
		@change="changeTab"
		itemWidth="33.3333%"
		></tui-tabs>
		<!-- 当日零售量 -->
		<view v-if="currentTab==0">
			<view class="entrusbuylist" v-for="(item, index) in dataList_1" :key="index">
				<view class="entrusbuylist_main">
					<!-- 左 -->
					<view class="entrusbuylist_left">
						<view class="entrusbuylist_left_img">
							<image :src="item.imgUrl"></image>
						</view>
						<view class="entrusbuylist_left_text">
							{{item.code}}
						</view>
					</view>
					<!-- 中 -->
					<view class="entrusbuylist_center" style="flex: 1;">
						<view class="entrusbuylist_center_title">{{item.title}}</view>
						<view class="entrusbuylist_center_price">
							<text>买入价:￥{{item.price > 999999 ? "999999.00+" : item.price.toFixed(2)}}</text>
							<text>可提量:{{item.num > 999 ? '999+' : item.num}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>成交日期:2020-08-29</text>
						</view>
					</view>
					<!-- 右 -->
					<view class="entrusbuylist_right">
						<tui-numberbox
						:min="0"
						:value="item.value"
						@change="change_1($event, item.id)"
						></tui-numberbox>
					</view>
				</view>
			</view>
		</view>
		<!-- 当日批发量 -->
		<view v-if="currentTab==1">
			<view class="entrusbuylist" v-for="(item, index) in dataList_2" :key="index">
				<view class="entrusbuylist_main">
					<!-- 左 -->
					<view class="entrusbuylist_left">
						<view class="entrusbuylist_left_img">
							<image :src="item.imgUrl"></image>
						</view>
						<view class="entrusbuylist_left_text">
							{{item.code}}
						</view>
					</view>
					<!-- 中 -->
					<view class="entrusbuylist_center" style="flex: 1;">
						<view class="entrusbuylist_center_title">{{item.title}}</view>
						<view class="entrusbuylist_center_price">
							<text>买入价:￥{{item.price > 999999 ? "999999.00+" : item.price.toFixed(2)}}</text>
							<text>可提量:{{item.num > 999 ? '999+' : item.num}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>成交日期:2020-08-29</text>
						</view>
					</view>
					<!-- 右 -->
					<view class="entrusbuylist_right">
						<tui-numberbox
						:min="0"
						:value="item.value"
						@change="change_2($event, item.id)"
						></tui-numberbox>
					</view>
				</view>
			</view>
		</view>
		<!-- 全部 -->
		<view v-if="currentTab==2">
			<view class="entrusbuylist" v-for="(item, index) in dataList_3" :key="index">
				<view class="entrusbuylist_main">
					<!-- 左 -->
					<view class="entrusbuylist_left">
						<view class="entrusbuylist_left_img">
							<image :src="item.imgUrl"></image>
						</view>
						<view class="entrusbuylist_left_text">
							{{item.code}}
						</view>
					</view>
					<!-- 中 -->
					<view class="entrusbuylist_center" style="flex: 1;">
						<view class="entrusbuylist_center_title">{{item.title}}</view>
						<view class="entrusbuylist_center_price">
							<text>买入价:￥{{item.price > 999999 ? "999999.00+" : item.price.toFixed(2)}}</text>
							<text>可提量:{{item.num > 999 ? '999+' : item.num}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>成交日期:2020-08-29</text>
						</view>
					</view>
					<!-- 右 -->
					<view class="entrusbuylist_right">
						<tui-numberbox
						:min="0"
						:value="item.value"
						@change="change_3($event, item.id)"
						></tui-numberbox>
					</view>
				</view>
			</view>
		</view>
		<view class="tui-btn-box">
			<button
			class="confirm-btn"
			hover-class="tui-button-hover"
			@click="confirmSum"
			type="primary"
			>
				确 定 选 择 (数量)</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navbar: [
					{name: "当日零售量"},
					{name: "当日批发量"},
					{name: "全部"}
				],
				currentTab: 0,
				dataList_1: [
					{
						id: 123,
						imgUrl: "../../static/images/index/logo.png",
						title: "陆羽经云南茶叶",
						price: 2800,
						num: 10,
						code: 123456789,
						button: "库存累计中",
						value: 1
					},
					{
						id: 456,
						imgUrl: "../../static/images/index/logo.png",
						title: "陆羽经云南茶叶",
						price: 220,
						num: 100,
						code: 123456789,
						button: "库存累计中",
						value: 2
					}
				],
				dataList_2: [
					{
						id: 123,
						imgUrl: "../../static/images/index/logo.png",
						title: "陆羽经云南茶叶",
						price: 2800,
						num: 10,
						code: 123456789,
						button: "库存累计中",
						value: 3
					},
					{
						id: 456,
						imgUrl: "../../static/images/index/logo.png",
						title: "陆羽经云南茶叶",
						price: 220,
						num: 100,
						code: 123456789,
						button: "库存累计中",
						value: 4
					}
				],
				dataList_3: [
					{
						id: 123,
						imgUrl: "../../static/images/index/logo.png",
						title: "陆羽经云南茶叶",
						price: 2800,
						num: 10,
						code: 123456789,
						button: "库存累计中",
						value: 5
					},
					{
						id: 456,
						imgUrl: "../../static/images/index/logo.png",
						title: "陆羽经云南茶叶",
						price: 220,
						num: 100,
						code: 123456789,
						button: "库存累计中",
						value: 6
					}
				]
			}
		},
		methods: {
			changeTab: function(e){
				this.currentTab = e.index
			},
			clickButton: function() {
				console.log("库存累计中", Math.random())
			},
			change_1: function(e, id) {
				for (let i = 0; i < this.dataList_1.length; i++) {
					if (this.dataList_1[i].id === id) {
						this.dataList_1[i].value = e.value
						break;
					}
				}
			},
			change_2: function(e, id) {
				for (let i = 0; i < this.dataList_2.length; i++) {
					if (this.dataList_2[i].id === id) {
						this.dataList_2[i].value = e.value
						break;
					}
				}
			},
			change_3: function(e, id) {
				for (let i = 0; i < this.dataList_3.length; i++) {
					if (this.dataList_3[i].id === id) {
						this.dataList_3[i].value = e.value
						break;
					}
				}
			},
			confirmSum: function() {
				console.log("确定选择", this.currentTab, parseInt(Math.random()*100000))
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
					border-radius:6rpx;
					overflow: hidden;
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
				height: 120rpx;
				padding: 0 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.entrusbuylist_center_title{
					font-size: 30rpx;
					color:rgba(51,51,51,1);
				}
				.entrusbuylist_center_price{
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
			}
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
</style>

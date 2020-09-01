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
		<!-- 提货进度 -->
		<view v-if="currentTab==1">
			<view class="entrusbuylist_2" v-for="(item, index) in dataList_1" :key="index">
				<view class="entrusbuylist_2_main">
					<view class="entrusbuylist_2_left">
						<view class="entrusbuylist_2_left_img">
							<image :src="item.g_pic"></image>
						</view>
						<view class="entrusbuylist_2_left_text">
							{{item.g_code}}
						</view>
					</view>
					<view class="entrusbuylist_2_center" style="flex: 1;" @click="pickupdetail(item.g_id, item.pa_id)">
						<view class="entrusbuylist_2_right_title">{{item.g_title}}</view>
						<view class="entrusbuylist_2_right_price">
							<text>挂牌价:￥{{item.g_price}}</text>
							<text>数量:{{item.pa_amount}}份</text>
						</view>
					</view>
					<view class="entrusbuylist_2_right">
						<view class="tui-btn-box">
							<tui-button class="ntrusbuylist_2_right_button" type="green" @click="clickButton()">
								库存累计中
							</tui-button>
						</view>
					</view>
				</view>
				<scroll-view
				scroll-y
				class="entrusbuylist_2_middle"
				:class="item.g_id === bool ? (isactiveMiddle ? 'activeMiddle' : 'closeMiddle') : 'closeMiddle'"
				@click="pickupdetail(item.g_id, item.pa_id)"
				>
					<view class="middle_title">
						<text>商品名称</text>
						<text>提货时间</text>
						<text>提货数量</text>
					</view>
					<view class="middle_info" v-for="data in dataList_1_detail">
						<text>{{data.title}}</text>
						<text>{{data.datetime}}</text>
						<text>{{data.amount}}</text>
					</view>
				</scroll-view>
				<view class="entrusbuylist_2_secondary" @click="pickupdetail(item.g_id, item.pa_id)">
					<tui-icon
					class="pickupdetail_button"
					name="arrowdown"
					:size="20"
					:color="'#999'"
					:class="item.g_id === bool ? (isbuttonRotate ? '' : 'activeButton') : ''"
					></tui-icon>
				</view>
			</view>
		</view>
		<!-- 我的库存 -->
		<view v-if="currentTab==0">
			<view class="entrusbuylist_1" v-for="item in dataList_2">
				<view class="entrusbuylist_1_left">
					<view class="entrusbuylist_1_left_img">
						<image :src="item.g_pic"></image>
					</view>
					<view class="entrusbuylist_1_left_text">
						{{item.g_code}}
					</view>
				</view>
				<view class="entrusbuylist_1_center" style="flex: 1;">
					<view class="entrusbuylist_1_right_title">
						{{item.g_title}}
					</view>
					<view class="entrusbuylist_1_right_price">
						<text>价格:￥{{item.g_avgprice}}</text>
						<text>数量:{{item.g_inv}}份</text>
					</view>
				</view>
				<view class="entrusbuylist_1_right">
					<view class="tui-btn-box">
						<tui-button
						class="entrusbuylist_1_right_button"
						type="green"
						@click="clickButton(item.g_id)"
						>
							提货
						</tui-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				navbar: [
					{name: "我的库存"},
					{name: "提货进度"}
				],
				currentTab: 0,
				dataList_1: [],
				dataList_1_detail: [],
				dataList_2: [],
				isactiveMiddle: false,
				isbuttonRotate: true,
				bool: -1
			}
		},
		onLoad: function() {
			var that =this;
			uni.getStorage({
				key: 'token',
				success: function (res) {
					var getres = res.data;
					uni.request({
						method: "POST",
						url: App.myinv,
						header: {
							"Authorization": getres
							
							// "Authorization": "CCE7398F976214F932B340326B7A9C82"
						},
						success: res => {
							console.log(res.data.data)
							that.dataList_2 = res.data.data
						}
					})
					uni.request({
						method: "POST",
						url: "http://api.lovehou.com/api/user/deliverygoods",
						header: {
							"Authorization": getres
						},
						success: res => {
							console.log(res.data.data)
							that.dataList_1 = res.data.data
						}
					})
				}
			})
		},
		methods: {
			changeTab: function(e){
				this.currentTab = e.index
			},
			clickButton: function(id) {
				uni.redirectTo({
					url: "./deliveryScheduleDetails?id="+id
				})
			},
			pickupdetail: function(g_id, pa_id) {
				if (this.isactiveMiddle) {
					this.bool = g_id
					this.isactiveMiddle = !this.isactiveMiddle
					this.isbuttonRotate = !this.isbuttonRotate
					this.dataList_1_detail = []
				} else {
					var that =this;
					uni.getStorage({
						key: 'token',
						success: function (res) {
							var getres = res.data;
							uni.request({
								method: "POST",
								url: "http://api.lovehou.com/api/user/deliveryschedule",
								header: {
									"Authorization": getres
									// "Authorization": "CAF72D5815D64E7F6720BEA73A75D015"
								},
								data: {
									"pa_id": pa_id
								},
								success: res => {
									console.log(res.data.data)
									that.dataList_1_detail = res.data.data
									console.log(that.dataList_1_detail)
								}
							})
						}
					})
					this.bool = g_id
					this.isactiveMiddle = !this.isactiveMiddle
					this.isbuttonRotate = !this.isbuttonRotate
				}
			}
		},
		onPullDownRefresh: function(){
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
	.entrusbuylist_2{
		padding: 18rpx 20rpx;
		background: rgba(255,255,255,1);
		border-radius: 6rpx;
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		position: relative;
		.entrusbuylist_2_main{
			display: flex;
			.entrusbuylist_2_left{
				width:120rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.entrusbuylist_2_left_img{
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
				.entrusbuylist_2_left_text{
					font-size:20rpx;
					color:rgba(102,102,102,1);
					transform: scale(0.9);
				}
			}
			.entrusbuylist_2_center{
				width: 100%;
				padding: 20rpx;
				padding-top: 0;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.entrusbuylist_2_right_title{
					font-size: 30rpx;
					color:rgba(51,51,51,1);
				}
				.entrusbuylist_2_right_price{
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color:rgba(153,153,153,1);
				}
			}
			.entrusbuylist_2_right{
				display: flex;
				padding: 24rpx 0;
				align-items: center;
				position: relative;
				.ntrusbuylist_2_right_button{
					width: 160rpx !important;
					height:80rpx !important;
					font-size:22rpx !important;
					line-height:80rpx !important;
					background-color: #9E2036 !important;
				}
			}
		}
		.entrusbuylist_2_middle{
			transition: 0.3s all linear;
			margin-bottom: 10rpx;
			font-size: 32rpx;
			color:rgba(51,51,51,1);
			box-sizing: border-box;
			.middle_title{
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #EEEEEE;
				text{
					flex: 1;
					text-align: center;
					line-height: 80rpx;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
			.middle_info{
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #EEEEEE;
				text{
					flex: 1;
					text-align: center;
					line-height: 80rpx;
					color: #999;
					font-size: 28rpx;
				}
			}
		}
		.entrusbuylist_2_secondary{
			display: flex;
			justify-content: center;
			.pickupdetail_button{
				line-height: 10rpx;
				transition: 0.3s all linear;
			}
		}
	}
	.entrusbuylist_1{
		padding: 18rpx 20rpx;
		height: 151rpx;
		background: rgba(255,255,255,1);
		border-radius: 6rpx;
		display: flex;
		margin: 10rpx;
		.entrusbuylist_1_left{
			width:120rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.entrusbuylist_1_left_img{
				flex: 1;
				width:100%;
				height:100%;
				background: #9E2036;
				border-radius:6rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.entrusbuylist_1_left_text{
				font-size:20rpx;
				color:rgba(102,102,102,1);
				transform: scale(0.9);
			}
		}
		.entrusbuylist_1_center{
			width: 100%;
			padding: 20rpx;
			padding-top: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.entrusbuylist_1_right_title{
				font-size: 30rpx;
				color:rgba(51,51,51,1);
			}
			.entrusbuylist_1_right_price{
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color:rgba(153,153,153,1);
			}
		}
		.entrusbuylist_1_right{
			display: flex;
			align-items: center;
			.entrusbuylist_1_right_button{
				width: 160rpx !important;
				height:80rpx !important;
				font-size:22rpx !important;
				line-height:80rpx !important;
				background-color: #9E2036 !important;
				border: none !important;
			}
		}
	}
	.activeButton{
		transform: rotate(180deg);
	}
	.activeMiddle{
		height: 740rpx;
		overflow: hidden;
		transition: 0.3s all linear;
	}
	.closeMiddle{
		height: 0;
		overflow: hidden;
		transition: 0.3s all linear;
	}
</style>

<template>
	<view class="pickupProgress">
		<!-- tab标签 -->
		<view class="pickuplist_tabs">
			<tui-tabs 
			class="pickuplist_tabs"
			:tabs="navbar"
			:currentTab="currentTab > 2 ? 0 : currentTab"
			@change="changeTab"
			itemWidth="33.3333%"
			></tui-tabs>
		</view>
		<!-- 当日零售量 -->
		<view v-if="currentTab==0">
			<!-- <view style="width: 100%; height: 70rpx;"></view> -->
			<view
			class="entrusbuylist"
			v-for="(item, index) in dataList_1"
			:key="index"
			>
				<view class="entrusbuylist_main">
					<!-- 左 -->
					<view class="entrusbuylist_left">
						<view class="entrusbuylist_left_img">
							<image :src="item.g_pic"></image>
						</view>
						<view class="entrusbuylist_left_text">
							{{item.g_code}}
						</view>
					</view>
					<!-- 中 -->
					<view class="entrusbuylist_center" style="flex: 1;">
						<view class="entrusbuylist_center_title">
							{{item.g_title}}
						</view>
						<view class="entrusbuylist_center_price">
							<text>买入价:￥{{item.ut_amountpay}}</text>
							<text>可提量:{{item.stocknum}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>
								成交日期:{{getLockTime(item.ut_locktime)}}
							</text>
						</view>
					</view>
					<!-- 右 -->
					<view class="entrusbuylist_right">
						<tui-numberbox
						:min="0"
						:max="item.stocknum"
						:value="item.num"
						@change="change_1($event, item.ut_id)"
						></tui-numberbox>
					</view>
				</view>
			</view>
		</view>
		<!-- 当日批发量 -->
		<view v-if="currentTab==1">
			<!-- <view style="width: 100%; height: 70rpx;"></view> -->
			<view
			class="entrusbuylist"
			v-for="(item, index) in dataList_2"
			:key="index"
			>
				<view class="entrusbuylist_main">
					<!-- 左 -->
					<view class="entrusbuylist_left">
						<view class="entrusbuylist_left_img">
							<image :src="item.g_pic"></image>
						</view>
						<view class="entrusbuylist_left_text">
							{{item.g_code}}
						</view>
					</view>
					<!-- 中 -->
					<view class="entrusbuylist_center" style="flex: 1;">
						<view class="entrusbuylist_center_title">
							{{item.g_title}}
						</view>
						<view class="entrusbuylist_center_price">
							<text>买入价:￥{{item.ut_amountpay}}</text>
							<text>可提量:{{item.stocknum}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>成交日期:{{getLockTime(item.ut_locktime)}}</text>
						</view>
					</view>
					<!-- 右 -->
					<view class="entrusbuylist_right">
						<tui-numberbox
						:min="0"
						:max="item.stocknum"
						:value="item.num"
						@change="change_2($event, item.ut_id)"
						></tui-numberbox>
					</view>
				</view>
			</view>
		</view>
		<!-- 全部 -->
		<view v-if="currentTab==2">
			<!-- <view style="width: 100%; height: 70rpx;"></view> -->
			<view class="entrusbuylist" v-for="(item, index) in dataList_3" :key="index">
				<view class="entrusbuylist_main">
					<!-- 左 -->
					<view class="entrusbuylist_left">
						<view class="entrusbuylist_left_img">
							<image :src="item.g_pic"></image>
						</view>
						<view class="entrusbuylist_left_text">
							{{item.g_code}}
						</view>
					</view>
					<!-- 中 -->
					<view class="entrusbuylist_center" style="flex: 1;">
						<view class="entrusbuylist_center_title">
							{{item.g_title}}
						</view>
						<view class="entrusbuylist_center_price">
							<text>买入价:￥{{item.ut_amountpay}}</text>
							<text>可提量:{{item.stocknum}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>成交日期:{{getLockTime(item.ut_locktime)}}</text>
						</view>
					</view>
					<!-- 右 -->
					<view class="entrusbuylist_right">
						<tui-numberbox
						:min="0"
						:max="item.stocknum"
						:value="item.num"
						@change="change_3($event, item.ut_id)"
						></tui-numberbox>
					</view>
				</view>
			</view>
		</view>
		<view class="tui-btn-box">
			<button
			:disabled="isCon"
			class="confirm-btn"
			hover-class="tui-button-hover"
			@click="confirmSum(currentTab)"
			type="primary"
			>
				确 定 选 择 ({{confirmNum}})</button>
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
				dataList_1: [],
				chooseNum_1: 0,
				dataList_2: [],
				chooseNum_2: 0,
				dataList_3: [],
				chooseNum_3: 0,
				isCon: false,
				optionId: -1
			}
		},
		computed: {
			getLockTime() {
				return function(data) {
					let year = ""
					let month = ""
					let date = ""
					year = new Date(data*1000).getFullYear()
					month = new Date(data*1000).getMonth()+1
					date = new Date(data*1000).getDate()
					if (month <10) {
						month = "0"+month
					}
					return year+"-"+month+"-"+date
				}
			},
			confirmNum() {
				if (this.currentTab === 0) {
					return this.dataList_1[this.chooseNum_1].num
				} else if (this.currentTab === 1) {
					return this.dataList_2[this.chooseNum_2].num
				} else {
					return this.dataList_3[this.chooseNum_3].num
				}
			}
		},
		methods: {
			changeTab: function(e){
				this.currentTab = e.index
			},
			clickButton: function() {},
			change_1: function(e, id) {
				var that = this;
				    this.dataList_1.forEach(function(item, index) {
				                //item 就是当日按循环到的对象
				                //index是循环的索引，从0开始
				       if(item.ut_id == id){
				        item.num =e.value;
				        that.chooseNum_1=index;
				       }else{
				        item.num = 0;
				       }
				    })
			},
			change_2: function(e, id) {
				var that = this;
				    this.dataList_2.forEach(function(item, index) {
				                //item 就是当日按循环到的对象
				                //index是循环的索引，从0开始
				       if(item.ut_id == id){
				        item.num =e.value;
				        that.chooseNum_2=index;
				       }else{
				        item.num = 0;
				       }
				    })
			},
			change_3: function(e, id) {
				var that = this;
				    this.dataList_3.forEach(function(item, index) {
				                //item 就是当日按循环到的对象
				                //index是循环的索引，从0开始
				       if(item.ut_id == id){
				        item.num =e.value;
				        that.chooseNum_3=index;
				       }else{
				        item.num = 0;
				       }
				    })
			},
			confirmSum: function(index) {
				this.isCon = true
				let data = {}
				if (index === 0) {
					data = 
					{
					num:this.dataList_1[this.chooseNum_1].num,
					g_id:this.dataList_1[this.chooseNum_1].g_id,
					ut_id:this.dataList_1[this.chooseNum_1].ut_id
					}
				}
				if (index === 1) {
					data = 	{
					num:this.dataList_2[this.chooseNum_2].num,
					g_id:this.dataList_2[this.chooseNum_2].g_id,
					ut_id:this.dataList_2[this.chooseNum_2].ut_id
					}
				}
				if (index === 2) {
					data = 	{
					num:this.dataList_3[this.chooseNum_3].num,
					g_id:this.dataList_3[this.chooseNum_3].g_id,
					ut_id:this.dataList_3[this.chooseNum_3].ut_id
					}
				}
				var that =this;
				uni.getStorage({
					key: 'token',
					success: function (res) {
						var getres = res.data;
						uni.request({
							method: "POST",
							url: "http://api.lovehou.com/api/order/pickupgoods",
							header: {
								"Authorization": getres
							},
							data: data,
							success: res => {
								console.log(res)
								that.isCon = false
								if (res.data.status === 200) {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
									that.deliveryScheduleDetails(that.currentTab)
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}
							}
						})
					}
				})
			},
			deliveryScheduleDetails: function(type) {
				var that =this;
				uni.getStorage({
					key: 'token',
					success: function (res) {
						var getres = res.data;
						uni.request({
							method: "POST",
							url: "http://api.lovehou.com/api/order/pickuplist",
							header: {
								"Authorization": getres
							},
							data: {
								type: type+1,
								g_id: that.optionId
							},
							success: res => {
								console.log("2→", res)
								if ((type+1)===1) {
									that.dataList_1 = res.data.data
									console.log(that.dataList_1)
									// that.pickUpData_1.g_id = res.data.data[0].g_id
									// that.pickUpData_1.ut_id = res.data.data[0].ut_id
								}
								if ((type+1)===2) {
									that.dataList_2 = res.data.data
									// that.pickUpData_2.g_id = res.data.data[0].g_id
									// that.pickUpData_2.ut_id = res.data.data[0].ut_id
								}
								if ((type+1)===3) {
									that.dataList_3 = res.data.data
									// that.pickUpData_3.g_id = res.data.data[0].g_id
									// that.pickUpData_3.ut_id = res.data.data[0].ut_id
								}
								console.log("789456", that.dataList_1)
							}
						})
					}
				})
			}
		},
		onLoad: function (option) {
			this.optionId = option.id
			this.deliveryScheduleDetails(0)
			// this.deliveryScheduleDetails(1)
			// this.deliveryScheduleDetails(2)
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
	// .pickuplist_tabs{
	// 	position: fixed;
	// 	z-index: 999;
	// 	margin-top: -10rpx;
	// }
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

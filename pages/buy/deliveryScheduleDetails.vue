<template>
	<view class="deliver">
		<!-- tab标签 -->
		<view class="pickuplist_tabs">
			<tui-tabs
			class="pickuplist_tabs"
			:tabs="navbar"
			:sliderWidth="150"
			:currentTab="currentTab > 2 ? 0 : currentTab"
			@change="changeTab"
			itemWidth="33.3333%"
			></tui-tabs>
		</view>
		<!-- 当日零售量 -->
		<view v-if="currentTab==0" class="currentTab">
			<view class="FY FY-c FX-c" v-if="noData" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="entrusbuylist" v-for="(item, index) in dataList_1" :key="index" v-if="!noData">
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
							<text>单价:￥{{item.ut_amountpay}}</text>
							<text>可提量:{{item.stocknum}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>
								成交日期:{{getLockTime(item.ut_datetime)}}
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
		<view v-if="currentTab==1" class="currentTab">
			<view class="FY FY-c FX-c" v-if="noData" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="entrusbuylist" v-for="(item, index) in dataList_2" :key="index" v-if="!noData">
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
							<text>单价:￥{{item.ut_amountpay}}</text>
							<text>可提量:{{item.stocknum}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>成交日期:{{getLockTime(item.ut_datetime)}}</text>
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
			<view class="" style="height: 140rpx;">
				
			</view>
		</view>
		<!-- 全部 -->
		<view v-if="currentTab==2">
			<view class="FY FY-c FX-c" v-if="noData" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="entrusbuylist" v-for="(item, index) in dataList_3" :key="index" v-if="!noData">
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
							<text>单价:￥{{item.ut_amountpay}}</text>
							<text>可提量:{{item.stocknum}}份</text>
						</view>
						<view class="entrusbuylist_center_price">
							<text>成交日期:{{getLockTime(item.ut_datetime)}}</text>
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
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import App from "../../App.vue"
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
				optionId: -1,
				isCon: false,
				noData: false
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
					if (date <10) {
						date = "0"+date
					}
					return year+"-"+month+"-"+date
				}
			},
			confirmNum() {
				if (this.currentTab === 0) {
					if(this.dataList_1.length>0){
					return this.dataList_1[this.chooseNum_1].num??0
					}else{
						return 0;
					}
				} else if (this.currentTab === 1) {
					if(this.dataList_2.length>0){
					return this.dataList_2[this.chooseNum_2].num??0
					}else{
						return 0;
					}
				} else {
					if(this.dataList_3.length>0){
						return this.dataList_3[this.chooseNum_3].num??0
					}else{
						return 0;
					}
				}
			}
		},
		methods: {
			// 信息反馈
			showToast: function(type, msg, msg2) {
				let params = { title: msg, imgUrl: "../../static/img/toast/check-circle.png", icon: true, duration: 1000 };
				switch (type) {
					case 1: params.title = msg; params.imgUrl = "../../static/img/toast/check-circle.png"; break;
					case 2: params.title = msg; params.imgUrl = "../../static/img/toast/fail-circle.png"; break;
					case 3: params.title = msg; params.imgUrl = "../../static/img/toast/info-circle.png"; break;
					case 4: params.title = msg; params.icon = false; break;
					case 5: params.title = msg; params.content = msg2; break;
					default: break;
				}
				this.$refs.toast.show(params);
			},
			changeTab: async function(e){
				if (this.currentTab === 0) { this.dataList_1 = []; };
				if (this.currentTab === 1) { this.dataList_2 = []; };
				if (this.currentTab === 2) { this.dataList_3 = []; };
				this.currentTab = e.index;
				await this.deliveryScheduleDetails(e.index);
				if (e.index === 0) {
					if (this.dataList_1.length === 0) {
						this.isCon = true
					} else {
						this.isCon = false
					}
				}
				if (e.index === 1) {
					if (this.dataList_2.length === 0) {
						this.isCon = true
					}else {
						this.isCon = false
					}
				}
				if (e.index === 2) {
					if (this.dataList_3.length === 0) {
						this.isCon = true
					}else {
						this.isCon = false
					}
				}
			},
			change_1: function(e, id) {
				var that = this;
				this.dataList_1.forEach(function(item, index) {
					if(item.ut_id == id){
						item.num =e.value
						that.chooseNum_1=index
					}else{
						item.num = 0
					}
				})
			},
			change_2: function(e, id) {
				var that = this
				this.dataList_2.forEach(function(item, index) {
					if(item.ut_id == id){
						item.num =e.value
						that.chooseNum_2=index
					}else{
						item.num = 0
					}
				})
			},
			change_3: function(e, id) {
				var that = this
				this.dataList_3.forEach(function(item, index) {
					if(item.ut_id == id){
						item.num =e.value
						that.chooseNum_3=index
					}else{
						item.num = 0
					}
				})
			},
			confirmSum: function(index) {
				this.isCon = true
				let data = {}
				if (index === 0) {
					if (this.dataList_1[this.chooseNum_1].num <= 0) {
						this.showToast(3, '至少选择一件商品');
						this.isCon = false
						return
					} else {
						data = {
							num:this.dataList_1[this.chooseNum_1].num,
							g_id:this.dataList_1[this.chooseNum_1].g_id,
							ut_id:this.dataList_1[this.chooseNum_1].ut_id,
							type:index+1
						}
					}
				}
				if (index === 1) {
					if (this.dataList_2[this.chooseNum_2].num <= 0) {
						this.showToast(3, '至少选择一件商品');
						this.isCon = false
						return
					} else {
						data = {
							num:this.dataList_2[this.chooseNum_2].num,
							g_id:this.dataList_2[this.chooseNum_2].g_id,
							ut_id:this.dataList_2[this.chooseNum_2].ut_id,
							type:index+1
						}
					}
				}
				if (index === 2) {
					if (this.dataList_3[this.chooseNum_3].num <= 0) {
						this.showToast(3, '至少选择一件商品');
						this.isCon = false
						return
					} else {
						data = {
							num:this.dataList_3[this.chooseNum_3].num,
							g_id:this.dataList_3[this.chooseNum_3].g_id,
							ut_id:this.dataList_3[this.chooseNum_3].ut_id,
							type:index+1
						}
					}
				}
				var that =this;
				uni.getStorage({
					key: "user",
					success: function (res) {
						that.user = res.data
						if(that.user!=1){
							uni.showModal({
								title: '提示',
								content: '请先实名认证',
								success: res => { if (res.confirm) { uni.navigateTo({ url: '../user/realName' }) } }
							});
						}else{
							that.sendRequest({
								method: "POST",
								url: App.pickupgoods,
								data: data,
								success: res => {
									that.isCon = false
									if (res.status === 200) {
										that.showToast(1, res.msg);
										setTimeout(function() { that.deliveryScheduleDetails(that.currentTab) }, 1500);
									} else {
										that.showToast(2, res.msg);
										setTimeout(function() { that.deliveryScheduleDetails(that.currentTab) }, 1500);
									}
								},
								fail:function(e){
									that.isCon = false
								},
								complete: res => {
									if (res.status !== 200) {
										setTimeout(function() { that.deliveryScheduleDetails(that.currentTab) }, 1500);
									};
								}
							});
						}
					},
				});
			},
			deliveryScheduleDetails: function(type) {
				var that =this;
				that.sendRequest({
					method: "POST",
					url: App.pickuplist,
					data: {
						type: type+1,
						g_id: that.optionId
					},
					complete: res => {
						console.log(res)
						if (res.status !==200 ) {
							this.isCon = true
							that.noData = true
						}
					},
					success: res => {
						if ((type+1)===1) {
							if(res.data === null || res.status !== 200){
								that.showToast(3, res.msg);
								that.isCon = true
								that.noData = true
							}else{
								if (res.data.length === 0) {
									that.dataList_1 = []
									that.isCon = true
									that.noData = true
								} else {
									that.dataList_1 = res.data
									that.isCon = false
									that.noData = false
								}
							};
							return;
						}
						if ((type+1)===2) {
							if(res.data==null || res.status !== 200){
								that.showToast(3, res.msg);
								that.isCon = true
								that.noData = true
							}else{
								if (res.data.length === 0) {
									that.dataList_2 = []
									that.isCon = true
									that.noData = true
								} else {
									that.dataList_2 = res.data
									that.isCon = false
									that.noData = false
								}
							};
							return;
						}
						if ((type+1)===3) {
							if(res.data==null || res.status !== 200){
								that.showToast(3, res.msg);
								that.isCon = true
								that.noData = true
							}else{
								if (res.data.length === 0) {
									that.dataList_3 = []
									that.isCon = true
									that.noData = true
								} else {
									that.dataList_3 = res.data
									that.isCon = false
									that.noData = false
								}
							};
							return;
						}
					},
					fail:function(e){
						console.log(e);
					}
				});
			}
		},
		onLoad: function (option) {
			this.optionId = option.id;
			this.deliveryScheduleDetails(0);
		},
		onShow: function() {
			this.deliveryScheduleDetails(this.currentTab);
		},
		onPullDownRefresh: function(){
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.deliver{
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		background-color: #EEEEEE;
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
			box-shadow: none;
		}
	}
</style>

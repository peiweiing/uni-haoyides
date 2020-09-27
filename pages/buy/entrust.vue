<template>
	<view class="pickupProgress">
		<!-- tab -->
		<tui-tabs 
		class="pickuplist_tabs"
		:tabs="navbar"
		:sliderWidth="150"
		:currentTab="currentTab > 2 ? 0 : currentTab"
		@change="changeTab"
		itemWidth="33.3333%"
		></tui-tabs>
		<!-- 委托买入 -->
		<view class="" v-if="currentTab==0">
			<view class="entrusbuylist" v-for="item in dataList1" v-if="isShow1">
				<view class="entrusbuylist_left">
					<view class="entrusbuylist_left_img">
						<image :src="item.g_pic"></image>
					</view>
					<view class="entrusbuylist_left_text">
						{{item.g_code}}
					</view>
				</view>
				<view class="entrusbuylist_center" style="flex: 1;">
					<view class="entrusbuylist_right_title">{{item.g_title}}</view>
					<view class="entrusbuylist_right_price">
						<text>委托价:￥{{Number(item.ut_price).toFixed(2)}}</text>
						<text>委托:{{item.ut_num}}份</text>
						<text>成交:{{item.ut_dealnum}}份</text>
					</view>
				</view>
				<view class="entrusbuylist_right">
					<view class="tui-btn-box">
						<tui-button class="ntrusbuylist_right_button" type="bronze" plain @click="clickButton(item.ut_id)">
							撤销
						</tui-button>
					</view>
				</view>
			</view>
			
			<view class="FY FY-c FX-c" v-if="isShow1==false" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
		</view>
		<!-- 委托卖出 -->
		<view class="" v-if="currentTab==1">
			<view class="entrusbuylist" v-for="item in dataList2" v-if="isShow2">
				<view class="entrusbuylist_left">
					<view class="entrusbuylist_left_img">
						<image :src="item.g_pic"></image>
					</view>
					<view class="entrusbuylist_left_text">
						{{item.g_code}}
					</view>
				</view>
				<view class="entrusbuylist_center" style="flex: 1;">
					<view class="entrusbuylist_right_title">{{item.g_title}}</view>
					<view class="entrusbuylist_right_price">
						<text>委托价:￥{{item.ut_price}}</text>
						<text>委托:{{item.ut_num}}份</text>
						<text>成交:{{item.ut_dealnum}}份</text>
					</view>
				</view>
				<view class="entrusbuylist_right">
					<view class="tui-btn-box">
						<tui-button class="ntrusbuylist_right_button" type="bronze" plain @click="clickButtons(item.ut_id)">
							撤销
						</tui-button>
					</view>
				</view>
			</view>
			
			<view class="FY FY-c FX-c" v-if="isShow2==false" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
		</view>
		<!-- 全部 -->
		<view class="" v-if="currentTab==2">
			<view class="FY FY-c FX-c" v-if="isShow3==false" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="entrusbuylist" v-for="item in dataList3" v-if="isShow3">
				<view class="entrusbuylist_left">
					<view class="entrusbuylist_left_img">
						<image :src="item.g_pic"></image>
					</view>
					<view class="entrusbuylist_left_text">
						{{item.g_code}}
					</view>
				</view>
				<view class="entrusbuylist_center" style="flex: 1;">
					<view class="entrusbuylist_right_title">{{item.g_title}}</view>
					<view class="entrusbuylist_right_price">
						<text>{{getTime(item.ut_datetime)}}</text>
						<text>成交:{{item.ut_dealnum}}份</text>
						<text>
							{{item.ut_tradestatus === 0 ? '交易中' : (item.ut_tradestatus === 1 ? '交易完成' : '已撤销')}}
						</text>
					</view>
				</view>
				<view class="entrusbuylist_right" style="font-size: 36rpx; padding: 0 20rpx;">
					<view class="tui-btn-box" :style="'color: ' + (item.ut_tradecate === 0 ? '#07C160' : '#9E2036')">
						{{item.ut_tradecate === 0 ? '买入' : '卖出'}}
					</view>
				</view>
			</view>
		</view>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import App from '../../App.vue'
	export default {
		data() {
			return {
				navbar: [
					{name: "委托买入"},
					{name: "委托卖出"},
					{name: "全部"}
				],
				isShow1: true,
				isShow2: true,
				isShow3: true,
				currentTab: 0,
				dataList:'',
				dataList1: [], // 委托买入
				dataList2: [], // 委托卖出
				dataList3: [] // 全部
			}
		},
		computed: {
			// 获取时间(年月日)
			getTime() {
				return function(data) {
					let year = new Date(data * 1000).getFullYear();
					let month = new Date(data * 1000).getMonth()+1;
					let date = new Date(data * 1000).getDate();
					if (month < 10) { month = "0" + month; }	
					if (date < 10) { date = "0" + date; }
					return year + "-" + month + "-" + date;
				}
			}
		},
		onShow() {
			var that =this;
			this.sendRequest({
				url :App.mygetEntrusList,
				method:'POST',
				data:{'type':1},
				success : function(res){
					if(res.data.length !== 0){
						that.isShow1 = true;
					}else{
						that.isShow1 = false;
					}
					that.dataList1=res.data;
				},
				fail:function(e){
					that.isShow1=false;
					console.log("getchannel  fail:" + JSON.stringify(e));
				}
			});
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
				this.$refs.toast.show(params)
			},
			getList(type){	
				var that =this;
				this.sendRequest({
					url :App.mygetEntrusList,
					method:'POST',
					data:{'type':type},
					success : function(res){
						if(res.data.length){
							type==1? that.isShow1 = true: that.isShow2 = true;
						}else{
							type==1? that.isShow1 = true: that.isShow2 = true;
						}
						console.log(res.data);
						type==1? that.dataList1=res.data : that.dataList2=res.data;
					},
					fail:function(e){
						type==1? that.isShow1 = true: that.isShow2 = true;
						console.log("getchannel  fail:" + JSON.stringify(e));
					}
				});
			},
			changeTab(e) {
				this.currentTab = e.index;
				if (e.index === 0) {
					var that =this;
					this.sendRequest({
						url :App.mygetEntrusList,
						method:'POST',
						data:{'type':1},
						success : function(res){
							if(res.data.length !== 0){
								that.isShow1 = true;
							}else{
								that.isShow1 = false;
							}
							that.dataList1=res.data;
						},
						fail:function(e){
							that.isShow1=false;
							console.log("getchannel  fail:" + JSON.stringify(e));
						}
					});
					return;
				};
				this.currentTab = e.index;
				if (e.index === 2) {
					var that =this;
					this.sendRequest({
						url :App.allEntrusList,
						method:'POST',
						success: (res) => {
							console.log(res)
							if (res.status === 200 && res.data.length !== 0 && res.data) {
								that.dataList3 = res.data;
								that.isShow3 = true;
							} else {
								that.isShow3 = false;
							};
						},
						fail: (e) => {
							that.isShow1=false;
							console.log("getchannel  fail:" + JSON.stringify(e));
						}
					});
					return;
				};
				if (e.index === 1) {
					var that =this;
					this.sendRequest({
						url :App.mygetEntrusList,
						method:'POST',
						data:{'type':2},
						success : function(res){
							if(res.data.length !== 0){
								that.isShow2 = true;
							}else{
								that.isShow2 = false;
							}
							that.dataList2=res.data;
						},
						fail:function(e){
							that.isShow2=false;
							console.log("getchannel  fail:" + JSON.stringify(e));
						}
					});
					return;
				}
			},
			clickButton(e) {
				var that = this;
				this.sendRequest({
					url :App.revokePurchase,
					method:'POST',
					data:{'ut_id':e},
					success : function(res){
						if(res.data == null || res.data.length){
							that.isShow1 = true;
						}else{
							that.isShow1 = false;
						}
						console.log("getchannel success:" + JSON.stringify(res));
						that.dataList1=res.data;
						that.getList(1);
						that.showToast(1, res.msg);
					},
					fail:function(e){
						that.isShow1=false;
						console.log("getchannel  fail:" + JSON.stringify(e));
					}
				});
				// console.log(Math.random())
			},
			clickButtons(e) {
				var that = this;
				this.sendRequest({
					url :App.revokeSell,
					method:'POST',
					data:{'ut_id':e},
					success : function(res){
						console.log(res);
						if(res.data == null || res.data.length){
							that.isShow2 = true;
						}else{
							that.isShow2 = false;
						}
						that.dataList2=res.data;
						that.getList(2);
						that.showToast(1, res.msg);
					},
					fail:function(e){
						that.isShow2=false;
						console.log("getchannel  fail:" + JSON.stringify(e));
					}
				});
				// console.log(Math.random())
			}
		},
		onPullDownRefresh() {
			console.log("刷新了页面", Math.random())
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.pickupProgress{
		width:100%;
		position: absolute;
		top: 0;
		bottom: 0;
		background:#EEE;
	}
	.entrusbuylist{
		padding: 18rpx;
		height: 120rpx;
		background: rgba(255,255,255,1);
		border-radius: 20rpx;
		display: flex;
		margin: 10rpx;
		.entrusbuylist_left{
			width:60*2rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.entrusbuylist_left_img{
				flex: 1;
				width:100%;
				height:100%;
				border-radius:6rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
			.entrusbuylist_left_text{
				font-size:20rpx;
				padding-top: 6rpx;
				color:rgba(102,102,102,1);
				transform: scale(0.8);
			}
		}
		.entrusbuylist_center{
			width: 100%;
			padding: 10rpx 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.entrusbuylist_right_title{
				font-size: 32rpx;
				color:rgba(51,51,51,1);
			}
			.entrusbuylist_right_price{
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				color:rgba(153,153,153,1);
			}
		}
		.entrusbuylist_right{
			display: flex;
			align-items: center;
			.ntrusbuylist_right_button{
				width: 120rpx !important;
				height:80rpx !important;
				font-size:28rpx !important;
				line-height:80rpx !important;
			}
		}
	}
</style>

<template>
	<view class="pickupProgress">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs 
			class="pickuplist_tabs"
			:tabs="navbar"
			:sliderWidth="150"
			:currentTab="currentTab>1?0:currentTab"
			@change="changeTab"
			itemWidth="50%"
			></tui-tabs>
		</view>
		<!-- 提货进度 -->
		<scroll-view scroll-y v-if="currentTab==1">
			<view style="height: 80rpx;"></view>
			<view class="FY FY-c FX-c" v-if="dataList_1_error" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view
			class="entrusbuylist_2"
			v-for="(item, index) in dataList_1"
			:key="index"
			>
				<view class="entrusbuylist_2_main">
					<view class="entrusbuylist_2_left">
						<view class="entrusbuylist_2_left_img">
							<image :src="item.g_pic"></image>
						</view>
						<view class="entrusbuylist_2_left_text">
							{{item.g_code}}
						</view>
					</view>
					<view
					class="entrusbuylist_2_center"
					style="flex: 1;"
					@click="pickupdetail(item.g_id, item.pa_id)"
					>
						<view
						class="entrusbuylist_2_right_title"
						:style="item.g_title === '000' ? 'opacity: 0;' : ''"
						>
							{{item.g_title}}
						</view>
						<view class="entrusbuylist_2_right_price">
							<text>挂牌价:￥{{item.g_price}}</text>
							<text>数量:{{item.pa_amount}}份</text>
						</view>
					</view>
					<view class="entrusbuylist_2_right">
						<view class="tui-btn-box">
							<tui-button
							class="ntrusbuylist_2_right_button"
							type="green"
							disabled
							>
								{{item.pa_status === 0 ? '库存累计中' : '已审核'}}
							</tui-button>
						</view>
					</view>
				</view>
				<scroll-view
				scroll-y
				class="entrusbuylist_2_middle"
				:class="item.pa_id === bool ? (isactiveMiddle ? 'activeMiddle' : 'closeMiddle') : 'closeMiddle'"
				@click="pickupdetail(item.g_id, item.pa_id)"
				>
					<view class="middle_title">
						<text>商品名称</text>
						<text>提货数量</text>
						<text>提货时间</text>
					</view>
					<view class="middle_info" v-for="data in dataList_1_detail">
						<text>{{data.title}}</text>
						<text>{{data.amount}}</text>
						<text>{{getLockTime(data.datetime)}}</text>
					</view>
				</scroll-view>
				<view
				class="entrusbuylist_2_secondary"
				@click="pickupdetail(item.g_id, item.pa_id)"
				>
					<tui-icon
					class="pickupdetail_button"
					name="arrowdown"
					:size="20"
					:color="'#999'"
					:class="item.pa_id === bool ? (isbuttonRotate ? '' : 'activeButton') : ''"
					></tui-icon>
				</view>
			</view>
		</scroll-view>
		<!-- 我的库存 -->
		<scroll-view scroll-y v-if="currentTab==0">
			<view style="height: 80rpx;"></view>
			<view class="FY FY-c FX-c" v-if="dataList_2_error" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
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
					<view class="entrusbuylist_1_right_title">{{item.g_title}}</view>
					<view class="entrusbuylist_1_right_price">
						<text>价格:￥{{item.g_price}}</text>
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
		</scroll-view>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :title="title" :content="content" :button="button"></tui-modal>
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				title:'提示',
				content:'',
				modal: false,
				button: [
					{
						text: '取消',
						type: 'red',
						plain: true //是否空心
					},
					{
						text: '确认',
						type: 'red',
						plain: false
					}
				],
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
				bool: -1,
				dataList_2_error: false,
				dataList_1_error: false
			}
		},
		onShow: function() {
			this.myInv()
		},
		computed:{
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
					}	if (date <10) {
						date = "0"+date
					}
					return year+"-"+month+"-"+date
				}
			}
		},
		methods: {
			// 信息反馈
			showToast: function(type, msg, msg2) {
				let params = { title: msg, imgUrl: "../../static/img/toast/check-circle.png", icon: true };
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
			changeTab: function(e){
				this.currentTab = e.index
				if (e.index === 1) {
					this.dataList_1_error = false
					this.isLoading_1 = true
					this.delivergoods()
				} else if (e.index === 0) {
					this.dataList_2_error = false
					this.isLoading_2 = true
					this.myInv()
				}
			},
			myInv: function() {
				var that =this;
				that.sendRequest({
					method: "POST",
					url: App.myinv,
					success: res => {
						console.log(res)
						that.isLoading_2 = false
						if (res.status !== 200) {
							that.dataList_2_error = true
						} else {
							that.dataList_2 = res.data
							if (that.dataList_2.length === 0) {
								that.dataList_2_error = true
							}
						}
					},
					fail:function(e){
						console.log("getchannel  fail:", e);
					}
				});
			},
			delivergoods: function() {
				var that =this;
				that.sendRequest({
					method: "POST",
					url: App.deliverygoods,
					success: res => {
						console.log(res)
						that.isLoading_1 = false
						if (res.status !== 200) {
							this.dataList_1_error = true
						} else {
							that.dataList_1 = res.data
							if (that.dataList_1.length === 0) {
								that.dataList_1_error = true
							}
						}
					},
					fail:function(e){
						console.log(e);
					}
				});
			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast('你点击了取消按钮');
				} else {
					uni.navigateTo({
						url: '../user/changeAddress'
					});
					// this.tui.toast('你点击了确定按钮');
				}
				this.modal = false;
			},
			clickButton: async function(id) {
				const pickupBefore_res = await this.pickupBefore();
				// console.log(pickupBefore_res);
				if (pickupBefore_res.data[0].u_addr === 0) {
					this.modal = true;
					this.title = '没有设置默认收货地址';
					this.content = '是否前往设置默认收货地址?';
					// uni.showModal({
					//     title: '没有设置默认收货地址',
					//     content: '是否前往设置默认收货地址?',
					//     success: function (res) {
					//         if (res.confirm) {
					//             uni.navigateTo({
					//             	url: '../user/changeAddress'
					//             });
					//         }
					//     }
					// });
				} else {
					uni.navigateTo({
						url: "./deliveryScheduleDetails?id="+id
					});
				};
			},
			pickupdetail: function(g_id, pa_id) {
				if (this.isactiveMiddle) {
					this.bool = pa_id
					this.isactiveMiddle = !this.isactiveMiddle
					this.isbuttonRotate = !this.isbuttonRotate
					setTimeout(function() {
						this.dataList_1_detail = []
					}, 500)
				} else {
					var that =this;
					that.sendRequest({
						method: "POST",
						url: App.deliveryschedule,
						data: {
							"pa_id": pa_id
						},
						success: res => {
							console.log(res)
							that.dataList_1_detail = res.data
						},
						fail:function(e){
							console.log("getchannel  fail:" + JSON.stringify(e));
						}
					});
					this.bool = pa_id
					this.isactiveMiddle = !this.isactiveMiddle
					this.isbuttonRotate = !this.isbuttonRotate
				}
			},
			// 提货前收货地址判断
			pickupBefore: async function() {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.pickupBefore,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		},
		onPullDownRefresh: function(){
			if (this.currentTab === 0) {
				this.myInv()
			} else if (this.currentTab === 1) {
				this.delivergoods()
			}
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.pickupProgress{
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		background-color: #EEEEEE;
	}
	.tabs{
		position: fixed;
		z-index: 1;
	}
	.entrusbuylist_2{
		padding: 18rpx 20rpx;
		background: rgba(255,255,255,1);
		border-radius: 6rpx;
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		position: relative;
		box-sizing: border-box;
		border: 2rpx solid #EEEEEE;
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
					font-size:28rpx !important;
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
		box-sizing: border-box;
		border: 2rpx solid #EEEEEE;
		.entrusbuylist_1_left{
			width:120rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.entrusbuylist_1_left_img{
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
				font-size:28rpx !important;
				line-height:80rpx !important;
				background-color: #9E2036 !important;
				border: none !important;
				box-shadow: none !important;
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

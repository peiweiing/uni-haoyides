<template>
	<view class="reward">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs class="pickuplist_tabs" :tabs="navbar" :sliderWidth="150" :currentTab="currentTab > 2 ? 0 : currentTab" @change="changeTab" itemWidth="33.3333%"></tui-tabs>
		</view>
		<!-- 所有 -->
		<scroll-view scroll-y v-if="currentTab==0" class="all">
			<view class="FY FY-c FX-c" v-if="nodata_1" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="list" v-if="!!!nodata_1">
				<view class="list_1" v-for="(item, index) in allData" :key="index">
					<view class="list_1_top">
						<view class="list_1_top_img">
							<image :src="item.g_pic"></image>
						</view>
						<view class="list_1_top_content">
							<view class="list_1_top_title f-nowrap f-hidden3">{{item.g_title}}</view>
							<view class="list_1_top_info">
								<view class="list_1_top_price">￥{{(+item.g_price).toFixed(2)}}</view>
								<view class="list_1_top_reward" :style="'opacity: ' + (item.send_status === 0 ? '0;' : '1;')">拼购奖励：{{(+item.goods_value).toFixed(2)}}商品值</view>
							</view>
						</view>
					</view>
					<view class="list_1_bottom">
						<view class="list_1_bottom_name">
							<text v-for="(data, index) in handle(item.usersnames)" :key="index">{{data}}</text>
						</view>
						<view class="list_1_bottom_result" :style="'color: ' + (item.send_status === 1 ? '#F71122;' : '#999;')">{{item.send_status === 1 ? '拼购成功' : `还差 ${(+item.leijinum).toFixed(0)} 人`}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 拼购中 -->
		<scroll-view scroll-y v-if="currentTab==1" class="ing">
			<view class="FY FY-c FX-c" v-if="nodata_2" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="list" v-if="!!!nodata_2">
				<view class="list_1" v-for="(item, index) in ingData" :key="index">
					<view class="list_1_top">
						<view class="list_1_top_img">
							<image :src="item.g_pic"></image>
						</view>
						<view class="list_1_top_content">
							<view class="list_1_top_title f-nowrap f-hidden3">{{item.g_title}}</view>
							<view class="list_1_top_info">
								<view class="list_1_top_price">￥{{(+item.g_price).toFixed(2)}}</view>
								<view class="list_1_top_reward" style="opacity: 0;">(此处不显示)</view>
							</view>
						</view>
					</view>
					<view class="list_1_bottom">
						<view class="list_1_bottom_name">
							<text v-for="(data, index) in handle(item.usersnames)" :key="index">{{data}}</text>
						</view>
						<view class="list_1_bottom_result" style="color: #999;">还差 {{(+item.leijinum).toFixed(0)}} 人</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 已完成 -->
		<scroll-view scroll-y v-if="currentTab==2" class="done">
			<view class="FY FY-c FX-c" v-if="nodata_3" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="list" v-if="!!!nodata_3">
				<view class="list_1" v-for="(item, index) in doneData" :key="index">
					<view class="list_1_top">
						<view class="list_1_top_img">
							<image :src="item.g_pic"></image>
						</view>
						<view class="list_1_top_content">
							<view class="list_1_top_title f-nowrap f-hidden3">{{item.g_title}}</view>
							<view class="list_1_top_info">
								<view class="list_1_top_price">￥{{(+item.g_price).toFixed(2)}}</view>
								<view class="list_1_top_reward">拼购奖励：{{(+item.goods_value).toFixed(2)}}商品值</view>
							</view>
						</view>
					</view>
					<view class="list_1_bottom">
						<view class="list_1_bottom_name">
							<text v-for="(data, index) in handle(item.usersnames)" :key="index">{{data}}</text>
						</view>
						<view class="list_1_bottom_result" style="color: #F71122;">拼购成功</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import App from '../../App.vue';
	
	export default {
		data() {
			return {
				navbar: [
					{name: "所有"},
					{name: "拼购中"},
					{name: "已完成"}
				],
				currentTab: 0,
				nodata_1: false,
				nodata_2: false,
				nodata_3: false,
				allData: [],
				ingData: [],
				doneData: []
			}
		},
		onLoad: async function() {
			const proceedsdetail_res = await this.proceedsdetail(1);
			if (proceedsdetail_res.status === 200 && proceedsdetail_res.data.length !== 0 && !!proceedsdetail_res.data) {
				this.allData = proceedsdetail_res.data;
				this.nodata_1 = false;
			} else {
				this.nodata_1 = true;
				this.showToast(3, '暂无内容!');
			};
		},
		// 过滤姓名
		computed: {
			handle() {
				return function(data) {
					return data.map((item) => {
						const firstStr = item.charAt(0);
						return firstStr + '*';
					});
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
				this.$refs.toast.show(params)
			},
			// tab切换
			changeTab: async function(e){
				switch (this.currentTab) {
					case 0: this.allData = []; break;
					case 1: this.ingData = []; break;
					case 2: this.doneData = []; break;
					default: break;
				};
				this.currentTab = e.index;
				const proceedsdetail_res = await this.proceedsdetail((e.index + 1));
				if (proceedsdetail_res.status === 200 && proceedsdetail_res.data.length !== 0 && !!proceedsdetail_res.data) {
					switch (e.index) {
						case 0: this.allData = proceedsdetail_res.data; this.nodata_1 = false; break;
						case 1: this.ingData = proceedsdetail_res.data; this.nodata_2 = false; break;
						case 2: this.doneData = proceedsdetail_res.data; this.nodata_3 = false; break;
						default: break;
					};
				} else {
					switch (e.index) {
						case 0: this.nodata_1 = true; this.showToast(3, '暂无内容!'); break;
						case 1: this.nodata_2 = true; this.showToast(3, '暂无内容!'); break;
						case 2: this.nodata_3 = true; this.showToast(3, '暂无内容!'); break;
						default: break;
					};
				};
			},
			// 获取拼购明细
			proceedsdetail: async function(type) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.proceedsdetail,
						data: { type },
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reward{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
	}
	.tabs{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		box-sizing: border-box;
		z-index: 999;
	}
	.all, .ing, .done{
		width: 100%;
		height: 100%;
		padding-top: 90rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	.list{
		.list_1{
			display: flex;
			flex-direction: column;
			background-color: #FFF;
			border-radius: 20rpx;
			overflow: hidden;
			margin-bottom: 10rpx;
			.list_1_top{
				display: flex;
				padding: 20rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #EEE;
				.list_1_top_img{
					width: 120rpx;
					height: 120rpx;
					flex-shrink: 0;
					box-sizing: border-box;
					border-radius: 10rpx;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.list_1_top_content{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					padding-left: 20rpx;
					.list_1_top_title{
						width: 265*2rpx;
						font-size: 32rpx;
						color: #666666;
					}
					.list_1_top_info{
						display: flex;
						justify-content: space-between;
						font-size: 26rpx;
						color: #999;
						.list_1_top_price{
							flex-shrink: 0;
						}
					}
				}
			}
			.list_1_bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10rpx 30rpx;
				.list_1_bottom_name{
					text{
						display: inline-block;
						width: 50rpx;
						height: 50rpx;
						font-size: 30rpx;
						color: #999;
						line-height: 50rpx;
						text-align: center;
						border-radius: 50%;
						border: 2rpx solid #999;
						margin-left: -10rpx;
						background-color: #FFF;
					}
				}
				.list_1_bottom_result{
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>

<template>
	<view class="dongJie">
		<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
			<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
			暂无内容
		</view>
		<scroll-view scroll-y class="dongJie_content" v-if="!!!nodata">
			<view class="entrusbuylist_1" v-for="item in dongJieList">
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
						<text>价格:￥{{item.ut_price}}</text>
						<text>数量:{{item.stocknum}}份</text>
						<text>解除时间:{{getTime(item.ut_locktime)}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				nodata: false,
				dongJieList: []
			}
		},
		onLoad: async function() {
			const dongJie_res = await this.dongJie();
			// console.log("dongJie_res→", dongJie_res);
			// 请求是否成功
			if (dongJie_res.status !== 200) { this.nodata = true; this.showToast(dongJie_res.msg); return };
			// 请求到的数据是否为null
			if (!!!dongJie_res.data) { this.nodata = true; return };
			// 请求到的数据是否空
			if (dongJie_res.data.length === 0) { this.nodata = true; return };
			this.dongJieList = dongJie_res.data;
			// console.log("dongJieList→", this.dongJieList);
		},
		computed:{
			getTime() {
				return function(data) {
					let year = new Date(data*1000).getFullYear();
					let month = new Date(data*1000).getMonth()+1;
					let date = new Date(data*1000).getDate();
					month <10 && (month = "0"+month);
					date <10 && (date = "0"+date);
					return year+"-"+month+"-"+date;
				}
			}
		},
		methods: {
			// 信息反馈
			showToast: function(data) { uni.showToast({ title: data, icon: "none" }) },
			// 列表请求
			dongJie: async function() {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.frzeeinv,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dongJie {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
	}
	.dongJie_content {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}
	.entrusbuylist_1{
		padding: 18rpx;
		height: 151rpx;
		background: rgba(255,255,255,1);
		border-radius: 6rpx;
		display: flex;
		margin: 10rpx;
		box-sizing: border-box;
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
			padding-left: 20rpx;
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
	}
</style>

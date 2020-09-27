<template>
	<view class="xianHuo">
		<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
			<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
			暂无内容
		</view>
		<scroll-view scroll-y class="xianHuo_content" v-if="!!!nodata">
			<view class="entrusbuylist_1" v-for="item in xianHuoList">
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
				xianHuoList: []
			}
		},
		onLoad: async function() {
			const goodsstock_res = await this.goodsstock();
			// console.log("goodsstock_res→", goodsstock_res);
			// 请求是否成功
			if (goodsstock_res.status !== 200) { this.nodata = true; this.showToast(goodsstock_res.msg); return };
			// 请求到的数据是否为null
			if (!!!goodsstock_res.data) { this.nodata = true; return };
			// 请求到的数据是否空数组
			if (goodsstock_res.data.length === 0) { this.nodata = true; return };
			this.xianHuoList = goodsstock_res.data;
			// console.log("xianHuoList→", this.xianHuoList);
		},
		methods: {
			// 信息反馈
			showToast: function(data) { uni.showToast({ title: data, icon: "none", mask: true }) },
			// 列表请求
			goodsstock: async function() {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.goodsstock,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xianHuo {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
	}
	.xianHuo_content {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}
	.entrusbuylist_1{
		padding: 18rpx 20rpx;
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

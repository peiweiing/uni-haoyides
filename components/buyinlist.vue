<template>
	<view class="entrusbuylist">
		<view class="entrusbuylist_left">
			<view class="entrusbuylist_left_img">
				<image :src="buyinlist.imgUrl"></image>
			</view>
			<view class="entrusbuylist_left_text">
				{{buyinlist.code}}
			</view>
		</view>
		<view class="entrusbuylist_center" style="flex: 1;">
			<view class="entrusbuylist_right_title">{{buyinlist.title}}</view>
			<view class="entrusbuylist_right_price">
				<text>挂牌价:￥{{buyinlist.price > 999999 ? "999999.00+" : buyinlist.price.toFixed(2)}}</text>
				<text>数量:{{buyinlist.num > 999 ? '999+' : buyinlist.num}}份</text>
			</view>
		</view>
		<view class="entrusbuylist_right">
			<view class="tui-btn-box">
				<tui-button class="ntrusbuylist_right_button" type="green" plain @click="clickButton">
					{{buyinlist.button}}
				</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["buyinlist"],
		methods: {
			clickButton() {
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.entrusbuylist{
		padding: 18rpx 20rpx;
		height: 151rpx;
		background: rgba(255,255,255,1);
		border-radius: 6rpx;
		display: flex;
		margin-bottom: 10rpx;
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
				padding-top: 6rpx;
				color:rgba(102,102,102,1);
			}
		}
		.entrusbuylist_center{
			width: 100%;
			padding: 20rpx;
			padding-bottom: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.entrusbuylist_right_title{
				font-size: 26rpx;
				color:rgba(51,51,51,1);
			}
			.entrusbuylist_right_price{
				display: flex;
				justify-content: space-between;
				font-size: 20rpx;
				color:rgba(153,153,153,1);
			}
		}
		.entrusbuylist_right{
			display: flex;
			align-items: center;
			.ntrusbuylist_right_button{
				// width:220rpx !important;
				height:40rpx !important;
				font-size:22rpx !important;
				line-height:40rpx !important;
				padding: 0 20rpx;
			}
		}
	}
</style>

<template>
	<view class="entrusbuylist">
		<view class="entrusbuylist_left">
			<view class="entrusbuylist_left_img">
				<image :src="imgUrl"></image>
			</view>
			<view class="entrusbuylist_left_text">{{code}}</view>
		</view>
		<view class="entrusbuylist_center" style="flex: 1;">
			<view class="entrusbuylist_right_title">{{title}}</view>
			<view class="entrusbuylist_right_price">
				<view class=""><text>{{g_price}}</text><text>{{price}}</text></view>
				<view class=""><text>{{g_num}}</text><text>{{num}}</text></view>
			</view>
		</view>
		<view class="entrusbuylist_right">
			<view class="tui-btn-box">
				<tui-button class="ntrusbuylist_right_button" type="green" plain @click="clickButton">{{button}}</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgUrl:String,
			code:String,
			title:String,
			price:String,
			num:String,
			button:String,
			g_price:String,
			g_num:String
		},
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

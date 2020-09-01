<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in addressList" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-address-flex">
						<view class="tui-address-left">
							<view class="tui-address-main">
								<view class="tui-address-name tui-ellipsis">{{item.uadd_name}}</view>
								<view class="tui-address-tel">{{item.uadd_tel}}</view>
							</view>
							<view class="tui-address-detail">
								<view class="tui-address-label" v-if="item.uadd_default===1">默认</view>
								<view class="tui-address-label" v-if="index!=2">132</view>
								<text>
									{{item.uadd_province+"省-"+item.uadd_city+"市-"+item.uadd_area+"区-"+item.uadd_detail}}
								</text>
							</view>
						</view>
						<view class="tui-address-imgbox">
							<image class="tui-address-img" src="/static/images/mall/my/icon_addr_edit.png" />
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<tui-button
			shadow
			shape="circle"
			type="danger"
			height="88rpx"
			@click="editAddr"
			>
				+ 新增收货地址
			</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: "",
				addressList: []
			}
		},
		onLoad: function(options) {
			var that =this;
			uni.getStorage({
				key: 'token',
				success: function (res) {
					var getres = res.data;
					uni.request({
						method: "POST",
						url: "http://api.lovehou.com/api/user/Shippingaddress",
						header: {
							"Authorization": getres
							// "Authorization": "CCE7398F976214F932B340326B7A9C82"
						},
						success: res => {
							console.log(res.data.data)
							that.addressList = res.data.data
						}
					})
				}
			})
		},
		onShow: function() {},
		methods: {
			editAddr() {
				uni.navigateTo({
					url: "./newAddress"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}
	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tui-address-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
		padding-left: 30rpx;
	}
	.tui-address-name {
		width: 120rpx;
		height: 60rpx;
	}
	.tui-address-tel {
		margin-left: 10rpx;
	}
	.tui-address-detail {
		font-size: 24rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
	}
	.tui-address-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}
	.tui-address-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}
	.tui-address-img {
		width: 36rpx;
		height: 36rpx;
	}
	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 25rpx 30rpx;
		box-sizing: border-box;
		background: #fafafa;
	}
	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
	.tui-address-new /deep/ .tui-shadow-danger{
		background-color: #9E2036 !important;
	}
</style>

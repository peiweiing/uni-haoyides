<template>
	<view class="tui-safe-area">
		<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
			<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
			暂无内容
		</view>
		<scroll-view scroll-y class="tui-address" v-if="!!!nodata">
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
		</scroll-view>
		<view class="confirm_box">
			<button
			class="tui-button-primary"
			hover-class="tui-button-hover"
			formType="submit"
			type="primary"
			@click="navigateTo('./newAddress')"
			>
				+ 新 增 收 货 地 址
			</button>
		</view>
	</view>
</template>

<script>
	import App from "../../App.vue"
	export default {
		data() {
			return {
				nodata: false,
				addressList: []
			}
		},
		onLoad: async function() {
			const getAddressList_res = await this.getAddressList();
			console.log("收货地址列表请求:", getAddressList_res);
			// 请求是否成功
			if (getAddressList_res.status !== 200) { this.nodata = true; this.showToast(getAddressList_res.msg); return };
			// 请求到的数据是否为null
			if (!!!getAddressList_res.data) { this.nodata = true; return };
			// 请求到的数据是否空
			if (getAddressList_res.data.length === 0) { this.nodata = true; return };
			this.addressList = getAddressList_res.data;
			// console.log("addressList→", this.addressList);
		},
		methods: {
			// 信息反馈
			showToast: function(data) { uni.showToast({ title: data, icon: "none" }) },
			// 跳转页面
			navigateTo: function(url) { uni.navigateTo({ url }) },
			// 收货地址列表请求
			getAddressList: async function() {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.Shippingaddress,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tui-safe-area {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
	}
	.tui-address {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-bottom: 180rpx;
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
	.confirm_box{
		position: absolute;
		bottom: 80rpx;
		left: 40rpx;
		right: 40rpx;
		box-sizing: border-box;
	}
	.tui-button-primary{
		background-color: #9E2036;
	}
</style>

<template>
	<view class="tui-addr-box">
		<form :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input
					placeholder-class="tui-phcolor"
					class="tui-input"
					name="name"
					placeholder="请输入收货人姓名"
					maxlength="15"
					type="text"
					v-model="addressInfo.uadd_name"
					/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input
					placeholder-class="tui-phcolor"
					class="tui-input"
					name="mobile"
					placeholder="请输入收货人手机号码"
					maxlength="11"
					type="text"
					v-model="addressInfo.uadd_tel"
					/>
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-title-city-text">
							所在城市
						</text>
					</view>
					<input
					placeholder-class="tui-phcolor"
					class="tui-input"
					disabled
					name="city"
					placeholder="请选择城市"
					maxlength="50"
					type="text"
					v-model="addressInfo.uadd_name"
					/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<input
					placeholder-class="tui-phcolor"
					class="tui-input"
					name="address"
					placeholder="请输入详细的收货地址"
					maxlength="50"
					type="text"
					v-model="addressInfo.uadd_detail"
					/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-cell-title">地址类型</view>
					<view class="tui-addr-label">
						<text
						v-for="(item,index) in lists"
						:key="index"
						class="tui-label-item"
						:class="{'tui-label-active':index == typeIndex}"
						@click="addressType(index)"
						>
							{{item}}
						</text>
					</view>
				</view>
			</tui-list-cell>
			<!-- 默认地址 -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch
					:checked="addressInfo.uadd_default === 1 ? true : false "
					color="#19be6b"
					class="tui-switch-small"
					@change="switchDefault"
					/>
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save">
				<tui-button
				shadow
				type="danger"
				height="88rpx"
				shape="circle"
				@click="saveAddress"
				>
					保存收货地址
				</tui-button>
			</view>
			<view class="tui-del" v-if="false">
				<tui-button
				shadow
				type="gray"
				height="88rpx"
				shape="circle"
				>
					删除收货地址
				</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: ["家", "公司", "学校", "其他"],
				typeIndex: "",
				addressInfo: {
					uadd_name: "",
					uadd_tel: "",
					uadd_province: "",
					uadd_city: "",
					uadd_area: "",
					uadd_detail: "",
					uadd_type: "",
					uadd_default: 1,
				},
				token: ""
			}
		},
		methods: {
			addressType: function(index) {
				this.typeIndex = index
				this.addressInfo.uadd_type = index+1
				console.log(this.addressInfo)
			},
			saveAddress: function() {
				var that =this;
				uni.getStorage({
					key: 'token',
					success: function (res) {
						var getres = res.data;
						uni.request({
							method: "POST",
							url: "http://api.lovehou.com/api/user/addShippin",
							header: {
								"Authorization": getres
							},
							body: that.addressInfo,
							success: res => {
								console.log(res)
								// this.addressList = res.data.data
								// console.log(this.addressList)
							}
						})
					}
				})
			},
			switchDefault: function() {
				if (this.addressInfo.uadd_default === 1) {
					this.addressInfo.uadd_default = 0
				} else {
					this.addressInfo.uadd_default = 1
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tui-addr-box {
		padding: 20rpx 0;
	}
	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
	}
	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}
	.tui-input {
		width: 500rpx;
	}
	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}
	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}
	.tui-cell-title{
		font-size: 28rpx;
	}
	.tui-addr-label {
		margin-left: 70rpx;
	}
	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}
	.tui-label-active{
		background: #9E2036;
		border-color:#9E2036;
		color: #fff;
	}
	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}
	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}
	.tui-addr-save {
		padding: 24rpx 30rpx;
		margin-top: 100rpx;
	}
	.tui-addr-save /deep/ .tui-shadow-danger{
		background-color: #9E2036 !important;
	}
	.tui-del {
		padding: 24rpx 30rpx;
	}
	.tui-del /deep/ .tui-shadow-danger{
		background-color: #9E2036 !important;
	}
</style>

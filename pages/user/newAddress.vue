<template>
	<view class="container">
		<view class="tui-addr-box">
			<form :report-submit="true">
				<tui-list-cell :hover="false" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title">收货人:</view>
						<input
						placeholder-class="tui-phcolor"
						class="tui-input"
						name="name"
						placeholder="请输入收货人姓名"
						maxlength="11"
						type="text"
						v-model="addressInfo.uadd_name"
						/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title">手机号码:</view>
						<input
						placeholder-class="tui-phcolor"
						class="tui-input"
						name="mobile"
						placeholder="请输入手机号码"
						maxlength="11"
						type="number"
						v-model="addressInfo.uadd_tel"
						/>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="true" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title">
							<text class="tui-title-city-text">
								所在城市:
							</text>
						</view>
						<view class="region">
							<biaofun-region
							:defaultValue="defaultValue"
							@change="onChangeRegion"
							></biaofun-region>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title">收货地址:</view>
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
						<view class="tui-cell-title">地址类型:</view>
						<view class="tui-addr-label">
							<text
							v-for="(item,index) in lists"
							:key="index"
							class="tui-label-item"
							:class="{ 'tui-label-active' : (index + 1) === addressInfo.uadd_type }"
							@click="addressType(index)"
							>
								{{item}}
							</text>
						</view>
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
			</form>
		</view>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import App from '../../App.vue';
	import biaofunRegion from '@/components/biaofun-region/biaofun-region.vue';
	export default {
		components: {
			biaofunRegion
		},
		data() {
			return {
				lists: ["家", "公司", "学校", "其他"],
				typeIndex: "",
				defaultValue: [],
				uadd_id: -1,
				addressInfo: {
					uadd_name: "",
					uadd_tel: "",
					uadd_province: "北京市",
					uadd_city: "北京市",
					uadd_area: "东城区",
					uadd_detail: "",
					uadd_type: 1
				},
			}
		},
		onLoad: async function(option) {
			// 收货地址详情
			if (option.uadd_id) {
				this.uadd_id = option.uadd_id;
				const detailShipin_res = await this.detailShipin(option.uadd_id);
				this.addressInfo = detailShipin_res.data[0];
				this.defaultValue.push(detailShipin_res.data[0].uadd_province);
				this.defaultValue.push(detailShipin_res.data[0].uadd_city);
				this.defaultValue.push(detailShipin_res.data[0].uadd_area);
			};
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
			// 地址类型
			addressType: function(index) {
				this.typeIndex = index;
				this.addressInfo.uadd_type = index+1;
			},
			// 保存收货地址
			saveAddress: async function() {
				if (this.uadd_id === -1) {
					// 新增收货地址
					if (!this.addressInfo.uadd_name) {this.showToast(3, '请填写收货人姓名!'); return;};
					if (this.addressInfo.uadd_name.length > 4) {this.showToast(3, '姓名不得多于四个字!'); return;};
					if (!this.addressInfo.uadd_tel) {this.showToast(3, '请填写手机号码!'); return;};
					if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.addressInfo.uadd_tel))) {this.showToast(3, '请填写正确的手机号码!'); return;};
					if (!this.addressInfo.uadd_province) {this.showToast(3, '请填写所在城市!'); return;};
					if (!this.addressInfo.uadd_detail) {this.showToast(3, '请填写详细收货地址!'); return;};
					const addShippin_res = await this.addShippin(this.addressInfo);
					this.showToast(5, addShippin_res.msg, '即将返回收货地址页面...');
					setTimeout(() => { uni.navigateBack() }, 1500);
				} else {
					// 修改收货地址
					if (!this.addressInfo.uadd_name) {this.showToast(3, '请填写收货人姓名!'); return;};
					if (this.addressInfo.uadd_name.length > 4) {this.showToast(3, '姓名不得多于四个字!'); return;};
					if (!this.addressInfo.uadd_tel) {this.showToast(3, '请填写手机号码!'); return;};
					if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.addressInfo.uadd_tel))) {this.showToast(3, '请填写正确的手机号码!'); return;};
					if (!this.addressInfo.uadd_province) {this.showToast(3, '请填写所在城市!'); return;};
					if (!this.addressInfo.uadd_detail) {this.showToast(3, '请填写详细收货地址!'); return;};
					const editShippin_res = await this.editShippin(this.addressInfo);
					this.showToast(5, editShippin_res.msg, '即将返回收货地址页面...');
					setTimeout(() => { uni.navigateBack() }, 1500);
				};
			},
			// 城市联动选择
			onChangeRegion: function(region) {
				this.addressInfo.uadd_province = region[0].name;
				this.addressInfo.uadd_city = region[1].name;
				this.addressInfo.uadd_area = region[2].name;
			},
			// 新增收货地址
			addShippin: async function(data) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.addShippin,
						data,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 收货地址详情
			detailShipin: async function(uadd_id) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.detailShipin,
						data: { uadd_id },
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 收货地址修改
			editShippin: async function(data) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.editShippin,
						data,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
		box-sizing: border-box;
	}
	.tui-addr-box {
		box-sizing: border-box;
		height: 100%;
		padding: 40rpx 0;
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
		font-size: 32rpx;
	}
	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}
	.tui-input {
		width: 500rpx;
		font-size: 32rpx;
	}
	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 32rpx;
		padding-right: 30rpx;
	}
	.tui-phcolor {
		color: #ccc;
		font-size: 32rpx;
	}
	.tui-cell-title{
		font-size: 32rpx;
	}
	.tui-addr-label {
		margin-left: 70rpx;
	}
	.tui-label-item {
		width: 80rpx;
		height: 50rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 50rpx;
		margin-right: 20rpx;
		display: inline-block;
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
		font-size: 32rpx;
	}
	.tui-addr-save {
		box-sizing: border-box;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
	}
	.tui-addr-save /deep/ .tui-shadow-danger{
		background-color: #9E2036 !important;
	}
	.region{
		font-size: 32rpx;
		width: 100%;
	}
</style>

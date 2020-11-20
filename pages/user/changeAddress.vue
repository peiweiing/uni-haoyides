<template>
	<view class="area">
		<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px;height: calc(80vh);">
			<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
			<text style="color: #999; font-weight: bold;">暂无内容</text>
		</view>
		<scroll-view scroll-y class="tui-address" v-if="!!!nodata">
			<tui-swipe-action
			v-for="(item,index) in addressList"
			:key="index"
			:actions="actions"
			@click="handlerButton($event, item.uadd_id)"
			>
				<template v-slot:content>
					<block>
						<tui-list-cell padding="0">
							<view class="tui-address-flex">
								<view class="tui-address-left">
									<view class="tui-address-main">
										<view class="tui-address-name">
											{{item.uadd_name}}
										</view> 
										<view class="tui-address-tel">
											{{item.uadd_tel}}
										</view>
									</view>
									<view class="tui-address-detail">
										<view style="width: 156rpx;">
											<view
											class="tui-address-label"
											v-if="item.uadd_default===1"
											>
												默认
											</view>
											<view class="tui-address-label">
												{{typeAddress(item.uadd_type)}}
											</view>
										</view>
										<text class="address-detail">
											{{item.uadd_province}}-{{item.uadd_city}}-{{item.uadd_area}}-{{item.uadd_detail}}
										</text>
									</view>
								</view>
							</view>
						</tui-list-cell>
					</block>
				</template>
			</tui-swipe-action>
		</scroll-view>
		<view class="confirm_box" v-if="isButton">
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
				eid:'',
				nodata: false,
				isButton: true,
				addressList: [],
				actions: [{
						name: '删除',
						color: '#fff',
						fontsize: 30,
						width: 70,
						background: '#FD3B31'
					},{
						name: '修改',
						color: '#fff',
						fontsize: 30,
						width: 70,
						background: '#5677fc'
					},{
						name: '设为默认',
						width: 70,
						fontsize: 30,
						color: '#fff',
						background: '#C8C7CD'
					}]
			}
		},
		computed: {
			typeAddress() {
				return function(data) {
					if (data === 1) { return '家' };
					if (data === 2) { return '公司' };
					if (data === 3) { return '学校' };
					if (data === 4) { return '其他' };
				}
			}
		},
		onShow: async function() {
			const getAddressList_res = await this.getAddressList();
			if (getAddressList_res.status === 200 && getAddressList_res.data.length !== 0 && getAddressList_res.data) {
				this.addressList = getAddressList_res.data;
				this.nodata = false;
				this.isButton = false;
			} else {
				this.nodata = true;
				this.isButton = true;
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
			handleClick: async function(e) {
				let index = e.index;
				var _this = this;
				var id = _this.eid;
				if (index === 0) {
					// this.tui.toast('你点击了取消按钮');
				} else {
					// this.tui.toast('你点击了确定按钮');
					const delShippin_res =  await _this.delShippin(id);
					_this.showToast(1, delShippin_res.msg);
					setTimeout(() => { uni.redirectTo({ url: './changeAddress' }); }, 1500);
				}
				this.modal = false;
			},
			// 地址操作
			handlerButton: async function(e, id) {
				var _this = this;
				var that = this;
				_this.eid = id;
				// 点击删除
				if (e.index === 0) {
					that.modal=true;
					that.content="确认删除此收货地址?"
					// uni.showModal({
					//     title: '提示',
					//     content: '确认删除此收货地址?',
					//     success: async function (res) {
					//         if (res.confirm) {
					// 			const delShippin_res = await _this.delShippin(id);
					// 			_this.showToast(1, delShippin_res.msg);
					// 			setTimeout(() => { uni.redirectTo({ url: './changeAddress' }); }, 1500);
					//         };
					//     }
					// });
					return;
				};
				// 点击修改
				if (e.index === 1) { uni.navigateTo({ url: './newAddress?uadd_id='+id }); return; };
				// 点击设为默认
				if (e.index === 2) {
					let flag = false;
					// 判断该地址是否已经是默认地址
					_this.addressList.forEach(item => { if(item.uadd_id === id && item.uadd_default === 1){ flag = true; return; } });
					// 已经是默认地址
					if(flag){ _this.showToast(3, '该地址已经是默认地址了!'); return; }
					// 不是默认地址
					const setDefaultShip_res = await _this.setDefaultShip(id);
					_this.showToast(1, setDefaultShip_res.msg);
					setTimeout(() => { uni.redirectTo({ url: './changeAddress' }); }, 1500);
				};
			},
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
			},
			// 删除收货地址
			delShippin: async function(uadd_id) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.delShippin,
						data: { uadd_id },
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 设置默认收货地址
			setDefaultShip: async function(uadd_id) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.setDefaultShip,
						data: { uadd_id },
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.area {
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
		width: 140rpx;
		height: 60rpx;
		font-size: 36rpx;
	}
	.tui-address-tel {
		margin-left: 10rpx;
		font-size: 36rpx;
	}
	.tui-address-detail {
		font-size: 26rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
		display: flex;
	}
	.tui-address-label {
		padding: 0 10rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 4rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		line-height: 32rpx;
		transform-origin: center center;
		margin-right: 10rpx;
	}
	.confirm_box{
		position: absolute;
		bottom: 80rpx;
		left: 40rpx;
		right: 40rpx;
		box-sizing: border-box;
	}
	.tui-button-primary{
		background-color: #E33F38;
	}
	.address-detail{
		width: 275*2rpx;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
</style>

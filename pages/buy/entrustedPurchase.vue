<template>
	<view class="content">
		<!-- tab标签 -->
		<view class="tabs">
			<tui-tabs class="pickuplist_tabs" :tabs="navbar" :sliderWidth="150" :currentTab="currentTab>1?0:currentTab" @change="changeTab"
			 itemWidth="50%"></tui-tabs>
		</view>
		<!-- 委托买入 -->
		<scroll-view scroll-y v-if="currentTab==0" class="left_entrust">
			<view style="height: 80rpx;"></view>
			<view class="FY FY-c FX-c" v-if="isError" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>
			<view class="container">
				<view class="title_2" v-if="isSuccess">
					请选择商品
				</view>
				<tui-card class="tui-card" v-if="isSuccess" :image="bottomList.img[0].img" :title="bottomList.img[0].title" :tag="bottomList.img[0].tag"
				 @click="popup">
					<template v-slot:footer>
						<view class="tui-default" style="font-size: 24rpx; padding: 20rpx;">
							<view>
								价格:￥{{bottomList.g_price}}
							</view>
							<view>
								交易量:{{bottomList.g_salevol}}份
							</view>
							<view>
								交易金额:￥{{(bottomList.totalpay).toFixed(2)}}
							</view>
						</view>
						<view class="tui-tips">
							<tui-icon name="circle-fill" :size="30" :color="'#07C160'"></tui-icon>
						</view>
					</template>
				</tui-card>
				<view class="title_2" v-if="isSuccess">
					请填写购买信息
				</view>
				<view class="form_information" v-if="isSuccess">
					<form @submit="formSubmit">
						<tui-list-cell :hover="false" unlined>
							<view class="tui-line-cell">
								<view class="tui-title">价格区间：</view>
								<input placeholder-class="tui-phcolor" disabled class="tui-input" :placeholder="priceRange(bottomList.g_minprice, bottomList.g_maxprice)"
								 maxlength="50" type="digit" />
							</view>
						</tui-list-cell>
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">买入价格：</view>
								<input v-model="price" placeholder-class="tui-phcolor" class="tui-input" name="amount" placeholder="请输入买入价格"
								 maxlength="50" type="digit" />
							</view>
						</tui-list-cell>
						<tui-list-cell :hover="false">
							<view class="tui-line-cell">
								<view class="tui-title">买入数量：</view>
								<input v-model="num" placeholder-class="tui-phcolor" class="tui-input" name="amount2" placeholder="请输入买入数量"
								 maxlength="50" type="digit" />
							</view>
						</tui-list-cell>
						<view class="confirm_box">
							<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit" type="primary" @click="affirm(bottomList.g_id)">
								确 认 委 托 买 入
							</button>
						</view>
					</form>
				</view>
				<!--底部分享弹窗-->
				<tui-bottom-popup :show="popupShow" @close="popup">
					<view class="tui-share">
						<radio-group @change="radioChange">
							<scroll-view scroll-y class="tui-share-content">
								<view class="share-content-list" v-for="(item, index) in bottomLists" :key="index" @click="clickBottomList(index)">
									<tui-card class="tui-card-share" :image="item.img[0].img" :title="item.img[0].title" :tag="item.img[0].tag"
									 @click="popup">
										<template v-slot:footer>
											<view class="tui-default">
												<view>
													价格：￥{{item.g_price}}
												</view>
												<view>
													交易量：{{item.g_salevol}}份
												</view>
											</view>
											<view class="tui-default">
												<view>
													交易金额：￥{{item.totalpay}}
												</view>
											</view>
										</template>
									</tui-card>
									<label class="tui-checkbox">
										<tui-icon name="circle" :size="30" :color="'#07C160'" @click="popup" v-if="index !== current"></tui-icon>
										<tui-icon name="circle-fill" :size="30" :color="'#07C160'" @click="popup" v-if="index === current"></tui-icon>
									</label>
								</view>
							</scroll-view>
						</radio-group>
						<view class="tui-btn-cancle" @tap="popup">
							取消
						</view>
					</view>
				</tui-bottom-popup>
				<!--底部分享弹窗-->
			</view>
		</scroll-view>
		<!-- 摘牌买入 -->
		<scroll-view scroll-y="true" v-if="currentTab==1" class="right_delisting">
			<view style="height: 90rpx;"></view>
			<view class="zhaipai_content" v-for="(v,i) in detail" v-if="debool==true">
				<buylist :imgUrl="v.g_pic" :code="v.g_code" :title="v.g_title" :price="v.ut_price" :num="v.stock_num" g_price="买入价:￥"
				 g_num="数量:" button="买入" @click="showModal(v.g_id,v.ut_id)"></buylist>
			</view>
			<view class="FY FY-c FX-c" v-if="debool==false" style="font-size: 16px;height: calc(80vh);">
				<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
				暂无内容
			</view>

			<!--底部抽屉-->
			<tui-bottom-popup :show="bottomPopup" @close="hideModal">
				<view class="region-box">
					<tui-list-cell :hover="false" unlined>
						<view class="tui-line-cell">
							<view class="tui-title">商品名称：</view>
							<text>{{details.g_title}}</text>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">商品编码：</view>
							<text>{{details.g_code}}</text>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">摘牌价格：</view>
							<text>{{details.ut_price}}元</text>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">摘牌数量：</view>
							<text>{{details.stock_num}}</text>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">买入数量：</view>
							<view class="valnum FX">
								<button class='F-xy' type="primary" @click="valnumes">-</button>
								<input class="t-center" type="number" v-model="valnums" @input="inputChanges" />
								<button class='F-xy' type="primary" @click="valnumas">+</button>
							</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell">
							<view class="tui-title">合计：</view>
							<text>{{heji}}.00元</text>
						</view>
					</tui-list-cell>
					<view class="FX-sb w100" style="margin-top: 5%;">
						<tui-button type="green" width="280rpx" height="90rpx" :size="32" @click="cancel">取消</tui-button>
						<tui-button type="bronze" width="280rpx" height="90rpx" :size="32" @click="confirm(details.g_id,details.ut_id)">确定</tui-button>
					</view>
				</view>
			</tui-bottom-popup>
		</scroll-view>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :title="title" :content="content" :button="button"></tui-modal>
	</view>
</template>

<script>
	import App from "../../App.vue"
	import buylist from "../../components/buylist.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		components: {
			buylist
		},
		data() {
			return {
				title: '提示',
				content: '',
				modal: false,
				button: [{
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
				navbar: [{
						name: "委托买入"
					},
					{
						name: "摘牌买入"
					}
				],
				currentTab: 0,
				price: '',
				num: '',
				popupShow: false,
				bottomLists: [],
				bottomList: {},
				current: 0,
				isConfirm: false,
				isError: false,
				isSuccess: false,
				regionArr: [
					'大佑生宝小分子', '编码:16888802', '挂牌价:¥598.00', '挂牌数量:10份', '买入数量：2份', '合计:¥1196.00',
				],
				regionTxt: '粤',
				bottomPopup: false,
				debool: true,
				tabIndex: 26,
				detail: '',
				details: '',
				valnums: 0,
				heji: '',
				imgurls: "../../static/img/s02.jpg",
				data: [{
						id: 1,
						imgUrl: "../../static/img/s02.jpg",
						title: "大佑生宝小分子海参饮品",
						price: 598,
						num: 10,
						code: 123456789,
						button: "买入"
					},
					{
						id: 2,
						imgUrl: "../../static/img/s02.jpg",
						title: "大佑生宝小分子海参饮品",
						price: 598,
						num: 10,
						code: 123456789,
						button: "买入"
					},
					{
						id: 3,
						imgUrl: "../../static/img/s02.jpg",
						title: "大佑生宝小分子海参饮品",
						price: 598,
						num: 10,
						code: 123456789,
						button: "买入"
					},
					{
						id: 4,
						imgUrl: "../../static/img/s02.jpg",
						title: "大佑生宝小分子海参饮品",
						price: 598,
						num: 10,
						code: 123456789,
						button: "买入"
					},
					{
						id: 5,
						imgUrl: "../../static/img/s02.jpg",
						title: "大佑生宝小分子海参饮品",
						price: 598,
						num: 10,
						code: 123456789,
						button: "买入"
					},
					{
						id: 6,
						imgUrl: "../../static/img/s02.jpg",
						title: "大佑生宝小分子海参饮品",
						price: 598,
						num: 10,
						code: 123456789,
						button: "买入"
					},
					{
						id: 7,
						imgUrl: "../../static/img/s02.jpg",
						title: "大佑生宝小分子海参饮品",
						price: 598,
						num: 10,
						code: 123456789,
						button: "买入"
					},
					{
						id: 8,
						imgUrl: "../../static/img/s02.jpg",
						title: "大佑生宝小分子海参饮品",
						price: 598,
						num: 10,
						code: 123456789,
						button: "买入"
					},
					{
						id: 9,
						imgUrl: "../../static/img/s01.jpg",
						title: " 丽醒海带精萃饮植物饮品",
						price: 68,
						num: 10,
						code: 123456789,
						button: "买入"
					}
				],
				user: 0
			}
		},
		onShow() {
			var that = this;
			that.sendRequest({
				url: App.entrustlst,
				method: 'POST',
				success: (res) => {
					console.log(res)
					if (res.status === 200) {
						if (res.data.length !== 0) {
							that.bottomList = res.data[0];
							that.bottomLists = res.data;
							if (that.bottomLists.length === 0) {
								that.isError = true;
							} else {
								that.isSuccess = true;
							}
						} else {
							that.isError = true;
						}
					} else {
						that.isError = true;
						that.showToast(2, res.msg);
					}
				},
				fail: function(e) {
					console.log(e);
				}
			});
			this.sendRequest({
				url: App.getEntrusBuyList,
				method: 'POST',
				success: function(res) {
					console.log(res);
					if (res.data.length) {
						that.debool = true;
					} else {
						that.debool = false;
					}
					that.detail = res.data;
				},
				fail: function(e) {
					console.log("getchannel  fail:" + JSON.stringify(e));
					that.debool = false;
				}
			});
		},
		computed: {
			priceRange() {
				return function(min, max) {
					if (!min || !max) {
						return "00.00~00.00"
					} else {
						return min + "~" + max
					}
				}
			}
		},
		methods: {
			// 信息反馈
			showToast: function(type, msg, msg2) {
				let params = {
					title: msg,
					imgUrl: "../../static/img/toast/check-circle.png",
					icon: true,
					duration: 1000
				};
				switch (type) {
					case 1:
						params.title = msg;
						params.imgUrl = "../../static/img/toast/check-circle.png";
						break;
					case 2:
						params.title = msg;
						params.imgUrl = "../../static/img/toast/fail-circle.png";
						break;
					case 3:
						params.title = msg;
						params.imgUrl = "../../static/img/toast/info-circle.png";
						break;
					case 4:
						params.title = msg;
						params.icon = false;
						break;
					case 5:
						params.title = msg;
						params.content = msg2;
						break;
					default:
						break;
				}
				this.$refs.toast.show(params);
			},
			changeTab: function(e) {
				this.currentTab = e.index
			},
			formSubmit: function(e) {
				console.log(e)
				//表单规则
				let rules = [{
					name: "amount",
					rule: ["required", "isAmount"],
					msg: ["请输入买入价格", "允许保留两位小数"]
				}, {
					name: "amount2",
					rule: ["required", "isAmount"],
					msg: ["请输入买入数量", "数量必须为整数"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					if (Number(this.price) <= Number(this.bottomList.g_maxprice) && Number(this.price) >= Number(this.bottomList.g_minprice)) {
						this.isConfirm = true;
					} else {
						this.isConfirm = false
						this.showToast(3, "请输入正确的价格区间");
					}
				} else {
					this.isConfirm = false
					this.showToast(3, checkRes);
				}
			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast('你点击了取消按钮');
				} else {
					// this.tui.toast('你点击了确定按钮');
					uni.navigateTo({
						url: '../user/realName'
					})
				}
				this.modal = false;
			},
			affirm(e) {
				if (this.isConfirm) {
					var that = this;
					// 数量小于零
					if (that.num <= 0) {
						that.showToast(3, "至少买入1件商品");
						return;
					};
					// 数量是否为小数
					let str = that.num + '';
					const index = str.indexOf('.');
					if (index !== -1) {
						that.showToast(3, "数量必须为整数");
						return;
					};
					var datas = {
						'g_id': e,
						'num': Number(that.num),
						'price': Number(that.price),
					};
					uni.getStorage({
						key: "user",
						success: function(res) {
							that.user = res.data
						if (that.user != 1) {
								console.log(that.user);
								that.modal = true;
								that.content = "请先实名认证";
								// uni.showModal({
								//  title: '提示',
								//  content: '请先实名认证',
								//  success: res => { if (res.confirm) { uni.navigateTo({ url: '../user/realName' }) } }
								// });
							} else {
								that.sendRequest({
									url: App.entrustpurchase,
									method: 'POST',
									data: datas,
									success: (res) => {
										console.log("确认委托买入", res)
										that.productList = res;
										that.showToast(1, that.productList.msg);
										that.price = ""
										that.num = ""
										that.isConfirm = false
									},
									fail: function(e) {
										console.log(e);
									}
								});
							}
						},
					});
				}
			},
			popup: function() {
				this.popupShow = !this.popupShow
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.bottomList.length; i++) {
					if (this.bottomList[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			clickBottomList: function(index) {
				this.current = index
				this.bottomList = this.bottomLists[index]
			},

			showModal: function(e, i) {
				console.log(e, i)
				var that = this;
				var datas = {
					"g_id": e,
					"ut_id": i
				};

				this.sendRequest({
					url: App.entrusBuyList,
					method: 'POST',
					data: datas,
					success: function(res) {
						console.log("getchannel success:" + JSON.stringify(res));
						that.details = res.data;
						that.heji = that.valnums * that.details.ut_price;
						if (that.details.stock_num < 0) {
							that.valnums = 0
						}
					},
					fail: function(e) {
						console.log("getchannel  fail:" + JSON.stringify(e));
					},
					complete: function(e) {
						that.valnums = 0;
						that.heji = that.valnums * that.details.ut_price;
					}
				});
				this.bottomPopup = true;
				console.log("买入", Math.random())
			},
			hideModal: function() {
				this.bottomPopup = false;
			},
			cancel: function() {
				this.bottomPopup = false;
				// this.valnums = 1;
			},
			confirm: function(a, b) {
				console.log(a, b)
				var that = this;
				var datas = {
					"g_id": a,
					"ut_id": b,
					"entry_num": that.valnums
				};
				console.log(that.valnums)
				if (that.valnums < 1) {
					that.showToast(2, "请正确选择买入数量");
				} else {
					uni.getStorage({
						key: "user",
						success: function(res) {
							that.user = res.data
							if (that.user != 1) {
								that.modal = true;
								that.content = '请先实名认证';
								// uni.showModal({
								// 	title: '提示',
								// 	content: '请先实名认证',
								// 	success: res => { if (res.confirm) { uni.navigateTo({ url: '../user/realName' }) } }
								// });
							} else {
								that.sendRequest({
									url: App.entrustOrderInfo,
									method: 'POST',
									data: datas,
									success: function(res) {
										console.log("getchannel success:" + JSON.stringify(res));
										// that.details=res.data.data;

										if (res.status == 200) {
											that.bottomPopup = false;
											uni.navigateTo({
												url: '../user/cashierz?gid=' + a + '&uid=' + b + '&num=' + that.valnums
											});
										} else {
											that.showToast(2, res.msg);
										}
									},
									fail: function(e) {
										console.log(e);
									},
									// complete:function(e){
									// 	that.valnums = 1;
									// }
								});
							}
						},
					});
				}
				this.bottomPopup = false;
			},
			inputChanges(e) {
				var that = this;
				that.valnums = e.detail.value
				console.log(e.detail.value)
			},
			valnumes() {
				var that = this;
				if (that.valnums > 0) {
					that.valnums--;
				} else {
					that.valnums = 0
				}
				that.heji = that.valnums * that.details.ut_price;
			},
			valnumas() {
				var that = this;
				if (that.valnums < that.details.stock_num) {
					that.valnums++;
				} else {
					that.valnums = that.details.stock_num
				}
				that.heji = that.valnums * that.details.ut_price;
			}
		},
		onPullDownRefresh: function() {
			console.log("刷新了页面", Math.random())
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #EEE;
	}

	.container {
		padding: 30rpx;
	}

	.tabs {
		position: fixed;
		z-index: 1;
	}

	.left_entrust,
	.right_delisting {
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}

	.title_2 {
		font-size: 32rpx;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
		font-weight: bold;
	}

	.tui-card {
		margin: 0 !important;
	}

	.tui-card /deep/ .tui-card-header {
		width: 86%;
	}

	.tui-default {
		padding: 6rpx 20rpx;
		color: #999;
		font-size: 26rpx;
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.tui-tips {
		position: absolute;
		top: 240rpx;
		right: 60rpx;
	}

	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		text-align: center !important;
		font-size: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}

	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}

	.confirm_box {
		position: absolute;
		bottom: 80rpx;
		left: 30rpx;
		right: 30rpx;
	}

	.tui-button-primary {
		background-color: #07C160;
	}

	.form_information {
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-share {
		background: #e8e8e8;
		position: relative;
		padding: 20rpx;
	}

	.tui-share-content {
		height: 800rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 100rpx;

		.share-content-list {
			display: flex;
			margin-top: 20rpx;
			align-items: center;
			background-color: #ffffff;
			border-radius: 6rpx;

			.tui-card-share {
				flex: 1;
			}

			.tui-checkbox {
				width: 16%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.tui-btn-cancle {
		height: 100rpx;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f6f6f6;
		font-size: 36rpx;
		color: #3e3e3e;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-box {
		position: relative;
		z-index: 9;
	}

	.btn-box:first-child {
		margin-top: 50rpx;
	}

	.d-container {
		width: 400rpx;
		padding: 80rpx 30rpx;
	}

	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 240rpx;
		font-size: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}

	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}

	.valnum button {
		width: 1.2rem;
		height: 1.2rem;
		font-size: 56rpx;
		color: #000;
		line-height: 1.2rem;
		border-radius: 0px;
		text-align: center;
		background-color: #fff;
	}

	.valnum button:after {
		border-radius: 0px;
		border: none;
	}

	.valnum input {
		width: 2rem;
	}

	/*底部抽屉样式 start*/
	.region-box {
		width: 100%;
		padding: 10%;
		box-sizing: border-box;
		overflow: hidden;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.region-txt {
		width: 45%;
		height: 82rpx;
		line-height: 82rpx;
		border-radius: 6rpx;
		font-size: 30rpx;
		color: #333;
		text-align: center;
		margin-bottom: 24rpx;
		/* flex-grow: 1; */
	}

	.region-txt:nth-of-type(6n) {
		margin-right: 0;
	}

	.grow {
		flex-grow: 0;
	}

	.zhaipai_content {
		padding: 0 20rpx;
	}

	/*底部抽屉样式 end*/
	/deep/ .tui-green-outline {
		color: #07C160 !important;
		border: 2rpx solid #07C160 !important;
	}

	/deep/ .tui-green-outline::after {
		border: none !important;
	}
</style>

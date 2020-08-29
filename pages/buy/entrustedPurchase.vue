<template>
	<view class="container">
		
		<view class="title_2">
			请选择商品
		</view>
		<tui-card class="tui-card" :image="bottomLists[0].img[0].img" :title="bottomLists[0].img[0].title" :tag="bottomLists[0].img[0].tag" @click="popup(0)">
			<template v-slot:footer>
				<view class="tui-default">
					<view class="">
						价格：￥{{(cardInfo.price).toFixed(2)}}
					</view>
					<view class="">
						交易量：{{(cardInfo.num).toFixed(2)}}
					</view>
					<view class="">
						交易金额：￥{{(cardInfo.price * cardInfo.num).toFixed(2)}}
					</view>
				</view>
			</template>
		</tui-card>
		
		<view class="title_2">
			请填写购买信息
		</view>
		<view class="form_information">
			<form @submit="formSubmit">
				<tui-list-cell :hover="false" unlined>
					<view class="tui-line-cell">
						<view class="tui-title">价格区间：</view>
						<input placeholder-class="tui-phcolor" disabled class="tui-input" placeholder="99.00 ~ 999.00" maxlength="50" type="digit" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">买入价格：</view>
						<input v-model="price" placeholder-class="tui-phcolor" class="tui-input" name="amount" placeholder="请输入买入价格" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">买入数量：</view>
						<input v-model="num" placeholder-class="tui-phcolor" class="tui-input" name="amount2" placeholder="请输入买入数量" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
			
				<view class="confirm_box">
					<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit" type="primary" @click="affirm(bottomList.g_id)">确 认 委 托 买 入</button>
				</view>
			</form>
		</view>
		
		<!--底部分享弹窗-->
		<tui-bottom-popup :show="popupShow" @close="popup(0)">
			<view class="tui-share">
				<radio-group @change="radioChange">
					<scroll-view class="tui-share-content">
						<view class="share-content-list" v-for="(item, index) in bottomLists" :key="index" @click="clickBottomList(index)">
							<tui-card class="tui-card-share" :image="item.img[0].img" :title="item.img[0].title" :tag="item.img[0].tag" @click="popup(item)">
								<template v-slot:footer>
									<view class="tui-default">
										<view class="">
											价格:￥{{item.g_price}}
										</view>
										<view class="">
											交易量:{{item.g_salevol}}
										</view>
										<view class="">
											交易金额:￥{{item.totalpay}}
										</view>
									</view>
								</template>
							</tui-card>
							<label class="tui-checkbox">
								<!-- <radio :value="item.value" :checked="index === current" @click="popup" style="display: none;"></radio> -->
								<tui-icon name="circle" :size="30" :color="'#9E2036'" @click="popup(item)" v-if="index !== current"></tui-icon>
								<tui-icon name="circle-fill" :size="30" :color="'#9E2036'" @click="popup(item)" v-if="index === current"></tui-icon>
							</label>
						</view>
					</scroll-view>
				</radio-group>
				<view class="tui-btn-cancle" @tap="popup(0)">取消</view>
			</view>
		</tui-bottom-popup>
		<!--底部分享弹窗-->
		
	</view>
</template>

<script>
	import App from "../../App.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				price:'',
				num:'',
				cardInfo: {
					price: 260,
					num: 45
				},
				card: [
					{
						img: { url: "/static/images/news/avatar_1.jpg" },
						title: { text: "陆羽经云南茶叶" },
						tag: { text: "编码：789456123" },
						header: { bgcolor: "#F7F7F7", line: true }
					}
				],
				popupShow: false,
				bottomLists:'',
				bottomList: [
					{
						card: [{
							img: {	url: "/static/images/news/avatar_1.jpg"},
							title: {	text: "陆羽经云南茶叶"},
							tag: {	text: "编码：789456123"},
							header: {	bgcolor: "#F7F7F7",	line: true}
						}],
						price: 260,
						num: 20,
						value: "01"
					},
					{
						card: [{
							img: {url: "/static/images/news/avatar_1.jpg"},
							title: {text: "陆羽经云南茶叶"},
							tag: {text: "编码：963852741"},
							header: {bgcolor: "#F7F7F7",line: true}
						}],
						price: 280,
						num: 10,
						value: "02"
					},
					{
						card: [{
							img: {url: "/static/images/news/avatar_1.jpg"},
							title: {text: "陆羽经云南茶叶"},
							tag: {text: "编码：1597538624"},
							header: {bgcolor: "#F7F7F7",line: true}
						}],
						price: 240,
						num: 30,
						value: "03"
					}
				],
				current: 0
			}
		},
		onLoad() {
			var that =this;
			uni.getStorage({
				key: 'token',
				success: function (res) {
					var getres = res.data;
					uni.request({
						url: App.entrustlst,
						method: 'POST',
						header: {'Authorization':getres},
						success: (res) => {
							console.log(res.data);
							that.bottomLists = res.data.data;
							console.log(that.bottomLists)
						}
					});
				}
			})
		},
		methods: {
			formSubmit: function(e) {
				//表单规则
				let rules = [{
					name: "amount",
					rule: ["required", "isAmount"],
					msg: ["请输入买入价格", "请输入正确的买入价格，允许保留两位小数"]
				}, {
					name: "amount2",
					rule: ["required", "isAmount"],
					msg: ["请输入买入数量", "请输入正确的买入数量"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			affirm(e){
				var that =this;
				uni.getStorage({
					key: 'token',
					success: function (res) {
						var getres = res.data;
						var datas={'g_id':e,'num':that.num,'price':that.price,}
						uni.request({
							url: App.entrustpurchase,
							method: 'POST',
							header: {'Authorization':getres},
							data:datas,
							success: (res) => {
								console.log(res.data);
								that.productList=res.data.data;
							}
						});
					}
				})
			},
			popup: function(data) {
				this.popupShow = !this.popupShow
				data === 0 ? "" : console.log(data.value)
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
			}
		},
		onPullDownRefresh: function(){
			console.log("刷新了页面", Math.random())
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background:rgba(238,238,238,1);
	}
	.container {
		padding: 30rpx;
	}
	.title_2{
		font-size: 32rpx;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
		font-weight: bold;
	}
	.tui-card{
		margin: 0 !important;
	}
	.tui-default {
		padding: 20rpx;
		color: #999;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
	}
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-title {
		text-align: right;
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
	.confirm_box{
		position: absolute;
		bottom: 80rpx;
		left: 30rpx;
		right: 30rpx;
	}
	.tui-button-primary{
		background-color: #9E2036;
	}
	.form_information{
		border-radius: 10rpx;
		overflow: hidden;
	}
	.tui-share {
		height: 800rpx;
		background: #e8e8e8;
		position: relative;
		padding: 20rpx;
	}
	.tui-share-content{
		display: flex;
		flex-direction: column;
		.share-content-list{
			display: flex;
			margin-top: 20rpx;
			align-items: center;
			background-color: #ffffff;
			.tui-card-share{
				flex: 1;
			}
			.tui-checkbox{
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
</style>

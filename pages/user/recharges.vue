<template>
	<view class="recharge">
		
			<view class="info">
				<tui-list-cell :hover="false">
					<view class="tui-line-cell f-bold" style="font-size: 16px;">
						为方便确认您的充值金额，请充值以下金额：
					</view>
					
					<!-- <view class="tui-flex-box">
						<tui-tag margin="20rpx 20rpx 0 0" type="light-green" @click="show">{{orderInfo}}</tui-tag>
					</view> -->
					<view class="box FX-c">
						<view class="item tui-light-primary F-xy">
							<view>{{orderInfo}} 元</view>
						</view>
					</view>
				</tui-list-cell> 
				
				<tui-list-cell :hover="false">
					<view class="tui-line-cell f-bold FX" style="font-size: 16px;">
						<text>
							长按图片保存二维码到手机相册，并使用
							<text v-show="types=='微信'" style="color: red;font-size: 18px;">微信</text>
							<text v-show="types=='支付宝'" style="color: red;font-size: 18px;">支付宝</text>
							<!-- <text v-if="types=='微信'" style="color: red;font-size: 18px;">微信</text>
							<text v-if="types=='支付宝'" style="color: red;font-size: 18px;">支付宝</text> -->
							扫一扫：
						</text>
						
					</view>
					<!-- <swiper :autoplay="true" :interval="5000" :duration="150" :circular="true" style="height: 550rpx;"
						 @change="bannerChange">
						<block v-for="(item, index) in banner" :key="index">
							<swiper-item :data-index="index" @tap.stop="previewImage1">
								<image :src="item" style="width: 90%;height: 500rpx;padding: 4%;"/>
							</swiper-item>
						</block>
					</swiper> -->
					<!-- <view :autoplay="true" :interval="5000" :duration="150" :circular="true" style="height: 550rpx;"
						 @change="bannerChange">
						<view class="FX-c" @tap.stop="previewImage2(banner)">
							<image :src="banner" style="width: 70%;height: 500rpx;padding: 4%;"/>
						</view>
					</view> -->
					<view :autoplay="true" :interval="5000" :duration="150" :circular="true"
						 @change="bannerChange">
						<view class="FX-c" @longtap="previewImage(banner)">
							<!-- <image :src="banner" style="width: 60%;padding: 4%;"/> -->
							<image :src="banner" mode="heighFix" style="width: 60%;"></image>
						</view>
					</view>
				</tui-list-cell>
				
				<tui-list-cell :hover="false">
					<view class="tui-line-cell f-bold" style="font-size: 16px;">
						请在30分钟之内完成支付，否则订单自动失效
					</view>
				</tui-list-cell> 
				
			</view>
				
			
			<view class="butn">
				<button
				:disabled="disabled"
				class="tui-button-primary"
				hover-class="tui-button-hover"
				@tap="payment"
				type="primary"
				>
					我已付款
				</button>
			</view>
		<!-- </form> -->
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
		<tui-modal :show="modal3" @click="handleClick3" @cancel="hide3" :content="content" :button="button3"></tui-modal>
	</view>
</template>

<script>
	import App from "../../App.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				modal3: false,
				banner:'',pid:'',
				payChoose: 1, // 支付方式
				total: "" , // 充值金额
				conTotal: "", // 确认充值金额
				orderInfo: "", // 订单信息
				types:'',
				disabled:false,
				content:'',
				button3: [
					{
						text: '确定',
						type: 'red'
					}
				],
			}
		},
		// onShow() {
		// 		let pages = getCurrentPages();
		// 		let nowPage = pages[ pages.length - 1];
		// 		let prevPage = pages[ pages.length - 2 ];
		// 		prevPage.$vm.module.g_salevol = res.data.g_salevol;
		// 		prevPage.$vm.module.total_inv = res.data.total_inv;   
		// 		uni.navigateBack({
		// 			delta:1,
		// 			success: function() {
		// 				beforePage.onLoad(); 
		// 			},
		// 		});
		// },
		onLoad(e) {
			const datas = JSON.parse(decodeURIComponent(e.data));
			this.types = datas.paymentinfo.type;
			this.pid = datas.recharge_confirminfo.id;
			this.banner = datas.paymentinfo.image_url;
			this.orderInfo = datas.recharge_confirminfo.total_money;
			console.log(e);
			console.log(datas);
			console.log(this.banner);
			
		},
		// onLoad(e) {
		// 	console.log(e);
		// 	let that =this;
		// 	let data ={money:e.money};
		// 	that.sendRequest({
		// 		url :App.getRechargeInfo,
		// 		method:'POST',
		// 		data:data,
		// 		success : function(res){
		// 			console.log("确认充值",res.data)
		// 			let datas = res.data.recharge_confirminfo;
		// 			that.types = datas.paymentinfo.type;
		// 			that.pid = datas.paymentinfo.id;
		// 			that.banner=datas.paymentinfo.image_url;
		// 			that.orderInfo=datas.total_money;
		// 			console.log("types",that.types);
		// 			console.log("typesreq",datas.paymentinfo.type);
		// 		},
		// 		fail:function(e){
		// 			console.log("fail:" + JSON.stringify(e));
		// 		}
		// 	});
		// },
		methods: {
			
			handleClick3(e) {
				let index = e.index;
				if (index === 0) {
					uni.reLaunch({
						url: './userCenter',
					})
					// this.tui.toast('你点击了确定按钮');
				}
				this.modal3 = false;
			},
			show() {
				this.tui.toast("click~")
			},
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current;
			},
			// previewImage1: function(e) {				
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '长按图片保存'
			// 	});
			// 	let index = e.currentTarget.dataset.index;
			// 	uni.previewImage({
			// 		current: this.banner[index],
			// 		urls: this.banner
			// 	});
			// },
			// previewImage2: function(e) {	
				// uni.previewImage({  
				// 	urls:[this.banner],
					// longPressActions:{
					// 	itemList:['发送给朋友','保存图片','收藏'],
					// 	success:function(res){
					// 		console.log("选中了"+(data.tapIndex+1)+"个按钮，第"+(data.index+1)+"张图片")
					// 	},
					// 	fail:function(err){
					// 		console.log(err);
					// 	}
					// }
				// });
				
			// },
			previewImage: function(e) {	
				let that = this;
				console.log('保存二维码')
				uni.downloadFile({           //获得二维码的临时地址
					url:that.banner,
					success:(res)=>{
						console.log('获取url',res)
						if(res.statusCode == 200){
							uni.saveImageToPhotosAlbum({
								filePath:res.tempFilePath,//传入临时地址
								success(succ) {
									console.log('成功',succ);
									uni.showToast({
										icon: 'none',
										title: '图片保存成功'
									});
								},
								fail(fa) {
									console.log('失败',fa)
								}
							})
						}
					}
				})
			},
			payment(){
				let that =this;
				let data ={id:that.pid};
				that.disabled=true;
				that.sendRequest({
					url :App.createRecharge,
					method:'POST',
					data:data,
					success : function(res){
						console.log("我已付款",res);
						if(res.status=='200'){
							// that.handleClick3();
							that.modal3=true;
							that.content="充值正在核实中，预计十分钟左右到账!"
							// uni.showModal({
							// 	showCancel:false,
							// 	title: '提示',
							// 	content: '充值正在核实中，预计十分钟左右到账!',
							// 	success: function (res) {
							// 		if (res.confirm) {
							// 			uni.reLaunch({
							// 				url: './userCenter',
							// 			})
							// 			console.log('用户点击确定');
							// 		}
							// 	},
							// });
							// that.disabled=false;
						}
				
					},
					fail:function(e){
						console.log("fail:" + JSON.stringify(e));
					},
					complete:function(e){
						console.log("complete:" + JSON.stringify(e));
						that.disabled=false;
					},
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/style/thorui.css';
	.recharge{
		min-height: calc(100vh);
		box-sizing: border-box;
		width: 100%;
		padding: 2%;
		background-color: #EEE;
	}
	.container {
		padding: 80rpx 40rpx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 180rpx;
	}
	uni-button[disabled]{
		background-color: #9E2036;
	}
	.tui-flex-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 26rpx;
	}
	.box {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		.item {
			width: 48%;
			padding: 30rpx 24rpx;
			box-sizing: border-box;
			border-radius: 8rpx;
			color: #fff;
			margin: 30rpx 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 24px;
		}
	}
	.tui-light-primary{
		background-image:linear-gradient(to right,#5c8dff, #00aaff,#5c8dff);
	}
	// .box .item:target,.box .item:hover{
	// 	border: 1px solid #000;
	// }
	
	.color {
		padding-top: 24rpx;
	}
	
	.info{
		border-radius: 20rpx;
		overflow: hidden;
	}
	.choose{
		font-size: 32rpx;
		color: #808080;
		margin: 40rpx;
	}
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tui-title {
		width: 240rpx;
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
	.tui-cell-hover{
		background-color: #fff!important;
	}
	.confirm_box{
		position: absolute;
		bottom: 80rpx;
		left: 40rpx;
		right: 40rpx;
		box-sizing: border-box;
	}
	.butn{
		margin-top: 6%;
	}
	.tui-button-primary{
		background-color: #9E2036;
	}
	.payment_cho{
		padding-right: 20rpx;
		display: flex;
		justify-content: space-between;
		.payment{
			display: flex;
			align-items: center;
			font-size: 32rpx;
		}
	}
</style>

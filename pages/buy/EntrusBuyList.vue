<template>
	<view id="entrusbuylist">
		<buyinlist v-for="item in data" :buyinlist="item" :key="item.id" @click="showModal"></buyinlist>
		
		<!--底部抽屉-->
		<tui-bottom-popup :show="bottomPopup" @close="hideModal">
			<view class="region-box">
				<view
					class="region-txt"
					:class="[index == regionArr.length - 3 || index == regionArr.length - 2 || index == regionArr.length - 1 ? 'grow' : '', tabIndex == index ? 'active' : '']"
					v-for="(item, index) in regionArr"
					:key="index"
					:data-index="index"
				>
					<text class="w40">{{ item }}</text>
				</view>
				<view class="FX-sb w100">
					<tui-button type="green" width="280rpx" height="90rpx" :size="32" @click="cancel">取消</tui-button>
					<tui-button type="bronze" width="280rpx" height="90rpx" :size="32" @click="confirm">确定</tui-button>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	import buyinlist from "../../components/buyinlist.vue"
	export default {
		components: {
			buyinlist
		},
		data() {
			return {
				regionArr: [
					'大佑生宝小分子','编码:16888802','挂牌价:¥598.00','挂牌数量:10份','买入数量：2份','合计:¥1196.00',
				],
				regionTxt: '粤',
				bottomPopup: false,
				tabIndex: 26,
				data: [
					{id: 1,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 2,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 3,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 4,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 5,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 6,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 7,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 8,imgUrl: "../../static/img/s02.jpg",title: "大佑生宝小分子海参饮品",price: 598,num: 10,code: 123456789,button: "买入"},
					{id: 9,imgUrl: "../../static/img/s01.jpg",title: " 丽醒海带精萃饮植物饮品",price: 68,num: 10,code: 123456789,button: "买入"}
				]
			}
		},
		methods: {
			showModal: function() {
				this.bottomPopup = true;
				console.log("买入", Math.random())
			},
			hideModal: function() {
				this.bottomPopup = false;
			},
			cancel: function() {
				this.bottomPopup = false;
			},
		},
		onPullDownRefresh() {
			console.log("刷新了页面", Math.random())
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 2000)
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width:100%;
		height:100%;
		background:rgba(238,238,238,1);
		padding: 30rpx;
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


/*底部抽屉样式 end*/
</style>

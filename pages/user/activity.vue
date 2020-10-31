<template>
	<view class="page">
		<view class="bgcImg">
			<view class="FX-sa FY-c">
				<view class="w30 FY-c">
					<image class="img" src="../../static/img/payment_left.png" mode="" @tap="goback"></image>
				</view>
				<text class="w30 FY-c"></text>
				<text class="w30 FY-c"></text>
			</view>
		</view>
		<view class="and-div module por">
			<view class="top F-xy">
				<view class="poa F-xy">
					<text class="poa z9 cfff">活动说明</text>
					<image class="img" src="../../static/img/active03.png" mode=""></image>
				</view>
			</view>
			<view class="cen FY c333">
				<text>{{huodong}}</text>
				<text>{{buchong}}</text>
			</view>
			<view class="end poa FX-sb FY-c w90">
				<image class="img" src="../../static/img/active02.png" mode=""></image>
				<image class="img" src="../../static/img/active04.png" mode=""></image>
			</view>
		</view>
		<view class="end-div module por">
			
			<view class="top F-xy">
				<view class="poa F-xy">
					<text class="poa z9 cfff">榜单</text>
					<image class="img" src="../../static/img/active03.png" mode=""></image>
				</view>
			</view>
			<view class="txt FX-sb" v-for="(v,i) in arr">
				<view class="">
					<text :class="i==0? 'c1':''||i==1? 'c2':''||i==2? 'c3':''">{{i+1}}</text>
					<text>{{v.txt}}</text>
				</view>
				<text>{{v.money}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				huodong:"活动规则：活动期间内，通过当当购物手机客户端成功购买图书的用户，均视为成功参与此次活动；",
				buchong:"补充说明：此次活动不与当当网客户端用户首单奖励5元活动冲突，可同时参与。",
				arr:[
					{txt:'嘻嘻嘻1',money:'1200'},
					{txt:'嘻嘻嘻2',money:'1200'},
					{txt:'嘻嘻嘻3',money:'1200'},
					{txt:'嘻嘻嘻',money:'1200'},
				]
			}
		},
		methods: {
			goback(){
				uni.navigateBack({
					delta:1,
				})
			}
		}
	}
</script>

<style>
	.page{
		min-height: calc(100vh);
		background-color: #eee;
		padding-bottom: 6%;
	}
	.bgcImg{
		height: calc(50vh);
		background: url(../../static/img/active01.png) no-repeat;
		background-size: 100% 100%;
	}
	.bgcImg .w30{
		height: 80rpx;
	}
	.bgcImg .img{
		width: 80rpx;height: 60rpx;
	}
	.module .top>.poa{
		top: -30rpx;
	}
	.module .top .img{
		width: 300rpx;height: 130rpx;
	}
	.and-div .cfff,.end-div .cfff{
		font-size: 16px;
		top: 20rpx;
		color: #fff;
		letter-spacing:4rpx;
	}
	.and-div .c333{
		color: #666;
	}
	.and-div{
		margin: 4%;padding: 10% 5%;
		background-color: #fff;
		border-radius: 20rpx;
		font-size: 14px;
		margin-top: -20%;
		margin-bottom: 10%;
	}
	.and-div .end{
		bottom: 0;
	}
	.and-div .end .img:first-child{
		width: 80rpx;height: 80rpx;
		bottom: -50rpx;left: -50rpx;
	}
	.and-div .end .img:last-child{
		width: 120rpx;height: 120rpx;
		bottom: -10rpx;right: -50rpx;
	}
	.end-div{
		font-size: 16px;
		margin: 4%;padding: 10% 0;
		background-color: #fff;
		border-radius: 20rpx;
	}
	.end-div .txt{
		padding: 5%;
		border-bottom: 1px solid #EEE;
	}
	.end-div .txt:last-child{
		border-bottom: none;
	}
	.end-div .txt>view>text:first-child{
		margin-right: 30rpx;
	}
	.end-div .txt>view>text:last-child{
		font-size: 18px;
	}
	.end-div .txt>text{
		color: #E7432B;
	}
	.c1{color: #8E1908;}.c2{color: #E9512A;}.c3{color: #FCA521;}
</style>

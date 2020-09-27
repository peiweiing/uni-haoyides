<template>
	<view class="container">
		<view class="FY FY-c FX-c" v-if="nodata" style="font-size: 16px; height: calc(80vh); color: #CCCCCC;">
			<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
			暂无内容
		</view>
		<scroll-view scroll-y class="content" v-if="!nodata">
			<view class="divtop">
				<tui-card
				class="tui-card"
				:image="card.img[0].img"
				:title="card.img[0].title"
				:tag="card.img[0].tag"
				@click="showModal"
				>
					<template v-slot:body>
						<view class="tui-default FX-sb" style="font-size: 26rpx; color: #999;">
							<text>价格:￥{{(+card.g_price).toFixed(2)}}</text>
							<text>交易量:{{card.g_salevol}}</text>
							<text>交易金额:￥{{(+card.totalpay).toFixed(2)}}</text>
							<view class="tui-tips">
								<tui-icon name="circle-fill" :size="30" :color="'#07C160'"></tui-icon>
							</view>
						</view>
					</template>
				</tui-card>
			</view>
			<!-- 图表切换 -->
			<view class="tui-mtop">
				<tui-tabs
				:tabs="tabs"
				:sliderWidth="150"
				:bold="true"
				:currentTab="currentTab>2?0:currentTab"
				:backgroundColor="backgroundColor"
				@change="change"
				itemWidth="33.3333%"
				></tui-tabs>
			</view>
			<!-- 时间切换 -->
			<view class="timeChange">
				<tui-button
				type="gray"
				width="120rpx"
				height="60rpx"
				:size="32"
				v-for="(item, index) in isPlain"
				:key="index"
				:plain="item.plain"
				@click="timeChange(index, item.type)"
				>
					{{item.title}}
				</tui-button>
			</view>
			<!-- 交易量 -->
			<view v-if="isCharts_1">
				<view class="chart_title">
					交 易 量
				</view>
				<view class="qiun-charts">
					<canvas
					canvas-id="canvasColumn"
					id="canvasColumn"
					class="charts"
					disable-scroll=true
					@touchstart="touchColumn"
					@touchmove="moveColumn"
					@touchend="touchEndColumn"
					></canvas>
				</view>
			</view>
			<!-- 批发量 -->
			<view v-if="isCharts_3">
				<view class="chart_title">
					批 发 量
				</view>
				<view class="qiun-charts">
					<canvas
					canvas-id="canvasColumn_2"
					id="canvasColumn_2"
					class="charts"
					disable-scroll=true
					@touchstart="touchColumn_2"
					@touchmove="moveColumn_2"
					@touchend="touchEndColumn_2"
					></canvas>
				</view>
			</view>
			<!-- 交易金额 -->
			<view v-if="isCharts_2">
				<view class="chart_title">
					交 易 金 额
				</view>
				<view class="qiun-charts">
					<canvas
					canvas-id="canvasLineA"
					id="canvasLineA"
					class="charts"
					disable-scroll=true
					@touchstart="touchLineA"
					@touchmove="moveLineA"
					@touchend="touchEndLineA"
					></canvas>
				</view>
			</view>
			<view style="height: 380rpx;"></view>
		</scroll-view>
		<view class="divend FX-sa FY-c" v-if="!nodata">
			<tui-button
			type="green"
			width="280rpx"
			height="90rpx"
			:size="32"
			@click="navigateTo('../buy/entrustedPurchase')"
			>
				买入
			</tui-button>
			<tui-button
			type="bronze"
			width="280rpx"
			height="90rpx"
			:size="32"
			@click="navigateTo('../buy/consignmentSale')"
			>
				卖出
			</tui-button>
		</view>
		<!--底部抽屉-->
		<tui-bottom-popup :show="bottomPopup" @close="hideModal">
			<view class="region-box">
				<scroll-view scroll-y class="region-box-end" style="background-color: #1C1C1C;">
					<view class="region-end" v-for="(item, index) in cardend" :key="index" @click="popup(item.g_id)">
						<tui-card :image="item.img[0].img" :title="item.img[0].title" :tag="item.img[0].tag">
							<template v-slot:body>
								<view class="tui-default FX-sb" style="font-size: 26rpx;color: #999;">
									<text>价格:￥{{(+item.g_price).toFixed(2)}}</text>
									<text>交易量:{{item.g_salevol}}</text>
									<text>交易金额:￥{{(+item.totalpay).toFixed(2)}}</text>
									<view class="tui-tips">
										<tui-icon :name="item.is_icon === 0 ? 'circle-fill' : 'circle'" :size="30" :color="'#07C160'"></tui-icon>
									</view>
								</view>
							</template>
						</tui-card>
					</view>
				</scroll-view>
				<view class="FX-c w100">
					<tui-button type="green" width="280rpx" height="90rpx" :size="32" @click="cancel">取消</tui-button>
				</view>
			</view>
		</tui-bottom-popup>
		<!--toast提示-->
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
	import App from '../../App.vue';
	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	var canvaColumn = null;
	var canvaColumn_2 = null;
	export default {
		data() {
			return {
				tabs: [{
					name: "交易量"
				}, {
					name: "交易金额"
				}, {
					name: "批发量"
				}],
				currentTab: 0,
				backgroundColor: "#1C1C1C",
				// 无数据展示
				nodata: false,
				// 底部弹窗控制
				bottomPopup: false,
				// 行情列表
				cardend: [],
				// 行情卡片展示
				card: { img: [{}] },
				// time按钮
				isPlain: [
					{ title: '小时', type: 'h', plain: false },
					{ title: '日', type: 'd', plain: true },
					{ title: '周', type: 'u', plain: true },
					{ title: '月', type: 'm', plain: true },
					{ title: '年', type: 'y', plain: true }
				],
				isCharts_1: true,
				isCharts_2: false,
				isCharts_3: false,
				timeType: '0',
				// 交易量数据
				num: {
					categories: ["无交易记录"],
					series: [{ name: "交易量", color: "#9E2036", textColor: '#CCC', data: [0] }]
				},
				num_cWidth: '',
				num_cHeight: '',
				num_pixelRatio: 1,
				// 批发量数据
				pifa: {
					categories: ["无交易记录"],
					series: [{ name: "批发量", color: "#9E2036", textColor: '#CCC', data: [0] }]
				},
				pifa_cWidth: '',
				pifa_cHeight: '',
				pifa_pixelRatio: 1,
				// 交易金额数据
				amount: {
					categories: ["无交易记录"],
					series: [{ name: "交易金额", color: "#9E2036", textColor: '#CCC', data: [0] }]
				},
				amount_cWidth: '',
				amount_cHeight: '',
				amount_pixelRatio: 1
			}
		},
		onShow: async function() {
			// 商品列表渲染
			const goodslist_res = await this.goodslist();
			// console.log(goodslist_res);
			if (goodslist_res.data.status === 200 && goodslist_res.data.data.length !== 0 && goodslist_res.data.data) {
				this.card = goodslist_res.data.data[0];
				this.cardend = goodslist_res.data.data;
				this.cardend[0].is_icon = 0;
				this.nodata = false;
			} else {
				this.nodata = true;
			};
			// 图表渲染
			const data = { g_id: this.card.g_id, time_type: 'h' };
			await this.chartRender(data);
		},
		methods: {
			// tabs切换
			change: function(e) {
				this.currentTab = e.index;
				if (e.index === 0) { this.isCharts_1 = true; this.isCharts_2 = false; this.isCharts_3 = false; };
				if (e.index === 1) { this.isCharts_1 = false; this.isCharts_2 = true; this.isCharts_3 = false; };
				if (e.index === 2) { this.isCharts_1 = false; this.isCharts_2 = false; this.isCharts_3 = true; };
				// 图表渲染
				const data = { g_id: this.card.g_id, time_type: this.timeType };
				this.chartRender(data);
			},
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
			// 选出数组最大数
			maxNum: function(arr) {
				let max = arr[0];
				for(let i = 1; i < arr.length; i++) {
				  if (max < arr[i]) {
					  max = arr[i];
					};
				 };
				 return max;
			},
			// 选出数组最小数
			minNum: function(arr) {
				let min = arr[0];
				for(let i = 1; i < arr.length; i++) {
				  if (min > arr[i]) {
					  min = arr[i];
					};
				 };
				 return min;
			},
			// time切换
			timeChange: function(index, type) {
				for(let i = 0; i < this.isPlain.length; i++) {
					this.isPlain[i].plain = ((i !== index && true) || false);
				};
				// 图表渲染
				const data = { g_id: this.card.g_id, time_type: type };
				this.chartRender(data);
				this.timeType = type;
			},
			// 底部弹窗开关操作
			showModal: function() { this.bottomPopup = true; },
			hideModal: function() { this.bottomPopup = false; },
			cancel: function() { this.bottomPopup = false; },
			// 卡片切换
			popup: function(e) {
				// console.log(e);
				this.bottomPopup = false;
				this.card = this.cardend.find(item => item.g_id === e);
				this.cardend.forEach(item => {
					if(item.g_id === e){
						item.is_icon = 0;
					} else {
						item.is_icon = 1;
					};
				});
				this.currentTab = 0;
				this.isCharts_1 = true;
				this.isCharts_2 = false;
				this.isCharts_3 = false;
				this.timeChange(0, 'h');
			},
			// 交易量数据操作
			getNum: function() {
				let Column = { categories:[], series:[] };
				const arr = this.num.series[0].data.map(item => +item);
				const maxNum = this.maxNum(arr);
				const minNum = this.minNum(arr);
				Column.categories = this.num.categories;
				Column.series = this.num.series;
				_self.numColumn("canvasColumn", Column, maxNum, minNum);
			},
			numColumn: function(canvasId, chartData, maxNum, minNum) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true,
						fontColor: '#CCCCCC',
					},
					fontSize: 12,
					background: '#1C1C1C',
					pixelRatio: _self.num_pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true,
					xAxis: {
						gridColor: '#FFF',
						fontColor: '#CCCCCC',
						disableGrid: true,
						itemCount:5,
						gridType: 'dash'
					},
					yAxis: {
						gridType: 'dash',
						fontColor: '#CCCCCC',
						min: minNum * 0.9,
						max: maxNum * 1.1,
						format: (val) => { return val.toFixed(0) }
					},
					dataLabel: true,
					width: _self.num_cWidth * _self.num_pixelRatio,
					height: _self.num_cHeight * _self.num_pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.num_cWidth * _self.num_pixelRatio * 0.45 / chartData.categories.length
						}
					  }
				});
			},
			touchColumn: function(e) { canvaColumn.scrollStart(e); },
			moveColumn: function(e) { canvaColumn.scroll(e); },
			touchEndColumn: function(e) {
				canvaColumn.scrollEnd(e);
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			// 批发量数据操作
			getPifa: function() {
				let Column = { categories:[], series:[] };
				const arr = this.pifa.series[0].data.map(item => +item);
				const maxNum = this.maxNum(arr);
				const minNum = this.minNum(arr);
				Column.categories = this.pifa.categories;
				Column.series = this.pifa.series;
				_self.pifaColumn("canvasColumn_2", Column, maxNum, minNum);
			},
			pifaColumn: function(canvasId, chartData, maxNum, minNum) {
				canvaColumn_2 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show:true,
						fontColor: '#CCCCCC',
					},
					fontSize: 12,
					background: '#1C1C1C',
					pixelRatio: _self.pifa_pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true,
					xAxis: {
						disableGrid:true,
						itemCount:5,
						gridColor: '#FFF',
						fontColor: '#CCCCCC',
						gridType: 'dash',
					},
					yAxis: {
						gridColor: '#FFF',
						gridType: 'dash',
						fontColor: '#CCCCCC',
						min: minNum * 0.9,
						max: maxNum * 1.1,
						format: (val) => { return val.toFixed(0) }
					},
					dataLabel: true,
					width: _self.pifa_cWidth * _self.pifa_pixelRatio,
					height: _self.pifa_cHeight * _self.pifa_pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.pifa_cWidth * _self.pifa_pixelRatio * 0.45 / chartData.categories.length
						}
					  }
				});
			},
			touchColumn_2: function(e) { canvaColumn_2.scrollStart(e); },
			moveColumn_2: function(e) { canvaColumn_2.scroll(e); },
			touchEndColumn_2: function(e) {
				canvaColumn_2.scrollEnd(e);
				canvaColumn_2.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			// 交易金额数据操作
			getAmount: function() {
				let LineA = { categories: [], series: [] };
				const arr = this.amount.series[0].data.map(item => +item);
				const maxNum = this.maxNum(arr);
				const minNum = this.minNum(arr);
				LineA.categories = this.amount.categories;
				LineA.series = this.amount.series;
				_self.showAmount("canvasLineA", LineA, maxNum, minNum);
			},
			showAmount: function(canvasId, chartData, maxNum, minNum) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 12,
					legend: {
						show:true,
						fontColor: '#CCCCCC',
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#1C1C1C',
					pixelRatio: _self.amount_pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,
					xAxis: {
						type: 'grid',
						gridColor: '#FFF',
						fontColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						itemCount:5
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#FFF',
						fontColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: minNum*0.9,
						max: maxNum*1.1,
						format: (val) => { return val.toFixed(2) }
					},
					width: _self.amount_cWidth * _self.amount_pixelRatio,
					height: _self.amount_cHeight * _self.amount_pixelRatio,
					extra: { line:{ type: 'straight' } }
				});
			},
			touchLineA: function(e) { canvaLineA.scrollStart(e); },
			moveLineA: function(e) { canvaLineA.scroll(e); },
			touchEndLineA: function(e) {
				canvaLineA.scrollEnd(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			// 获取行情列表
			goodslist: async function() {
				return await new Promise((resolve, reject) => {
					uni.getStorage({
					    key: 'token',
					    success: function (res) {
							uni.request({
								method: "POST",
								url: App.goodslist,
								header: { 'Authorization': res.data },
								success: res => { resolve(res) },
								fail: err => { reject(err) }
							})
					    }
					});
				})
			},
			// 获取图表数据
			statistics: async function(data) {
				return await new Promise((resolve, reject) => {
					this.sendRequest({
						method: "POST",
						url: App.statistics,
						data,
						success: res => { resolve(res) },
						fail: err => { reject(err) }
					})
				})
			},
			// 图表渲染
			chartRender: async function(data) {
				const statistics_res = await this.statistics(data);
				if (statistics_res.status === 200 && statistics_res.data.length !== 0 && statistics_res.data) {
					if (statistics_res.data.trade_count.time.length !== 0) {
						this.num.categories = statistics_res.data.trade_count.time;
						this.num.series[0].data = statistics_res.data.trade_count.totalamount;
					};
					if (statistics_res.data.pf_count.time.length !== 0) {
						this.pifa.categories = statistics_res.data.pf_count.time;
						this.pifa.series[0].data = statistics_res.data.pf_count.totalamount;
					};
					if (statistics_res.data.trade_money.time.length !== 0) {
						this.amount.categories = statistics_res.data.trade_money.time;
						this.amount.series[0].data = statistics_res.data.trade_money.totalamount;
					};
				} else {
					this.showToast(2, statistics_res.msg);
					return;
				};
				_self = this;
				// 交易量数据
				this.num_cWidth = uni.upx2px(750);
				this.num_cHeight = uni.upx2px(500);
				this.getNum();
				// 批发量数据
				this.pifa_cWidth = uni.upx2px(750);
				this.pifa_cHeight = uni.upx2px(500);
				this.getPifa();
				// 交易金额数据
				this.amount_cWidth = uni.upx2px(750);
				this.amount_cHeight = uni.upx2px(500);
				this.getAmount();
			},
			navigateTo: function(url) { uni.navigateTo({ url }); }
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #1C1C1C;
		box-sizing: border-box;
	}
	.content{
		height: 100%;
	}
	.tui-default {
		padding: 20rpx;
		position: relative;
		font-size: 26rpx;
		background-color: #CCC;
	}
	.tui-tips{
		position: absolute;
		right: 26rpx;
		top: -80rpx;
	}
	.region-box {
		padding: 30rpx 0;
		box-sizing: border-box;
		margin-bottom: 10%;
		background-color: #EEE;
	}
	.region-box-end {
		width: 100%;
		height: 800rpx;
		box-sizing: border-box;
		overflow: hidden;
		background-color: #EEE;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
	}
	.region-end{
		width: 100%;
		margin-bottom: 20rpx;
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
	}
	.chart_title{
		font-size: 36rpx;
		margin-bottom: 20rpx;
		padding: 20rpx 0;
		text-align: center;
		background-color: #1C1C1C;
		color: #CCCCCC;
		border-radius: 20rpx 20rpx 0 0;
		box-sizing: border-box;
		border-bottom: 2rpx solid #999;
	}
	.qiun-charts {
		width: 750rpx;
		height: 500rpx;
	}
	.charts {
		width: 750rpx;
		height: 500rpx;
		background-color: #1C1C1C;
		border-radius: 0 0 20rpx 20rpx;
	}
	.divend{
		box-sizing: border-box;
		padding: 20rpx 0;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.qiun-charts{
		width: 750upx;
		height:500upx;
	}
	.tui-card /deep/ .tui-card-header{
		width: 86%;
		background-color: #CCC !important;
	}
	.container /deep/ .tui-card{
		margin: 20rpx 20rpx 0;
		background-color: #CCC;
		box-shadow: none;
	}
	.timeChange{
		display: flex;
		margin-top: 20rpx;
		justify-content: space-around;
	}
	.timeChange /deep/ .tui-gray-outline{
		color: #CCCCCC !important;
	}
	.timeChange /deep/ .tui-btn-gray{
		color: #9E2036 !important;
		font-weight: bold;
	}
	.tui-mtop{
		margin: 10rpx 0;
	}
	/deep/ .region-box{
		background-color: #1C1C1C;
	}
</style>

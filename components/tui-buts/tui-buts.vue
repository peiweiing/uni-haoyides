<template>
	<view>
		<!-- <view class="tui-btn-box">
			<tui-button margin="36rpx 0 0" type="white" shape="circle" @click="show">一般弹框</tui-button>
			<tui-button margin="36rpx 0 0" type="white" shape="circle" @click="show3">单个按钮</tui-button>
		</view> -->
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :title="title" :content="content" :button="button"></tui-modal>
		<tui-modal :show="modal3" @click="handleClick3" @cancel="hide3" :content="content" :button="button3"></tui-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'提示',
				content:'',
				modal: false,
				button: [
					{
						text: '取消订单',
						type: 'red',
						plain: true //是否空心
					},
					{
						text: '去确认',
						type: 'red',
						plain: false
					}
				],
				
				content:'',
				modal3: false,
				button3: [
					{
						text: '确定',
						type: 'red'
					}
				],
			};
		},
		methods:{
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					this.tui.toast('你点击了取消按钮');
				} else {
					this.tui.toast('你点击了确定按钮');
				}
				this.modal = false;
			},
			handleClick3(e) {
				let index = e.index;
				if (index === 0) {
					this.tui.toast('你点击了确定按钮');
				}
				this.modal3 = false;
			},
		}
	}
</script>

<style>

</style>

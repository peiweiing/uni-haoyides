<template>
	<view>
		
		<view class="FY FY-c FX-c" v-if="isError" style="font-size: 16px;height: calc(80vh);">
			<tui-icon name="nodata" :size="60" color="#999"></tui-icon>
			暂无内容
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isError:true,
				arr:[],
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

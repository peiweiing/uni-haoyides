<template>
	<view>
		<input class="inp" :type="type" :placeholder="place" @input="onInput" @blur="onblur"/>
	</view>
</template>

<script>
	export default {
		props: {
			/**类型**/
			type: String,
			/**默认显示**/
			place: String,
			
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		methods: {
			onblur() {
				this.$emit('blur')
			},
			onInput(e) {
				this.$emit('input', e.target.value)
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	/* .inp{
		width: 100%;
	}
 */
</style>

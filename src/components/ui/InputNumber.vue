<template>
	<div class="input">
		<input 
			type="number" 
			:value="value"
			@input="changeValue($event.target.value)"
		>
	</div>
</template>

<script setup>

const props = defineProps({
	value: { 
		type: Number, 
		default: 0
	},
	maxValue: { 
		type: [Number, null], 
		default: null
	},
});

const emits = defineEmits(['input'])

const changeValue = (val) => {
	let validValue = val
	if (props.maxValue && validValue > props.maxValue) validValue = props.maxValue;
	
	emits('input', validValue)
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/variables.scss';

	input {
		padding: 8px 16px;
		border-radius: 8px;
		width: 80px;
	}
</style>
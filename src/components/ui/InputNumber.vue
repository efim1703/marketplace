<template>
	<div class="input">
		<input 
			type="number" 
			:value="value"
			@input="$emit('input', $event.target.value)"
		>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	value: { 
		type: String, 
		default: ''
	},
});

const emits = defineEmits(['input'])

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/variables.scss';

	input {
		padding: 8px 16px;
		border-radius: 8px;
		width: 80px;
	}
</style>
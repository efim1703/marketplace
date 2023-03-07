<template>
	<div :class="['product', getStatus]" >
		<div class="title">
			{{ product.title + ' (' + product.P  + ')' }} 
		</div>
		<div class="price">
			{{ getPrice(product.C) + ' руб' }}
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";
import dollarStore from '@/store/dollarStore'

const props = defineProps({
	product: { 
		type: Object, 
		required: true
	},
});

const getDollarToRuble = computed(() => dollarStore.getters.getDollarToRuble)
const getOldDollarToRuble = computed(() => dollarStore.getters.getOldDollarToRuble)

const getStatus = computed(() => {
	let color = ''
	const oldPrice = getPrice(props.product.oldPrice, getOldDollarToRuble.value)
	const newPrice = getPrice(props.product.C)

	if (oldPrice > newPrice) {
		color = 'green'
	} else if (oldPrice < newPrice) {
		color = 'red'
	}
	return color
})

const getPrice = (price, dollar = getDollarToRuble.value) => Math.round(dollar * price * 100) / 100

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/variables.scss';

	.product {
		display: flex;
		justify-content: space-between;
		padding: 12px 8px;
		background: $grey;
    border: 2px solid transparent;
		border-radius: 12px;
		cursor: pointer;

		.price {
			font-weight: 700;
		}

    &.red {
      border: 2px solid $red;
    }

    &.green {
      border: 2px solid $green;
    }
	}
</style>
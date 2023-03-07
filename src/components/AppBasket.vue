<template>
	<div class="basket">
		<div class="productList">
			<div 
				class="product"
				v-for="product in getBasket"
				:key="product.T"
			>
				<div class="title">
					{{ product.title }}
				</div>
				<div class="count">
					<InputNumber :value="product.count" @input="$event => changeProductCount($event, product.T)"/>
					<span>шт.</span>
				</div>
				<div class="price">
					{{ getPrice(product.C) + ' руб/шт' }}
				</div>
				<div class="action" @click="deleteProduct(product.T)">
					удалить
				</div>
			</div>
		</div>	
		<div class="total-price">
			<span>Общая сумма: </span>
			<span>{{ getTotalPrice + 'руб' }}</span>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import dollarStore from '@/store/dollarStore'
import InputNumber from "@/components/ui/InputNumber.vue";

const props = defineProps({
	goodsBySection: {
		tupe: Object,
		required: true
	}
});

const store = useStore()

const getDollarToRuble = computed(() => dollarStore.getters.getDollarToRuble)

const getBasket = computed(() => {
	const res = store.getters.getBasket.map(el => {
		const product = props.goodsBySection[el.groupId].products[el.id]
		return Object.assign(product, { count: el.count })
	})
	return res
})

const getTotalPrice = computed(() => {
	const dollarPrice = getBasket.value.reduce((acc, el) => acc += el.count * el.C, 0)
	return getPrice(dollarPrice)
})

const getPrice = (productPrice) => Math.round(getDollarToRuble.value * productPrice * 100) / 100 
// Я бы добавил еще debounce сюда, чтобы не так часто обновления данных делать при вводе
const changeProductCount = (count, productId) => {
	store.dispatch('setProductCount', {count: +count, productId})
}

const deleteProduct = (productId) => {
	store.dispatch('deleteProduct', productId)
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/variables.scss';

	.product {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
		background: $grey;
		border-radius: 12px;
		margin-bottom: 8px;

		.title {
			width: 50%;
			margin-right: 8px;
		}

		.count {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.price {
			font-weight: 700;
		}

		.action {
			cursor: pointer;
			color: $red;
		}
	}

	.total-price {
		margin-top: 12px;
		font-weight: 700;
		font-size: 18px;
		text-align: end;
	}
</style>

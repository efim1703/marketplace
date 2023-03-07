<template>
  <div class="category">
      <div class="title">
        {{ category.title }}
      </div>
      <div class="goodList">
        <ProductRow 
          v-for="product in Object.values(category.products)"
          :key="product.T"
          :product="product"
          class="product"
          @click="addProductInBasket(product)"
        />
      </div>
  </div>
</template>

<script setup >
import { defineProps } from "vue";
import { useStore } from "vuex";
import ProductRow from "@/components/Categories/ProductRow.vue";

const props = defineProps({
  category: { 
    type: Object, 
    required: true
  },
});

const store = useStore()

const addProductInBasket = (product) => {
  store.dispatch('addProductInBasket', product)
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .category {
    width: 100%;
    padding: 20px;
    border-radius: 12px;
    background: $light-grey;

    .title {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 20px;
    }

    .product {
      margin-bottom: 10px;
    }
  }
</style>
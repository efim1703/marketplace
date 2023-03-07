<template>
  <div class="container">
    <h1>GOODS BY CATEGORIES</h1>
    <div class="categoryList">
      <CategotyItem 
        v-for="(category, index) in Object.values(getGoodsBySection)"
        :key="index"
        :category="category"
        CLASS="category"
      />
    </div>
    <div class="basket">
      <div class="header">
        <h2>BASKET</h2>
        <div>
          <span>Курс доллара к рублю:</span>
          <InputNumber :value="getDollarToRuble" @input="setDollarToRuble"/>
        </div>
      </div>
      <AppBasket :goodsBySection="getGoodsBySection"/>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import dollarStore from '@/store/dollarStore'
import CategotyItem from '@/components/Categories/CategoryItem.vue'
import AppBasket from "@/components/AppBasket.vue";
import InputNumber from "@/components/ui/InputNumber.vue";

let goods = ref([])
let names = ref({})

const getGoodsBySection = computed(() => {
  const res = {}

  goods.value.map(el => {
    if (!res[el.G]) {
      res[el.G] = {
        products: {},
        title: names.value[el.G].G
      }
    }

    const product = productWithTitleAndOldPrice(el, getGoodsBySection.value)
    res[el.G].products[el.T] = product
  })

  return res
})

const getDollarToRuble = computed(() => dollarStore.getters.getDollarToRuble)

onMounted(async () => {
  await fetchNames()
  await fetchData()

  setTimeout(() => { 
    setInterval(intervalFunction, 15000)
  }, 15000)
})

const fetchData = () => {
  fetch('/data.json')
    .then(response => response.json())
    .then(data => {
      if (data.Success) goods.value = data.Value.Goods;
    })
    .catch(err => console.warn(err));
}

const fetchNames = () => {
  fetch('/names.json')
    .then(response => response.json())
    .then(data => names.value = data)
    .catch(err => console.warn(err));
}

const intervalFunction = async () => {
  await fetchData()
  const dollar = Math.floor(Math.random() * (81 - 20)) + 20
  dollarStore.dispatch('setDollarToRuble', dollar)
}

const setDollarToRuble = (dollar) => {
  dollarStore.dispatch('setDollarToRuble', dollar)
}

const productWithTitleAndOldPrice = (product, oldGoods) => {
  const title = names.value[product.G].B[product.T].N
  const oldPrice = oldGoods[product.G]?.products[product.T].C ?? product.C
  // Так как продукт плоский объект достаточно assign, в идеале использовать глубокий мердж
  return Object.assign(product, {title, oldPrice})
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .container {
    width: 80%;
    margin: 0 auto 80px;

    h1 {
      margin: 40px auto;
    }

    .categoryList {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .category {
        flex: 1 1 40%;
        margin: 10px;
      }
    }

    .basket {
      h2 {
        margin: 20px 0;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          align-items: center;
          gap: 12px;

          ::v-deep(input) {
            background: $grey;
          }
        }
      }
    }
  }
</style>
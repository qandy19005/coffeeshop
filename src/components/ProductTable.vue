<template>
  <div class="product-table-box">
    <div class="product-list" v-for="coffee in coffeeList" :key="coffee.id">
        <div class="image-box">
          <img v-if="populerCoffee(coffee.id)" class="populer-sign" src="../assets/icon/recommendation.png">
          <img class="coffee-image" src="../assets/icon/coffeeIcon.png">
        </div>
        <div class="info-box">
          <span>{{coffee.name}}</span><br>
          <span>{{`$${coffee.smallCupPrice}(S)/$${coffee.mediumCupPrice}(M)/$${coffee.largeCupPrice}(L)`}}</span>
        </div>
        <div class="button-box">
          <button class="btn" @click="addToCartEdit(coffee)">加入訂單</button>
        </div>
    </div>
    <transition name="model-fade">
      <ProductAddModal
        v-if="showProductEditModal"
        :modelValue="showProductEditModal"
        @close="closeModal"
        :coffee="currentCoffeeProduct"
      />
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import ProductAddModal from '@/components/ProductAddModal.vue';
import { ICoffeeList } from '@/types/product';

export default defineComponent({
  name: 'ProductTable',

  components: {
    ProductAddModal,
  },
  props: {
    coffeeList: {
        required: true,
        type: Array as PropType<ICoffeeList[]>
    },
  },
  setup(){

    const showProductEditModal = ref<boolean>(false);
    const currentCoffeeProduct = ref<ICoffeeList>();
    const addToCartEdit = (coffee:ICoffeeList) => {
        currentCoffeeProduct.value = coffee;
        showProductEditModal.value = true;
    }

    const closeModal = () => {
      showProductEditModal.value = false;
    }

    const populerCoffee = (coffeeId: number): boolean => {
      const populer = [0, 2];
      return populer.includes(coffeeId);
    }

    return { addToCartEdit, currentCoffeeProduct, showProductEditModal, closeModal, populerCoffee };
  }
});
</script>
<style lang="scss" scoped>
@import "~@/styles/product.scss";
@import "~@/styles/transition.scss";
</style>

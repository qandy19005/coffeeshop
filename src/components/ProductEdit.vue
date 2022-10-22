<template>
<div class="edit-coffee-box">
    <div class="edit-coffee-list">
        <div class="image-box">
            <img class="coffee-image" src="../assets/icon/coffeeIcon.png">
        </div>
        <div class="info-box">
        <span>{{ currentEditCoffee.name }}</span><br>
        <div class="coffe-size">
            <input v-model="currentEditCoffee.size" class="custom-radio" type="radio" id="small" name="coffee-size" value="s">
            <label for="large">${{currentCoffeeInfo.smallCupPrice}}(S)</label>
            <input v-model="currentEditCoffee.size" class="custom-radio"  type="radio" id="medium" name="coffee-size" value="m">
            <label for="large">${{currentCoffeeInfo.mediumCupPrice}}(M)</label>
            <input v-model="currentEditCoffee.size" class="custom-radio"  type="radio" id="large" name="coffee-size" value="l">
            <label for="large">${{currentCoffeeInfo.largeCupPrice}}(L)</label>
        </div>
        數量: <input v-model="currentEditCoffee.amount" class="input-amount" type="number" min="1" max="99">
        <span>價格: ${{coffeePrice}}</span><br>
        </div>
    </div>
    <div class="edit-footer">
        <textarea class="note-box" v-model="currentEditCoffee.notes" rows="3" placeholder="請輸入其他需求..."></textarea>
        <div class="btn-group">
        <img class="check-image" src="../assets/icon/check.png" @click="updateCartCoffeeOrder()"><br>
        <img class="cancle-image" src="../assets/icon/cancle.png" @click="cancelCartCoffeeOrder()">
        </div>
    </div>
</div>

</template>
<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue';
import { useProductStore } from '@/stores/product';
import { ICoffeeCartInfo, ICoffeeList } from '@/types/product';
import { setCoffeePrice } from '@/utils/product';
import { successEditToast } from '@/utils/toast';

export default defineComponent({
  name: 'ProductEdit',

  props: {
    editCoffee: {
        required: true,
        type: Object as PropType<ICoffeeCartInfo>,
    },
    coffeeInfo: {
        required: true,
        type: Object as PropType<ICoffeeList>,
    }
  },

  setup(props, { emit }){

    const productStore = useProductStore();

    const currentCoffeeInfo = ref<ICoffeeList>({...props.coffeeInfo});

    const currentEditCoffee = ref<ICoffeeCartInfo>({...props.editCoffee});

    // computed
    const coffeePrice = computed(():number => {
      return getCoffeePrice(currentEditCoffee.value.size);
    })

    // methods
    const updateCartCoffeeOrder = (): void => {
      productStore.updateCoffeeFromCarts(currentEditCoffee.value);
      successEditToast();
      cancelCartCoffeeOrder();
    }

    const cancelCartCoffeeOrder = (): void => {
        emit('cancel');
    }

    const getCoffeePrice = (size:string): number => {
      const price:number = setCoffeePrice(size, currentCoffeeInfo.value, currentEditCoffee.value.amount);
      currentEditCoffee.value.price = price;
      return price;
    }

    return {
      productStore,
      updateCartCoffeeOrder,
      coffeePrice,
      cancelCartCoffeeOrder,
      currentCoffeeInfo,
      currentEditCoffee,
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~@/styles/product.scss";
</style>

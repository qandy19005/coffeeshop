<template>
  <Modal :modalActive="modelValue">
    <template v-slot:modal-body>
      <div class="coffe-info">
        <img class="coffee-image" src="../assets/icon/coffeeIcon.png"><br>
        <span class="coffee-name">{{ coffee.name }}</span><br>
        <div class="coffee-size">
            <input v-model="coffeeInfo.size" class="custom-radio" type="radio" id="small" name="coffee-size" value="s">
            <label for="large">${{coffee.smallCupPrice}}(S)</label>
            <input v-model="coffeeInfo.size" class="custom-radio" type="radio" id="medium" name="coffee-size" value="m">
            <label for="large">${{coffee.mediumCupPrice}}(M)</label>
            <input v-model="coffeeInfo.size" class="custom-radio" type="radio" id="large" name="coffee-size" value="l">
            <label for="large">${{coffee.largeCupPrice}}(L)</label>
        </div>
        <div class="coffee-price">
          數量: <input v-model="coffeeInfo.amount" class="input-amount" type="number" min="1" max="99">
          價格: <span class="price-text"> ${{coffeePrice}}</span><br>
        </div>
        <textarea class="note-box" v-model="coffeeInfo.notes" rows="3" placeholder="請輸入其他需求..."></textarea>
      </div>
    </template>
    <template v-slot:modal-footer>
      <div class="btn-group">
        <button class="btn add-btn" @click="addCurrentProductToCart()">加入</button>
        <button class="btn cancel-btn" @click="hideProductModal()">取消</button>
      </div>
    </template>
  </Modal>
</template>
<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref, computed, defineComponent, PropType } from 'vue';
import { useProductStore } from '@/stores/product';
import Modal from '@/components/Modal.vue';
import { ICoffeeList, ICoffeeInfo } from '@/types/product';
import coffeeConstant from '@/constants/coffee';
import { setCoffeePrice } from '@/utils/product';
import { successAddToast } from '@/utils/toast';
export default defineComponent({
  name: 'ProductEditModal',
  components: {
    Modal,
  },
  props: {
    coffee: {
        required: true,
        type: Object as PropType<ICoffeeList>,
    },
    modelValue: {
        required: true,
        type: Boolean,
        default: () => {
          return false;
        }
    }
  },
  setup(props, { emit }){

    const productStore = useProductStore();

    // data
    const coffeeInfo = ref<ICoffeeInfo>({
      id: props.coffee.id,
      name: props.coffee.name,
      price: props.coffee.smallCupPrice,
      size: coffeeConstant.SIZE.SMALL,
      notes: '',
      amount: 1,
    });

    // computed
    const coffeePrice = computed(():number => {
      return getCoffeePrice(coffeeInfo.value.size);
    })

    // methods
    const addCurrentProductToCart = () => {
      const coffee = {
        uuid: uuidv4(),
        ...coffeeInfo.value,
      }
      productStore.addProductToCarts(coffee);
      successAddToast();
      emit('close');
    }

    const hideProductModal = () => {
      emit('close');
    }

    const getCoffeePrice = (size:string) => {
      const price:number = setCoffeePrice(size, props.coffee, coffeeInfo.value.amount);
      coffeeInfo.value.price = price;
      return price;
    }

    return {
      coffeeInfo,
      addCurrentProductToCart,
      coffeePrice,
      hideProductModal
    };
  }
});
</script>
<style lang="scss" scoped>
@import "~@/styles/product.scss";
</style>

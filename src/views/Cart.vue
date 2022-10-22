<template>
<div>
  <PageTitle :title="'購物車'" />
  <div class="cart-table-box">
    <div v-for="list, index in productStore.cartList" :key="index">
      <div v-if="currentEditUuid !== list.uuid">
        <div class="coffee-cart-box">
          <div class="coffee-cart-list">
            <div class="image-box">
              <img class="coffee-image" src="../assets/icon/coffeeIcon.png">
            </div>
            <div class="detail-box">
              {{ list.name }}<br>
              {{ getCoffeeSizeText(list.size) }} x {{ list.amount }}
            </div>
            <div class="price-box">
              ${{ list.price }}
            </div>
            <div class="btn-group">
              <img class="edit-img" src="../assets/icon/edit.png" @click="getCurrentEditCoffee(list)"><br>
              <img class="delete-img" src="../assets/icon/delete-button.png" @click="deleteCoffeeFromList(list)">
            </div>
          </div>
          <div v-if="list.notes !== ''" class="coffee-note">
            <img class="note-img" src="../assets/icon/comment.png">:
            {{ list.notes }}
          </div>
        </div>
      </div>

      <div v-if="currentEditUuid === list.uuid">
        <ProductEdit
          :editCoffee="currentEditCoffee"
          :coffeeInfo="currentCoffeeInfo"
          @cancel="cancelCartCoffeeOrder"/>
      </div>

    </div>
      <NoProductInfo v-show="productStore.cartList.length === 0" />
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useProductStore } from '@/stores/product';
import { ICoffeeCartInfo, ICoffeeList } from '@/types/product';
import NoProductInfo from '@/components/NoProductInfo.vue';
import ProductEdit from '@/components/ProductEdit.vue';
import PageTitle from '@/components/PageTitle.vue';
import { coffeeListsData } from '@/api/product';
import { $_ } from '@/utils/tools';
import { successRemoveToast } from '@/utils/toast';
import coffeeConstant from '@/constants/coffee';

export default defineComponent({
  name: 'Cart',

  components: {
    NoProductInfo,
    ProductEdit,
    PageTitle,
  },

  setup(){
    const productStore = useProductStore();

    const currentEditUuid = ref<string>('');
    const currentCoffeeInfo = ref<ICoffeeList>({
      id: 0,
      name: '',
      largeCupPrice: 0,
      mediumCupPrice: 0,
      smallCupPrice: 0,
    });
    const currentEditCoffee = ref<ICoffeeCartInfo>({
      uuid: '',
      id: 0,
      name: '',
      price: 0,
      size: '',
      notes: '',
      amount: 1,
    });

    // methods
    const getCurrentEditCoffee = (list:ICoffeeCartInfo): void => {
      const coffeeInfoArray = $_.filter(coffeeListsData, (data:ICoffeeList):boolean => { return data.id === list.id; });
      currentCoffeeInfo.value = coffeeInfoArray[0];
      currentEditUuid.value = list.uuid;
      currentEditCoffee.value = {...list};
    }

    const deleteCoffeeFromList = (list:ICoffeeCartInfo): void => {
      productStore.deleteProductFromCarts(list.uuid);
      successRemoveToast();
    }

    const cancelCartCoffeeOrder = (): void => {
      currentEditUuid.value = '';
    }

    const getCoffeeSizeText = (size: string): string => {
      switch(size){
        case coffeeConstant.SIZE.SMALL:
          return 'S';
        case coffeeConstant.SIZE.MEDIUM:
          return 'M';
        case coffeeConstant.SIZE.LARGE:
          return 'L';
        default:
          return '-';
      }
    }

    return {
      currentEditUuid,
      currentEditCoffee,
      currentCoffeeInfo,
      productStore,
      deleteCoffeeFromList,
      getCurrentEditCoffee,
      getCoffeeSizeText,
      cancelCartCoffeeOrder
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~@/styles/product.scss";
</style>

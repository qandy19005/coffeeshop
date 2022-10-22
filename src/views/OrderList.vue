<template>
<div>
  <PageTitle :title="'訂單列表'" />
  <ProductTable :coffeeList="coffeeList" />
</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { coffeeListsData } from '@/api/product';
import { ICoffeeList } from '@/types/product';
import PageTitle from '@/components/PageTitle.vue';
import ProductTable from '@/components/ProductTable.vue';
export default defineComponent({
  name: 'OrderList',

  components: {
    PageTitle,
    ProductTable,
  },

  setup(){
    const coffeeList = reactive<ICoffeeList[]>(coffeeListsData);

    return { coffeeList };
  }
});
</script>

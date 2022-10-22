import { $_ } from '@/utils/tools';
import { defineStore } from 'pinia';
import { ICoffeeCartInfo } from '@/types/product';

export const useProductStore = defineStore('product', {
    state: () => {
        return {
            cartList:[] as ICoffeeCartInfo[],
        }
    },

    getters: {
        cartListValue(state){
            return state.cartList;
        },
    },

    actions: {
        addProductToCarts(coffeeInfo: ICoffeeCartInfo): void {
            this.cartList.push(coffeeInfo);
        },
        updateCoffeeFromCarts(list: ICoffeeCartInfo): void{
            this.cartList = $_.map(this.cartList, (data) => {
                return data.uuid == list.uuid ? list : data;
            });
        },
        deleteProductFromCarts(uuid: string): void {
            $_.remove(this.cartList, (list: ICoffeeCartInfo): boolean => {
                return list.uuid === uuid;
            });
        },
    }
});

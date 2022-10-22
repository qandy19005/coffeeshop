import coffeeConstant from '@/constants/coffee';
import { ICoffeeList } from '@/types/product';

interface FunctionSetCoffeePrice {
    (size:string, coffeeInfo:ICoffeeList, amount: number): number;
}

export const setCoffeePrice: FunctionSetCoffeePrice = (size, coffeeInfo, amount) => {
    switch(size){
      case coffeeConstant.SIZE.SMALL:
        return coffeeInfo.smallCupPrice*amount;
      case coffeeConstant.SIZE.MEDIUM:
        return coffeeInfo.mediumCupPrice*amount;
      case coffeeConstant.SIZE.LARGE:
        return coffeeInfo.largeCupPrice*amount;
      default:
        return 0;
    }
}

interface ICoffeeList {
    id: number;
    name: string;
    largeCupPrice: number;
    mediumCupPrice: number;
    smallCupPrice: number;
}

interface ICoffeeInfo {
    id: number;
    name: string;
    price: number;
    size: string;
    notes: string;
    amount: number;
}

interface ICoffeeCartInfo {
    uuid: string,
    id: number;
    name: string;
    price: number;
    size: string;
    notes: string;
    amount: number;
}

export { ICoffeeList, ICoffeeInfo, ICoffeeCartInfo };

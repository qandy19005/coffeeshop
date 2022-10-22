import { useToast } from "vue-toastification";

const toast = useToast();
const toastClass = {
    toastClassName: "my-custom-toast-class",
    bodyClassName: ["custom-class", "wrapper-custom-class"]
}
export const successAddToast = ():void => {
    toast("加入成功", {
        timeout: 2000,
        ...toastClass,
    });
}

export const successEditToast = ():void => {
    toast("修改成功", {
        timeout: 2000,
        ...toastClass,
    });
}

export const successRemoveToast = ():void => {
    toast("刪除成功", {
        timeout: 2000,
        ...toastClass,
    });
}

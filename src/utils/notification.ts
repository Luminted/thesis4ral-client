import { toast, ToastOptions } from "react-toastify"


const toastConfig:ToastOptions = {
    position: "top-right",
    draggable: false
}

export const errorNotification = (message: string) => toast.error(message, toastConfig);

export const infoNotification = (message: string, autoClose: boolean = true) => toast.info(message, {
    ...toastConfig,
    ...autoClose ? {} : {autoClose: false}
});

export const successNotification = (message: string) => toast.success(message, toastConfig);

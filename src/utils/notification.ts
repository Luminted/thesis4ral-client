import { toast, ToastOptions } from "react-toastify"


const toastConfig:ToastOptions = {
    position: "top-right",
}

export const errorNotification = (message: string) => toast.error(message, toastConfig);
export const infoNotification = (message: string) => toast.info(message, toastConfig);
export const successNotification = (message: string) => toast.success(message, toastConfig);

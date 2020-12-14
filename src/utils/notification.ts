import { toast } from "react-toastify";

export const warningNotification = (message: string) => toast.warn(message);

export const errorNotification = (message: string) => toast.error(message);

export const infoNotification = (message: string, autoClose: boolean = true) =>
  toast.info(message, {
    ...(autoClose ? {} : { autoClose: false }),
  });

export const successNotification = (message: string) => toast.success(message);

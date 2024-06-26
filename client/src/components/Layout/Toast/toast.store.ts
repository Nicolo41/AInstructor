import { create } from "zustand";

export type ToastTypes = "info" | "success" | "error";

const TOAST_DURATION = 5000;

type ToastStore = {
  type: ToastTypes;
  title: string;
  show: boolean;
  setType: (newType: ToastTypes) => void;
  setTitle: (newTitle: string) => void;
  setShow: (newShow: boolean) => void;
  openToast: (type: ToastTypes, title: string) => void;
};

export const toastStore = create<ToastStore>((set, get) => ({
  type: "info",
  title: "Toast notification",
  show: false,
  setType: (newType) => {
    set(() => ({ type: newType })); // Set type user from argument of method
  },
  setTitle: (newTitle) => {
    set(() => ({ title: newTitle })); // Set type user from argument of method
  },
  setShow: (newShow) => {
    set(() => ({ show: newShow })); // Set type user from argument of method
  },

  openToast: (type: ToastTypes, title: string) => {
    if (get().show) {
      get().setShow(false);
    }

    set(() => {
      return { type, title, show: true };
    });
  },
}));

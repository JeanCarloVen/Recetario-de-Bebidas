import type { StateCreator } from "zustand";
import type { FavoriteSliceType } from "./favoritesSlice";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, "text" | "error">) => void;
  hideNotification: () => void;
};

export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoriteSliceType,
  [],
  [],
  NotificationSliceType
> = (set, get) => ({
  notification: {} as Notification,
  showNotification: (payload) => {
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    })
    setTimeout( () => {
        get().hideNotification()
    }, 4000)
  },
  hideNotification: () => {
    set({
      notification: {
        text: '',
        error: false,
        show: false,
      },
    });
  },
});

//A esto se le conoce como  Slice Pattern

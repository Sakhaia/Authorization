import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../../shared/api/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDeffaultMiddleware) =>
    getDeffaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch); // обновляет данные при выходе

export type RooteState = ReturnType<typeof store.getState>; // возвращает состояние
export type AppDispatch = typeof store.dispatch; // принимает экшены

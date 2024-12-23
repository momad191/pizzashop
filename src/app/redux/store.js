import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice";
import ordersReducer from "./ordersSlice";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    orders: ordersReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "./reducers/user";

const Store = configureStore({
  reducers: {
    user: useReducer,
  },
});

export default Store;

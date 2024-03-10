import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import restaurantReducer from "./features/restaurantSlice";

export const store = configureStore({
  // connect the basketSlice to the global store
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});

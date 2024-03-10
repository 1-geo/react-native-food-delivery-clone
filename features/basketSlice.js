import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // array of dishes, can contain duplicates if more than 1
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // take items and append from the payload
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        // remove (splice is array js function)
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Cant remove dish (id: ${action.payload.id}) as its not in basket"
        );
      }

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// select/retriver from store with key name basket. this retrieves entire items
export const selectBasketItems = (state) => state.basket.items;

// select/retriever for specific dish
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

// go thru the array and use reduce list function to add item
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice'
import cartReducer from './features/cartSlice'
import sortReducer from './features/sortProducts'
import tempReducer from './features/tempCart'

export const store = configureStore({
  reducer: {

    products: productsReducer,
    cart: cartReducer,
    sort: sortReducer,
    temp: tempReducer
  },
});
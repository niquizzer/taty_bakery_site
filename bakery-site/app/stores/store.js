import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../checkout/checkoutSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
});

export default store;
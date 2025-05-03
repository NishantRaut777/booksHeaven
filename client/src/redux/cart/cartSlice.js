import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartData: null,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cartData = action.payload;
            state.loading = false
        },
        clearCart: (state) => {
            state.cartData = null;
        }
    }
});

export const {
    setCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
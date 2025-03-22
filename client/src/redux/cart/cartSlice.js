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
        }
    }
});

export const {
    setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk(
    'cart/getCarItems',
    () => {
        return fetch(url)
            .then(resp => resp.json())
            .catch(error => console.error(error));
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) =>
                item.id !== itemId
            );
        },
        toggle: (state, { payload }) => {
            const itemId = payload.id;
            const item = state.cartItems.find((item) => item.id === itemId);
            if (payload.action === 'increase') {
                item.amount += 1;
            } else if (payload.action === 'decrease' && item.amount > 1) {
                item.amount -= 1;
            } else if (payload.action === 'decrease' && item.amount <= 1) {
                state.cartItems = state.cartItems.filter((item) =>
                    item.id !== itemId
                );
            }
        },
        calculateTotals: (state) => {
            let total = 0;
            let amount = 0;

            state.cartItems.forEach((item) => {
                total += item.amount * item.price;
                amount += item.amount;
            });

            state.total = total;
            state.amount = amount;
        }
    },
    extraReducers: {
        [getCartItems.pending]:(state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]:(state, action) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]:(state) => {
            state.isLoading = false;
        },
    }
});

export const { clearCart, removeItem, toggle, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
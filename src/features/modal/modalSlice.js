import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}

const modalSclice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal: (state, { payload }) => {
            state.isOpen = payload;
        }
    }
})

export const { toggleModal } = modalSclice.actions;
export default modalSclice.reducer;
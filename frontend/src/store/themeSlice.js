import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode: localStorage.getItem('theme') || 'light',
}

const themeSlice = createSlice({
    name: "Theme",
    initialState,
    reducers: 
    {
        setTheme : (state,action) => {
            state.mode = action.payload;
            localStorage.setItem('theme' , action.payload)
        }
    }
})
export const themeReducer = themeSlice.reducer;
export const {setTheme} = themeSlice.actions;
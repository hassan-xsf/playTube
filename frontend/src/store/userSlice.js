import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus: null,
    authData: null
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login: (state,action) => {
            state.authStatus = true;
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authStatus = false,
            state.authData = null;
        }
    }
})


export const authReducer = authSlice.reducer;
export const {login,logout} = authSlice.actions;
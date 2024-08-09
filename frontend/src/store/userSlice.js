import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus: null,
    authData: null,
    channelUsername: null
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
        },
        setChannel : (state,action) => {
            state.channelUsername = action.payload;
        }
    }
})


export const authReducer = authSlice.reducer;
export const {login,logout,setChannel} = authSlice.actions;
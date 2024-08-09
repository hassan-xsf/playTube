import {configureStore} from '@reduxjs/toolkit'
import { themeReducer } from './themeSlice'
import { authReducer } from './userSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer
    }
})

export default store; 
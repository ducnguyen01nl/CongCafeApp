import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import table from './slices/tableSlice'

export const store = configureStore({
    reducer: {
        user,
        table
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
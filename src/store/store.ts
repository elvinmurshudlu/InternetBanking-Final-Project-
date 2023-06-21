import {configureStore} from "@reduxjs/toolkit"
import cardsSlice from "../features/cardsSlice"
import { useDispatch } from "react-redux"
import transactionSlice from "../features/transactionSlice"
import { userDetails } from "../features/userDetails"


const store = configureStore({
    reducer:{
        userCards:cardsSlice,
        userTransactions:transactionSlice,
        [userDetails.reducerPath]: userDetails.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userDetails.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch 


export default store
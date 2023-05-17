import {configureStore} from "@reduxjs/toolkit"
import cardsSlice from "../features/cardsSlice"
import { useDispatch } from "react-redux"
import transactionSlice from "../features/transactionSlice"


const store = configureStore({
    reducer:{
        userCards:cardsSlice,
        userTransactions:transactionSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch 


export default store
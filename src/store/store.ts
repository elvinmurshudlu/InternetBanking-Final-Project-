import {configureStore} from "@reduxjs/toolkit"
import cardsSlice from "../features/cardsSlice"
import { useDispatch } from "react-redux"


const store = configureStore({
    reducer:{
        userCards:cardsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch 


export default store
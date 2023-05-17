import {AnyAction, PayloadAction, createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { FetchData } from "../services/UserInformations"
import { ICard } from "../Models/Card"


export const fetchCards = createAsyncThunk(
    "fetchCards",
    async()=>{
         return (await FetchData.getCards()).data 
    }
)

const initialState = {
    cards:[]
} as {cards:ICard[]} 


export const cardsSlice = createSlice({
    name:"cardSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCards.fulfilled,(state,action:PayloadAction<ICard[]>)=>{
            state.cards = action.payload
        })

    }
})

export default cardsSlice.reducer



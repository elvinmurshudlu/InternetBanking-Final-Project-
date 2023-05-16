import {AnyAction, createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { FetchData } from "../services/UserInformations"


export const fetchCards = createAsyncThunk(
    "fetchCards",
    async()=>{
         return await FetchData.getCards() 
    }
)
const initialState = {
    cards:[]
} 


export const cardsSlice = createSlice({
    name:"cardSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCards.fulfilled,(state,action:any)=>{
            state.cards = action.payload.data
        })

    }
})

export default cardsSlice.reducer



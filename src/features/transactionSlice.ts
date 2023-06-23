import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ITransactions } from "../Models/Transactions"

const initialState = {
  transactions: [],
} as { transactions: ITransactions[] }

const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<ITransactions[]>) => {
      state.transactions = action.payload
    },
    addTransaction: (state, action: PayloadAction<ITransactions>) => {
      state.transactions.push(action.payload)
    },
  },
})

export default transactionsSlice.reducer

export const { setTransactions, addTransaction } = transactionsSlice.actions

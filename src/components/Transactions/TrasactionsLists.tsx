import React from 'react'
import { ITransactions } from '../../Models/Transactions'
import {  Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import TransactionListItem from './TransactionListItem'

export default function Trasactions({transactions}:{transactions:ITransactions[]}) {



  return (
    <Box sx={{width:"100%",padding:"0 0 10px 0",backgroundColor:`rgba(81,45,168,0.6)`,borderRadius:"15px",height:"100%"}}>
          <Box sx={{width:"100%",height:"10%",padding:"10px 20px"}}> Filter</Box>

            <List sx={{width:"100%"  ,height:"90%",overflow:"scroll",padding:"5px 0"}}>

            {transactions.map((transaction)=>(
                <TransactionListItem transaction={transaction}></TransactionListItem>
            ))}
            
            

            </List>

    </Box>
  )
}

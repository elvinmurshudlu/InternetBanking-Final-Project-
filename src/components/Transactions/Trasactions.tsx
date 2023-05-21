import React from 'react'
import { ITransactions } from '../../Models/Transactions'
import {  List, ListItem, ListItemButton, ListItemText } from '@mui/material'

export default function Trasactions({transactions}:{transactions:ITransactions[]}) {



  let test = [{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},{amount:100},] as {amount:number}[]

  return (
    <List sx={{width:"100%"}}>
        {test.map((transaction:{amount:number})=>(
            <ListItem sx={{paddingTop: 0, paddingBottom: 0}}>
              
              <ListItemButton sx={{height:60}} >
                  <ListItemText>{transaction.amount}</ListItemText>
              </ListItemButton>
            </ListItem>
        ))}

    </List>
  )
}

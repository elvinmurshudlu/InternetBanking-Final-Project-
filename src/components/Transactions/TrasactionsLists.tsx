import React from 'react'
import { ITransactions } from '../../Models/Transactions'
import {  List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'

export default function Trasactions({transactions}:{transactions:ITransactions[]}) {


  return (
    <List sx={{width:"100%" ,backgroundColor:`rgba(81,45,168,0.3)`,borderRadius:"15px" ,height:"100%",overflow:"scroll",backdropFilter:"blur(10px)",padding:"20px 0"}}>

        {transactions.map((transaction)=>(
            <ListItem sx={{paddingTop: 1, paddingBottom: 1}}>
              
              <ListItemButton sx={{height:75,color:"white",display:"flex",flexWrap:"wrap"}} >
                
                  <ListItemText >{transaction.connectedUser}</ListItemText>
                  <ListItemText>{transaction.connectedCard}</ListItemText>
                  <ListItemText>{transaction.amount}</ListItemText>
                  <ListItemText>{transaction.createdAt}</ListItemText>
                  
              </ListItemButton>
            </ListItem>
        ))}

    </List>
  )
}

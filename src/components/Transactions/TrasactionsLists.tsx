import React from 'react'
import { ITransactions } from '../../Models/Transactions'
import {  Box, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import TransactionListItem from './TransactionListItem'

export default function Trasactions({transactions}:{transactions:ITransactions[]}) {



  return (
    <Grid container sx={{width:"100%",padding:"0 0 10px 0",borderRadius:"15px",height:"100%"}}>

      <Grid item xs={12}>
      <Typography variant='h5'>Recent Transactions</Typography>   

      </Grid>
        
        <Grid item xs={4}>
          <List sx={{display:"flex"}}>
            <ListItem>
              <ListItemButton>
                All
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                Income
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                Expense
              </ListItemButton>
            </ListItem>
            </List>
          </Grid> 
         
          <Grid item sx={{height:"70%",width:"100%",backgroundColor:`#FFF`,position:"relative"}}>
              <Grid container sx={{width:"100%",padding:"10px ",color:"#718EBF",position:"absolute",top:"0",left:"0",backgroundColor:"white",zIndex:"1"}}>
                <Grid item xs={2}>Description</Grid>
                <Grid item xs={1.5}>Transaction ID</Grid>
                <Grid item xs={1.5}>Type</Grid>
                <Grid item xs={2}>Card</Grid>
                <Grid item xs={2}>Date</Grid>
                <Grid item xs={1.5}>Amount</Grid>
                <Grid item xs={1}>Receipt</Grid>
              </Grid>

              <List sx={{width:"100%",height:"90%",overflow:"scroll",padding:"5px 0",marginTop:"15px"}}>

              {transactions.map((transaction)=>(
                  <TransactionListItem transaction={transaction}></TransactionListItem>
              ))}
              
              

              </List>
          </Grid>


    </Grid>
  )
}

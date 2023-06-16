import React from 'react'
import { ITransactions } from '../../Models/Transactions'
import {  Box, Grid, List, ListItem, ListItemButton, ListItemText, NativeSelect, Typography } from '@mui/material'
import TransactionListItem from './TransactionListItem'
import {useState} from "react"

export default function Trasactions({transactions}:{transactions:ITransactions[]}) {
  const [filterTransaction,setFilter] = useState("All")


  function filter(datas:ITransactions[]){
    let result = []
    for(let a =0;a<datas.length;a++){
      if(filterTransaction === "All"){
        result.push(datas[a])
      }else if(filterTransaction === "Expense"){
        if(+datas[a].amount<0) result.push(datas[a])
      }else{
        if(+datas[a].amount>0) result.push(datas[a])
      }
    }
    return result

  }


  return (
    <Grid container sx={{width:"100%",padding:"0 0 10px 0",borderRadius:"15px",height:"100%"}}>

      <Grid item xs={12}>
        <Typography variant='h6'>Recent Transactions</Typography>   
      </Grid>
        
        <Grid item xs={4} sx={{paddingLeft:"10px"}}>
          
            <NativeSelect
            value={filterTransaction}
            onChange={(e:any)=>setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </NativeSelect>
          </Grid> 
         
          <Grid item sx={{height:"80%",width:"100%",backgroundColor:`#FFF`,position:"relative",overflow:"hidden"}}>
              <Grid container sx={{width:"100%",padding:"10px 15px",color:"#718EBF",position:"absolute",top:"0",left:"0",backgroundColor:"white",zIndex:"1",display:{xs:"none",md:"flex"}}}>
                <Grid item xs={2}><Typography>Description</Typography></Grid>
                <Grid item xs={1.5}><Typography>Transaction ID</Typography></Grid>
                <Grid item xs={1.5}><Typography>Type</Typography></Grid>
                <Grid item xs={2}><Typography>Card</Typography></Grid>
                <Grid item xs={2}><Typography>Date</Typography></Grid>
                <Grid item xs={1.5}><Typography>Amount</Typography></Grid>
                <Grid item xs={1}><Typography>Receipt</Typography></Grid>
              </Grid>

              <List sx={{width:"100%",height:"100%",overflow:"scroll",padding:"5px 0",marginTop:"15px"}}>

              {filter(transactions).map((transaction)=>(
                  <TransactionListItem transaction={transaction}></TransactionListItem>
              ))}
              
              

              </List>
          </Grid>


    </Grid>
  )
}

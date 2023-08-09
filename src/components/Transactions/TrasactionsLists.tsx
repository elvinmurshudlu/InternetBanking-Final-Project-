import React, {useContext} from 'react'
import { ITransactions } from '../../Models/Transactions'
import {  Box, Grid, List, Skeleton, NativeSelect, Typography } from '@mui/material'
import TransactionListItem from './TransactionListItem'
import {useState} from "react"
import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";
import {palette,ThemeApi} from "../../contextApi/ThemeContext"

export default function Trasactions({transactions,isLoading}:{transactions:ITransactions[],isLoading?:boolean}) {
  const [filterTransaction,setFilter] = useState("All")


  const mode = useContext(ThemeApi)

  const language = useContext(LanguageApi)

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

  if(isLoading){
    return (

      <>
      <Skeleton variant='text' height={40}></Skeleton>
      <Skeleton variant='rectangular' height={90}></Skeleton>
      <Skeleton variant='rectangular' height={90}></Skeleton>
      <Skeleton variant='rectangular' height={90}></Skeleton>
      </>
    )
  }


  return (
    <Grid container sx={{width:"100%",padding:"0 0 10px 0",borderRadius:"15px",height:"100%",}}>

      <Grid item xs={12}>
        <Typography sx={{color:palette.textColor[mode.mode]}} variant='h6'>{dictionary["Recent Transactions"][language.language]}</Typography>
      </Grid>
        
        <Grid item xs={4} sx={{paddingLeft:"10px"}}>
          
            <NativeSelect
            sx={{color:palette.textColor[mode.mode]}}
            value={filterTransaction}
            onChange={(e:any)=>setFilter(e.target.value)}
            >
              <option style={{backgroundColor:palette.componentsBackground[mode.mode]}} value="All">{dictionary["All"][language.language]}</option>
              <option style={{backgroundColor:palette.componentsBackground[mode.mode]}} value="Expense">{dictionary["Expense"][language.language]}</option>
              <option style={{backgroundColor:palette.componentsBackground[mode.mode]}} value="Income">{dictionary["Income"][language.language]}</option>
            </NativeSelect>
          </Grid> 
         
          <Grid item sx={{height:"80%",width:"100%",backgroundColor:palette.componentsBackground[mode.mode],position:"relative",overflow:"hidden",borderRadius:"20px"}}>
              <Grid container sx={{width:"100%",padding:"10px 15px",color:"#718EBF",position:"absolute",top:"0",left:"0",backgroundColor:palette.componentsBackground[mode.mode],zIndex:"1",display:{xs:"none",md:"flex"}}}>
                <Grid item xs={2}><Typography>{dictionary["Description"][language.language]}</Typography></Grid>
                <Grid item xs={1.5}><Typography>{dictionary["Transaction ID"][language.language]}</Typography></Grid>
                <Grid item xs={1.5}><Typography>{dictionary["Type"][language.language]}</Typography></Grid>
                <Grid item xs={2}><Typography>{dictionary["Card"][language.language]}</Typography></Grid>
                <Grid item xs={2}><Typography>{dictionary["Date"][language.language]}</Typography></Grid>
                <Grid item xs={1.5}><Typography>{dictionary["Amount"][language.language]}</Typography></Grid>
                <Grid item xs={1}><Typography>{dictionary["Receipt"][language.language]}</Typography></Grid>
              </Grid>

              <List sx={{width:"100%",height:"100%",overflow:"scroll",padding:"5px 0",marginTop:"15px",backgroundColor:palette.componentsBackground[mode.mode]}}>

              {filter(transactions).map((transaction)=>(
                  <TransactionListItem transaction={transaction}></TransactionListItem>
              ))}
              
              

              </List>
          </Grid>


    </Grid>
  )
}

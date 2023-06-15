import {   Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Trasactions from "../../components/Transactions/TrasactionsLists";
import QuickTransfer from "../../components/QuickTransfer/QuickTransfer";
import { ITransactions } from "../../Models/Transactions";
import { State } from "../../Models/LoginRegister";
import {useState} from "react"
import CardsContainer from "../../container/CardsContainer/CardsContainer";
import TransactionsTable from "../../components/Transactions/TransactionsTable";

export default function Transactions() {      
      const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)

      function reverse(array:ITransactions[]){

        const reversedArray:ITransactions[] = []       

        for(let a = array.length - 1 ; a >= 0 ; a--){
          reversedArray.push(array[a])
        }
        return reversedArray 

      }


      

    


  return (
    
    <Grid container sx={{width:"100%",padding:" 0 ",height:"100%",rowGap:"0px"}}>

          <Grid item xs={12} md={8}>
            <CardsContainer arrowControl={false}></CardsContainer>
          </Grid>

                                                  
          <Grid item xs={12}  sx={{height:"50%"}}>

            <Trasactions transactions={reverse(transactions)}></Trasactions>
            {/* <TransactionsTable transactions={reverse(transactions)}></TransactionsTable> */}
 
          </Grid> 
          
          
          {/* <Grid item xs={12}  lg={4} sx={{padding:{sx:"0",md:"0 15px"},height:"100%"}}>

              <QuickTransfer></QuickTransfer>

                
          </Grid> */}
          

          
          

    </Grid>

  )
}

import {   Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Trasactions from "../../components/Transactions/TrasactionsLists";
import QuickTransfer from "../../components/QuickTransfer/QuickTransfer";
import { ITransactions } from "../../Models/Transactions";

export default function Transactions() {      
      const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)

      function reverse(array:ITransactions[]){

        const reversedArray:ITransactions[] = []
        

        for(let a = array.length-1;a>=0;a--){
          reversedArray.push(array[a])

        }
        return reversedArray 

      }

      


  return (
    
    <Grid container sx={{width:"100%",padding:"20px 0 ",height:"100%",rowGap:"20px"}}>

                                                   {/* ,overflow:"scroll" */}
          <Grid item xs={12} md={8} sx={{height:"100%"}}>

            <Trasactions transactions={reverse(transactions)}></Trasactions>
 
          </Grid>
          
          
          <Grid item xs={12}  md={4} sx={{padding:"0 15px",height:"100%"}}>

              <QuickTransfer></QuickTransfer>

                
          </Grid>
          

          


    </Grid>

  )
}

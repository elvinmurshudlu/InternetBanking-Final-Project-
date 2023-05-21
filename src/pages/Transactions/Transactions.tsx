import {  Grid } from "@mui/material";
import {  GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Trasactions from "../../components/Transactions/Trasactions";

export default function Transactions() {

      
      const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)

  return (
    
    <Grid container sx={{width:"100%",padding:"10px 0 0 0",height:"100%"}}>


          <Grid item md={8} sx={{height:"100%",overflow:"scroll"}}>
            
            <Trasactions transactions={transactions}></Trasactions>

          </Grid>
          <Grid item md={4}>

          </Grid>
          

          


    </Grid>

  )
}

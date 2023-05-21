import {  Grid } from "@mui/material";
import {  GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Trasactions from "../../components/Transactions/TrasactionsLists";

export default function Transactions() {

      
      const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)

  return (
    
    <Grid container sx={{width:"100%",padding:"20px 0 ",height:"100%"}}>

                                                   {/* ,overflow:"scroll" */}
          <Grid item xs={12} md={8} sx={{height:"100%"}}>

            <Trasactions transactions={transactions}></Trasactions>
 
          </Grid>
              <Grid item md={4} sx={{display:{xs:"none",md:"flex"}}}>

          </Grid>
          

          


    </Grid>

  )
}

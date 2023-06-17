import {   Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Trasactions from "../../components/Transactions/TrasactionsLists";
import { ITransactions } from "../../Models/Transactions";
import CardsContainer from "../../container/CardsContainer/CardsContainer";

import {useEffect,useState} from "react"

import {ResponsiveBar} from "@nivo/bar"
import QuickTransfer from "../../components/QuickTransfer/QuickTransfer";

export default function Transactions() {      
      const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)

      const [currentSlider , setCurrentSlider] = useState(0)


      


      function reverse(array:ITransactions[]){

        const reversedArray:ITransactions[] = []       

        for(let a = array.length - 1 ; a >= 0 ; a--){
          reversedArray.push(array[a])
        }
        return reversedArray 

      }


      function dataFilter(data:ITransactions[]){
        let result = [
          {
            day: "Monday",
            expense: 0
          },
          {
            day: "Tuesday",
            expense: 0
          },
          {
            day: "Wednesday",
            expense: 0
          },
          {
            day: "Thursday",
            expense: 60
          },
          {
            day: "Friday",
            expense: 0
          },
          {
            day: "Saturday",
            expense: 0
          },
          {
            day: "Sunday",
            expense: 0
          }
        ]

        

        for(let a =0 ;a <data.length;a++){

          if(+data[a].amount <0){
            let date = new Date(data[a].createdAt)
            result[date.getDay()]["expense"] += Math.abs(+data[a].amount)
          }

        }

        return result
      }


      useEffect(()=>{
        transactions && dataFilter(transactions)
      },[transactions])


    


  return (
    
    <Grid container sx={{width:"100%",padding:" 0 ",height:"100%"}}>

          <Grid item xs={12} md={8} sx={{padding:"0"}}>
            <CardsContainer currentSlider={currentSlider} setCurrentSlider={setCurrentSlider}></CardsContainer>
          </Grid>

          
          {
            transactions && <Grid item xs={12} md={4} sx={{padding:"0",height:"230px"}}>
              <Typography variant="h6">My Expense</Typography>
            <ResponsiveBar data={dataFilter(transactions)} keys={["expense"]}
             indexBy="day" 
             margin={{ top: 20, right: 10, bottom: 20, left: 30 }}
             padding={0.1}
             valueScale={{ type: "linear" }}
             colors="#3182CE"
             // animate={true}
             enableLabel={false}
             axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "degrees",
              legendPosition: "middle",
              legendOffset: -40
            }}
             
           ></ResponsiveBar>

     </Grid>
          }


                                                  
          <Grid item xs={12}  sx={{height:"60%"}}>

            {transactions && <Trasactions transactions={reverse(transactions)}></Trasactions>}
 
          </Grid> 


          {/* <Grid item xs={12}>
            <QuickTransfer></QuickTransfer>
          </Grid>
           */}
          
          
          

          
          

    </Grid>

  )
}

import {   Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Trasactions from "../../components/Transactions/TrasactionsLists";
import { ITransactions } from "../../Models/Transactions";
import CardsContainer from "../../container/CardsContainer/CardsContainer";
import {dictionary} from "../../Language/lang";

import {useContext, useEffect, useState} from "react"

import {ResponsiveBar} from "@nivo/bar"
import QuickTransfer from "../../components/QuickTransfer/QuickTransfer";
import { useGetUserCardsQuery } from "../../features/cardDetails";
import {LanguageApi} from "../../contextApi/LanguageContext";

import {palette,ThemeApi} from "../../contextApi/ThemeContext"

export default function Transactions() {
    const language = useContext(LanguageApi);

      const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)

      const [currentSlider , setCurrentSlider] = useState(0)

      const {data:cards=[],isLoading} = useGetUserCardsQuery("")


      const mode = useContext(ThemeApi)
      


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
            day: dictionary["Monday"][language.language],
            expense: 0
          },
          {
            day: dictionary["Tuesday"][language.language],
            expense: 0
          },
          {
            day: dictionary["Wednesday"][language.language],
            expense: 0
          },
          {
            day: dictionary["Thursday"][language.language],
            expense: 60
          },
          {
            day: dictionary["Friday"][language.language],
            expense: 0
          },
          {
            day: dictionary["Saturday"][language.language],
            expense: 0
          },
          {
            day: dictionary["Sunday"][language.language],
            expense: 0
          }
        ]

        

        for(let a =0 ;a <data.length;a++){

          if(+data[a].amount <0){
            let date = new Date(data[a].createdAt)
            result[date.getDay()-1]["expense"] += Math.abs(+data[a].amount)
          }

        }

        return result
      }


      useEffect(()=>{
        transactions && dataFilter(transactions)
      },[transactions])


    


  return (
    
    <Grid container  sx={{width:"100%",padding:" 0 ",height:"100%",justifyContent:"space-between"}}>

          <Grid item xs={12} md={7} sx={{padding:"0"}}>
            <CardsContainer cards={cards} isLoading={isLoading} currentSlider={currentSlider} setCurrentSlider={setCurrentSlider}></CardsContainer>
          </Grid>

          
          
            
           {
            transactions &&  <Grid item xs={12} md={4} sx={{padding:"10px",height:"260px",backgroundColor:palette.componentsBackground[mode.mode],borderRadius:'20px'}}>
            <Typography sx={{color:palette.textColor[mode.mode]}} variant="h6">{dictionary["My Expense"][language.language]}</Typography>
          <ResponsiveBar data={dataFilter(transactions)} keys={["expense"]}
           indexBy="day" 
           margin={{ top: 30, right: 10, bottom: 55, left: 30 }}
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

            {transactions && <Trasactions isLoading={isLoading} transactions={reverse(transactions)}></Trasactions>}
 
          </Grid> 


          
          
          
          
          

          
          

    </Grid>

  )
}

import { Box,Skeleton } from '@mui/material'
import React from 'react'
import { ICard } from '../../Models/Card'
import { ITransactions } from '../../Models/Transactions'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { cardNumber } from '../../utils/functions';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CreditChart({cards,transactions,isLoading}:{cards:ICard[],transactions:ITransactions[],isLoading?:boolean}) {

    let cardDetail: { [key: string]: number } = {};

    if(cards.length){
        for(let a =0 ;a<cards.length;a++){
            cardDetail[cards[a].cardNumber] = 0 
        }

        if(transactions.length){
            for(let a =0;a<transactions.length;a++){
                if(+transactions[a].amount<0){
                    cardDetail[transactions[a].ownerCard] += Math.abs(+transactions[a].amount)
                }
            }
            
        }
    }

    const data = {
        labels: Object.keys(cardDetail).map((detail)=>cardNumber(detail)),
        datasets: [
          {
            label: 'Expense',
            data: Object.values(cardDetail),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };


      if(isLoading){
        return (
          <>
          <Skeleton variant='text' height={20}></Skeleton>
          <Skeleton variant='text' height={20}></Skeleton>
          <Skeleton variant='text' height={20}></Skeleton>
          <Skeleton variant='rectangular' height={250}></Skeleton>
          </>
        )
      }

  return (
    <Box>
        <Pie data={data} />
    </Box>
  )
}

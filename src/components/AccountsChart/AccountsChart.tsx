import React from 'react'
import Section from '../../container/Section/Section'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { ITransactions } from '../../Models/Transactions';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  
  
  
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      
    },
  };
  
const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
 
  

export default function AccountsChart({transactions,header}:{transactions:ITransactions[],header:string}) {

    let expense = [] as number[]
    let income = [] as number[]

    if(transactions.length){
        for(let a =0 ;a <transactions.length;a++){

            if(+transactions[a].amount <0){
              let date = new Date(transactions[a].createdAt)
              if(expense[date.getDay()]){
                expense[date.getDay()] += Math.abs(+transactions[a].amount)
              }else{
                expense[date.getDay()] = Math.abs(+transactions[a].amount)

              }
            }else{
                let date = new Date(transactions[a].createdAt)
              if(income[date.getDay()]){
                income[date.getDay()] += Math.abs(+transactions[a].amount)
              }else{
                income[date.getDay()] = Math.abs(+transactions[a].amount)

              }

            }
  
          }
          console.log(expense,income);
    }

    const data = {
        labels,
        datasets: [
          {
            label: 'Income',
            data:income ,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Expense',
            data:expense ,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
  return (
    <Section header={header} height='360px' >
            <Bar  options={options} data={data} />
    </Section>
  )
}

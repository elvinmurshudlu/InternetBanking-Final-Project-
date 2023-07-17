import Section from '../../container/Section/Section'
import {dictionary} from "../../Language/lang";
import {useContext} from "react";
import {LanguageApi} from "../../contextApi/LanguageContext";
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


  import {Skeleton} from "@mui/material"

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

// const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// const labels = ['Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə', 'Bazar'];

const labels = {
    "AZE":['Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə', 'Bazar'],
    "EN":['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
} as {[key:string]:string[]}

export default function AccountsChart({transactions,header,isLoading}:{transactions:ITransactions[],header:string,isLoading?:boolean}) {
    const language = useContext(LanguageApi)

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
    }

    const data = {
        labels:labels[language.language],
        datasets: [
          {
            label: dictionary["Income"][language.language],
            data:income ,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: dictionary["Expense"][language.language],
            data:expense ,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

      if(isLoading){
        return(
          <>
          <Skeleton variant='text' animation="wave" height={25}></Skeleton>
          <Skeleton variant='rectangular' animation="wave" height={250}></Skeleton>
          </>
        )
      }


  return (
    <Section header={header} height='360px' >
            <Bar  options={options} data={data} />
    </Section>
  )
}

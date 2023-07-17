import { Grid,Box,Typography } from '@mui/material'
import {useContext, useEffect, useState} from 'react'
import CardsContainer from '../../container/CardsContainer/CardsContainer'
import Chip from '../../components/Chip/Chip'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ITransactions } from '../../Models/Transactions'
import { IChip } from '../../Models/Chip'
import { ICard } from '../../Models/Card'
import TransactionAccount from '../../components/Transactions/TransactionAccount'
import Section from '../../container/Section/Section'
import AccountsChart from '../../components/AccountsChart/AccountsChart'
import { useGetUserCardsQuery } from '../../features/cardDetails'

import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";


export default function Accounts() {

  const language = useContext(LanguageApi)
  const [currentSlider , setCurrentSlider] = useState(0)

  // const cards = useSelector((state:RootState)=>state.userCards.cards as ICard[])

  const {data:cards=[],isLoading} = useGetUserCardsQuery("")

  const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)


  const [chip,setChip] = useState<IChip[]|null>(null)


  function sumIncome(data:ITransactions[]){
    let sum = 0

    for(let a =0 ; a<data.length;a++){
      if(data[a].ownerCard === cards[currentSlider].cardNumber){
        if(+data[a].amount > 0){
          sum += +data[a].amount
        }

      }
    }
    return {
      header:"Income",
      title:sum.toString(),
      currency:"AZN",
      image:"./icons/income.svg"
    } as IChip

  }

  
  function sumExpense(data:ITransactions[]){
    let sum = 0

    for(let a =0 ; a<data.length;a++){
      if(data[a].ownerCard === cards[currentSlider].cardNumber){
        if(+data[a].amount < 0){
          sum += +data[a].amount
        }

      }
    }
    return {
      header:"Expense",
      title:sum.toString(),
      currency:"AZN",
      image:"./icons/expense.svg"
    } as IChip

  }

  function cardBalance(card:ICard){

    return {
      header:"My Balance",
      title:card.amount,
      currency:card.currency,
      image:"./icons/balanceIcon.svg"

    } as IChip

  }
  
  function filterTransactions(datas:ITransactions[]){
    let result = [] as ITransactions[]

    if(cards.length && transactions.length){
      for(let a = datas.length-1 ; a>=0;a--){
        if(datas[a].ownerCard === cards[currentSlider].cardNumber){
          result.push(datas[a])
        }
      }
    }

    return result

  }

  useEffect(()=>{
    if(cards.length  && transactions.length){
    
      setChip([cardBalance(cards[currentSlider]),sumIncome(transactions),sumExpense(transactions)])

    }

  },[cards,currentSlider,transactions])


  return (
    <Grid container rowSpacing={2} sx={{justifyContent:"space-between"}}>
        <Grid item xs={12} sx={{display:"flex"}}>
             <Grid container spacing={2}>
                {chip && chip.map((ch)=>(
                  <Grid item xs={12} md={6} lg={2.5}>

                    <Chip image={ch.image} header={ch.header} title={ch.title} currency={ch.currency}></Chip>

                </Grid>
                ))}
             </Grid>
            
        </Grid>
        <Grid item xs={10.5} md={4.5} lg={3}>
            <CardsContainer cards={cards} isLoading={isLoading} currentSlider={currentSlider} setCurrentSlider={setCurrentSlider}></CardsContainer>
            

        </Grid>

        <Grid item xs={12} md={7.5} lg={9} sx={{padding:"0 0 0 20px"}}>
          
          <Section header='Last Transaction'>
              <Box sx={{width:"100%",height:"300px",backgroundColor:"#FFF",borderRadius:"20px",overflow:"scroll",padding:"20px 0"}}> 
                      {filterTransactions(transactions).map((transaction)=>(
                        <TransactionAccount transaction={transaction}></TransactionAccount>
                      ))}
              </Box>
          </Section>

        </Grid>

        

        <Grid item xs={12} md={6} sx={{height:"380px"}}>
          
          <AccountsChart  header='Debit & Credit Overview' transactions={filterTransactions(transactions)}></AccountsChart>

        </Grid>
        {/* <Grid item xs={3}>
          <Section header='Invoices Sent'>
            <Box >
              
            </Box>


          </Section>

        </Grid> */}

    </Grid>
  )
}

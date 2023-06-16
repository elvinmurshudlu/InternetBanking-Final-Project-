import { Grid,Box,Typography } from '@mui/material'
import  { useEffect, useState } from 'react'
import CardsContainer from '../../container/CardsContainer/CardsContainer'
import Chip from '../../components/Chip/Chip'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ITransactions } from '../../Models/Transactions'
import { IChip } from '../../Models/Chip'
import { ICard } from '../../Models/Card'
import TransactionAccount from '../../components/Transactions/TransactionAccount'

export default function Accounts() {
  const [currentSlider , setCurrentSlider] = useState(0)

  const cards = useSelector((state:RootState)=>state.userCards.cards as ICard[])
  console.log(cards,"+++++++++++++++++");

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
      for(let a = 0 ; a<datas.length;a++){
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
    <Grid container rowSpacing={2}>
        <Grid item xs={12} sx={{display:"flex"}}>
             <Grid container spacing={2}>
                {chip && chip.map((ch)=>(
                  <Grid item xs={12} md={6} lg={2.5}>

                    <Chip image={ch.image} header={ch.header} title={ch.title} currency={ch.currency}></Chip>

                </Grid>
                ))}
             </Grid>
            
        </Grid>

        <Grid item xs={12} md={7.5} lg={9} sx={{padding:"0 20px"}}>
          <Typography gutterBottom variant='h6'>Last Transaction</Typography>
          <Box sx={{width:"100%",height:"200px",backgroundColor:"#FFF",borderRadius:"20px",overflow:"scroll",padding:"20px 0"}}> 
                  {filterTransactions(transactions).map((transaction)=>(
                    <TransactionAccount transaction={transaction}></TransactionAccount>
                  ))}
          </Box>

        </Grid>

        <Grid item xs={10.5} md={4.5} lg={3}>
            <CardsContainer currentSlider={currentSlider} setCurrentSlider={setCurrentSlider}></CardsContainer>
            

        </Grid>

    </Grid>
  )
}

import { Box } from '@mui/material'
import React from 'react'
import Card from '../../components/Card/Card'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ICard } from '../../Models/Card'


export default function CardsContainer() {

  const cards = useSelector((state:RootState)=>state.userCards.cards as ICard[])

  return (

    <Box sx={{width:"100%",height:"250px",}}>
        <Box sx={{width:"100%",height:"90%",padding:"20px 0",display:"flex",gap:"10px"}}>
          {
            cards  && cards.map((card:ICard,index:number)=>(
              <Card key={index} cardInformation={card}></Card>

            ))
          }
        </Box>
        <Box sx={{width:"100%",height:"10%"}}>Controller</Box>
    </Box>
    )
}

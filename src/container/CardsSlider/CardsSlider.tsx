import { Box, IconButton ,Typography} from '@mui/material'
import  { useState } from 'react'
import Card from '../../components/Card/Card'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ICard } from '../../Models/Card'

import CircleIcon from '@mui/icons-material/Circle';

import {ArrowBackIosNew,ArrowForwardIos} from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors'
import { Button } from '@mui/material'
import {Link} from "react-router-dom"
import { ROUTES } from '../../constants/routePath'




export default function CardsSlider({arrowControl=true,currentSlider,setCurrentSlider,router=false}:{arrowControl?:boolean,currentSlider:number,setCurrentSlider:any,router?:boolean}) {
  // const [ currentSlider , setCurrentSlider ] = useState(0)

  const cards = useSelector((state:RootState)=>state.userCards.cards as ICard[])
  


  function changeCard(val:number){
    let newVal = currentSlider + val
    if(newVal>=cards.length) newVal = 0
    if(newVal<0) newVal = cards.length-1

    setCurrentSlider(newVal)
  }


  return (

    <Box sx={{width:"100%"}}>
      <Typography variant="h6" sx={{display:"flex",justifyContent:"space-between"}}>My Cards {router && <Button component={Link} to={ROUTES.ACCOUNT} >See details</Button>} </Typography>
        <Box sx={{width:"100%",height:"200px",position:"relative",overflow:"hidden"}}>
          {
            cards  && cards.map((card:ICard,index:number)=>(

                  <Box 
                  onClick={()=>setCurrentSlider(index)}
                  
                      sx={{
                        height:"100%",
                        position:"absolute",
                        top:"0",
                        left:'0',
                        padding:"10px 0",
                        transform: `translateX(${(index - currentSlider <0 ? cards.length+index-currentSlider :index - currentSlider )*105}%)`,
                        transition:cards.length+index-currentSlider+1===cards.length ? "0s" :"0.5s",

                      }}>
                        <Card  selected={currentSlider === index} key={index} cardInformation={card}></Card>

                  </Box>
            ))
          }
        </Box>
        
        {
          arrowControl && <Box  sx={{width:"100%",height:"20px",padding:"0 20px",display:"flex",justifyContent:"space-between"}}>
          <IconButton size='large' onClick={()=>changeCard(-1)}><ArrowBackIosNew fontSize='small'></ArrowBackIosNew></IconButton>

          <Box>{
            cards && cards.map((card:ICard,index:number)=>(
              <IconButton size='small' sx={{fontSize:"10px"}}  onClick={()=>setCurrentSlider(index)}><CircleIcon fontSize='inherit' sx={{color:index === currentSlider ? deepPurple["300"]:deepPurple["900"]}}></CircleIcon></IconButton>
            ))
            
            }</Box>

          <IconButton onClick={()=>changeCard(1)} size='large'  ><ArrowForwardIos fontSize='small'></ArrowForwardIos></IconButton>
        </Box>
        }
    </Box>
    )
}

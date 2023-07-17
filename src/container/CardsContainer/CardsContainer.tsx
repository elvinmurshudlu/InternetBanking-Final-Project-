import { Box, IconButton ,Typography,Skeleton} from '@mui/material'
import Card from '../../components/Card/Card'
import { ICard } from '../../Models/Card'

import CircleIcon from '@mui/icons-material/Circle';

import {ArrowBackIosNew,ArrowForwardIos} from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors'
import { Button } from '@mui/material'
import {Link} from "react-router-dom"
import { ROUTES } from '../../constants/routePath'
import { useGetUserCardsQuery } from '../../features/cardDetails';
import {dictionary} from "../../Language/lang";
import {useContext} from "react";
import {LanguageApi} from "../../contextApi/LanguageContext";


export default function CardsContainer({arrowControl=true,currentSlider,setCurrentSlider,router=false,isLoading,cards}:{arrowControl?:boolean,currentSlider:number,setCurrentSlider:any,router?:boolean,isLoading?:boolean,cards:ICard[]}) {

    const lang = useContext(LanguageApi)

    const {isFetching} = useGetUserCardsQuery("")
  

  function changeCard(val:number){
      let newVal = currentSlider + val
      if(newVal>=cards.length) newVal = 0
      if(newVal<0) newVal = cards.length-1

      setCurrentSlider(newVal)
  }


  if(isLoading ){
    return (
      <>
      <Skeleton variant="text" height={30}></Skeleton>
      <Skeleton variant='rectangular' height={250}></Skeleton>
      </>
    )
  }


  return (

    <Box sx={{width:"100%"}}>
      <Typography variant="h6" sx={{display:"flex",justifyContent:"space-between"}}>{dictionary["My Cards"][lang.language]} {router && <Button component={Link} to={ROUTES.ACCOUNT} >{dictionary["See details"][lang.language]}</Button>} </Typography>
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
                        transform: `translateX(${(index - currentSlider <0 ? cards.length+index-currentSlider : index - currentSlider )*105}%)`,
                        // transform: `translateX(${((index - currentSlider + cards.length)%cards.length  )*105}%)`,
                        transition:"0.5s ease-in-out",
                        zIndex:index === currentSlider ? 0 :3,
                        

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

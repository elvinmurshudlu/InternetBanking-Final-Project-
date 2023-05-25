import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React ,{useState}from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'
import { RootState } from '../../store/store'
import { FetchData } from '../../services/UserInformations'

export default function QuickTransfer() {
    const cards = useSelector((state:RootState)=>state.userCards.cards)
    const [currentCard,setCurrentCard] = useState(0)

    const [amount,setAmount] = useState<string>("")

    const [targeCard,setTargetCard] = useState<string>("")



      function handleChange(e:any){
        setCurrentCard(e.target.value)

        



      }

      async function sendMoney(e:any){
        e.preventDefault()
          await FetchData.quickTransfer(cards[currentCard].cardNumber,targeCard,amount)
          
      }


  return (
    <Box sx={{width:"100%",padding:"15px",backgroundColor:`rgba(81,45,168,0.6)`,borderRadius:"15px",display:"flex",flexDirection:"column",rowGap:"15px"}}>
                  <Typography  variant="h5" gutterBottom>My Wallet</Typography>
                  <Box sx={{width:"100%",height:"190px"}}>
                    {cards.length > 0 && <Card cardInformation={cards[currentCard]} color="#4527A0"></Card>}
                  </Box>
                  <Typography variant="h6" gutterBottom>Quick Transfer</Typography>

                  <Box component="form">
                    <FormControl fullWidth sx={{marginBottom:"10px"}}>
                    <InputLabel id="cards-title">Select your card</InputLabel>
                            <Select
                            labelId="cards-title"
                            label="Select your card"

                            onChange={(e)=>handleChange(e)}
                            >
                            
                            {
                              cards.length >0 && cards.map((card,index)=>(
                              
                                <MenuItem value={index}> {card.cardNumber}</MenuItem>
                              ))
                            }


                            </Select>
                      </FormControl>
                      <FormControl fullWidth sx={{marginBottom:"10px"}}>
                        <TextField  onChange={(e)=>setTargetCard(e.target.value)} label="Card Number">

                        </TextField>
                      </FormControl>
                      
                      <FormControl fullWidth sx={{marginBottom:"25px"}}>
                        <TextField  onChange={(e)=>setAmount(e.target.value)} label="Amount">

                        </TextField>
                      </FormControl>
                      <Button onClick={(e)=>sendMoney(e)} fullWidth size="large" variant="contained" type="submit">Send</Button>
                  </Box>

                </Box>
  )
}

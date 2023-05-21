import { Box, ThemeProvider, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import React from 'react'
import { cardTheme } from '../../assets/Themes/CardTheme'
import { ICardProps } from '../../Models/Card'

export default function Card({cardInformation,selected}:ICardProps) {
  return (
            <ThemeProvider theme={cardTheme}>

            <Box component="div" sx={{
              width:"300px",
              height:"100%",
              backgroundColor:`rgba(81,45,168,0.3)`,
              // background:"transparent",
              borderRadius:"15px",
              padding:"20px",
              display:"flex",
              flexDirection:"column",
              justifyContent:"space-between",
              cursor:"pointer",
              border:selected ? `2px solid ${deepPurple['900']}` : 'none'
              
          
            }}>
            
                  <Box sx={{width:"100%",position:"relative"}}>
                    
                    <Typography variant='subtitle1'  sx={{padding:"0"}}>Card balance</Typography>
                    <Typography variant='h6'>{cardInformation.amount}</Typography>

                    <Box component="span" sx={{
                    width:"40px",
                    height:"40px",
                    borderRadius:"100%",
                    backgroundColor:"rgba(255,255,255,0.3)",
                    position:"absolute",
                    top:"0",
                      right:"0",
                      

                  }}></Box>

                <Box component="span" sx={{
                                    width:"40px",
                                    height:"40px",
                                    borderRadius:"100%",
                                    backgroundColor:"rgba(255,255,255,0.3)",
                                    position:"absolute",
                                    top:"0",
                                    right:"25px"

                                  }}></Box>

                  </Box>

                  <Box sx={{width:"100%",display:"flex",justifyContent:"space-between"}}>

                      <Box>
                          <Typography variant='card-header'>Valid</Typography>
                          <Typography>{cardInformation.expireDate}</Typography>
                      </Box>
                      <Box sx={{display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
                          <Typography variant='card-header'>Card Holder</Typography>
                          <Typography>{cardInformation.cardHolder}</Typography>
                      </Box>
                      

                  </Box>



                  
            
            </Box>

            </ThemeProvider>
    )
}

import { Box, ThemeProvider, Typography } from "@mui/material"
import {amount} from "../../utils/functions"
import { ICardProps } from "../../Models/Card"
import {cardNumber} from "../../utils/functions"
import {LanguageApi} from "../../contextApi/LanguageContext";
import {useContext} from "react";

import {dictionary} from "../../Language/lang";
import {palette,ThemeApi} from "../../contextApi/ThemeContext"


export default function Card({ cardInformation, selected, color }: ICardProps) {
  const mode = useContext(ThemeApi)

    const lang = useContext(LanguageApi)



  return (
    // <ThemeProvider theme={cardTheme}>
      <Box
        component="div"
        sx={{
          minWidth: "300px",
          maxWidth:"360px",
          transition:"0.1s",
          height: "100%",
          background: !cardInformation.isAvailable ? palette.blockedCard[mode.mode] :  selected ? palette.selectedCard[mode.mode] : palette.default[mode.mode],
          borderRadius: "15px",
          padding: "10px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
          color:selected ? "white" :"black",
        }}
      >
        <Box sx={{ width: "100%", position: "relative",display:"flex",justifyContent:"space-between" }}>
          <Box >
            <Typography variant="subtitle2" sx={{ padding: "0",fontSize:'12px',fontWeight:"100" }}>
                {dictionary["Balance"][lang.language]}
            </Typography>
            <Typography variant="h6" sx={{fontSize:"20px"}}>{amount(cardInformation.amount,cardInformation.currency,true)}</Typography>
          </Box>

          

          <img src="/icons/Chip_Card.svg" alt="" />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
          >
            <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography sx={{fontSize:"12px",fontWeight:"100",letterSpacing:"1px"}} >Card Holder</Typography>
                <Typography sx={{fontSize:"12px",fontWeight:"100"}}>{cardInformation.cardHolder}</Typography>
              </Box>
          <Box>
            <Typography sx={{fontSize:"12px",fontWeight:"100",letterSpacing:"1px"}} >Valid</Typography>
            <Typography sx={{fontSize:"12px",fontWeight:"100"}}>{cardInformation.expireDate}</Typography>
          </Box>
          
        </Box>

        <Box sx={{position:"relative"}}>
             <Typography variant="h6" sx={{fontSize:"20px",fontWeight:"400"}}>{cardNumber(cardInformation.cardNumber)}</Typography> 

              <Box
            component="span"
            sx={{
              width: "20px",
              height: "20px",
              borderRadius: "100%",
              backgroundColor: selected ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
              position: "absolute",
              top: "5px",
              right: "0",
            }}
          ></Box>

          <Box
            component="span"
            sx={{
              width: "20px",
              height: "20px",
              borderRadius: "100%",
              backgroundColor: selected ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
              position: "absolute",
              top: "5px",
              right: "12px",
            }}
          ></Box>   
        </Box>
      </Box>
    // </ThemeProvider>
  )
}





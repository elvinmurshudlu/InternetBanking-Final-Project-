import { Box, Typography } from '@mui/material'
import {amount} from "../../utils/functions"
import {dictionary} from "../../Language/lang";
import {useContext} from "react";
import {LanguageApi} from "../../contextApi/LanguageContext";
import {palette,ThemeApi} from "../../contextApi/ThemeContext"


export default function Chip({image,header,title,currency}:{image:string,header:string,title:string,currency:string}) {
const mode = useContext(ThemeApi)

    const language = useContext(LanguageApi)
  return (
    <Box sx={{display:"flex",gap:"15px",alignItems:"center",padding:" 20px 35px",borderRadius:"15px",backgroundColor:palette.componentsBackground[mode.mode]}}>
                <Box>
                    <img src={image} alt="" />
                </Box>
                <Box>
                    <Typography variant='subtitle2' sx={{fontWeight:"300",color:palette.textColor[mode.mode]}}>{dictionary[header][language.language]}</Typography>
                    <Typography sx={{color:palette.textColor[mode.mode]}} variant='h6'>{amount(title,currency,true)}</Typography>
                </Box>
            </Box>
  )
}

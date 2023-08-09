import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import { useContext } from 'react'
import { LanguageApi } from '../../contextApi/LanguageContext'
import { dictionary } from '../../Language/lang'
import {palette,ThemeApi} from "../../contextApi/ThemeContext"



export default function Section({header,children,height}:{header:string,children:any,height?:string}) {

  const language = useContext(LanguageApi)  

  const mode = useContext(ThemeApi)

  return (
    <Box sx={{height:"100%",width:"100%"}}>
        <Typography sx={{color:palette.textColor[mode.mode]}} gutterBottom variant='h6'>
                {/* {header} */}
                {dictionary[header] ? dictionary[header][language.language] : header}
        </Typography>
        {/* <Box sx={{backgroundColor:"#FFF",borderRadius:"20px",height:height ? height :""}}> */}
        {children}
        {/* </Box> */}

    </Box>
  )
}

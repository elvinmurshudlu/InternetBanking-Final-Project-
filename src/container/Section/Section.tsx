import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import { useContext } from 'react'
import { LanguageApi } from '../../contextApi/LanguageContext'
import { dictionary } from '../../Language/lang'

export default function Section({header,children,height}:{header:string,children:any,height?:string}) {

  const language = useContext(LanguageApi)  


  return (
    <Box sx={{height:"100%",width:"100%"}}>
        <Typography gutterBottom variant='h6'>
                {/* {header} */}
                {dictionary[header] ? dictionary[header][language.language] : header}
        </Typography>
        {/* <Box sx={{backgroundColor:"#FFF",borderRadius:"20px",height:height ? height :""}}> */}
        {children}
        {/* </Box> */}

    </Box>
  )
}

import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'

export default function Section({header,children,height}:{header:string,children:any,height?:string}) {
  return (
    <Box sx={{height:"100%",width:"100%"}}>
        <Typography gutterBottom variant='h6'>
                {header}
        </Typography>
        {/* <Box sx={{backgroundColor:"#FFF",borderRadius:"20px",height:height ? height :""}}> */}
        {children}
        {/* </Box> */}

    </Box>
  )
}

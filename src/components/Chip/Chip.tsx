import { Box, Typography } from '@mui/material'
import {amount} from "../../utils/functions"

export default function Chip({image,header,title,currency}:{image:string,header:string,title:string,currency:string}) {
  return (
    <Box sx={{display:"flex",gap:"15px",alignItems:"center",padding:" 20px 35px",borderRadius:"15px",backgroundColor:"#FFFF"}}>
                <Box>
                    <img src={image} alt="" />
                </Box>
                <Box>
                    <Typography variant='subtitle2' sx={{fontWeight:"300"}}>{header}</Typography>
                    <Typography variant='h6'>{amount(title,currency,true)}</Typography>
                </Box>
            </Box>
  )
}

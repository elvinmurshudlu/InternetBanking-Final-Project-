import { Box, Typography } from "@mui/material";
import { ITransactions } from "../../Models/Transactions";

export default function NotificationItem({content}:{content:ITransactions}) {
  return (
        <Box sx={{width:'100%',padding:'10px 5px',color:"white",borderBottom:"1px solid white"}}>
            <Box sx={{width:"100%",display:'flex',justifyContent:"space-between"}}>
                <Typography variant="subtitle2">{content.type}</Typography>
                <Typography variant="subtitle1" sx={{color:+content.amount>0 ? "white":"red"}}>{content.amount+content.currency}</Typography>
            </Box>

        </Box>

    )
}

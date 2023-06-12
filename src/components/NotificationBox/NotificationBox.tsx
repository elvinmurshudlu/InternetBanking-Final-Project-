import { Box } from "@mui/joy";
import { style } from "./style";
import { Typography ,Button} from "@mui/material";
import NotificationItem from "../NotificationItem/NotificationItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function NotificationBox({open}:{open:boolean}) {


  const notifications = (useSelector((state:RootState)=> state.userTransactions.transactions)).filter((item)=>item.notification == true).reverse()

  return (
        <Box sx={{...style,height:open? "280px":"0"}}>

            <Box sx={{height:"40px"}}>
              
          <Typography sx={{color:"white",fontSize:"16px",paddingTop:"5px"}} variant="h6" textAlign="center">Notifications</Typography>
              </Box>   

              <Box sx={{height:"calc(100% - 80px)",overflow:"scroll",padding:"0 8px"}}>

                  {notifications.map((notification)=>(
                    <NotificationItem content={notification}></NotificationItem>
                  ))}
                
              </Box>         
              <Box sx={{height:"40px",textAlign:"end",padding:"0 10px"}}>

              <Button
                  size="small"
                  variant="contained"
                  type="button"
                  sx={{width:"16px",fontSize:"10px",letterSpacing:"1px"}}
        >
          Seen
        </Button>

              </Box>         
        </Box>
    )
}

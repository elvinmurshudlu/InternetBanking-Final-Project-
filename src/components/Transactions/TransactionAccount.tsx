import {
    Chip,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material"
  import getSymbolFromCurrency from "currency-symbol-map"
  import { ITransactions } from "../../Models/Transactions"
  import {amount} from "../../utils/functions"
  
  export default function TransactionAccount({
    transaction,
  }: {
    transaction: ITransactions
  }) {
    function convertTime(time: string) {
      let date = new Date(time)
  
      return `${date.getHours()}:${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      }    ${date.getFullYear()}/${
        date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
      }/${date.getDate()}`
    }
  
    function cardContent(cardNumber: string) {
      return ` ${cardNumber.toString().slice(0, 4)} **** **** ${cardNumber.toString().slice(12, 16)}`
    }
  
  
  
    
  
    return (
      <ListItem sx={{ paddingTop: 1, paddingBottom: 1 }}>
        <ListItemButton
          sx={{ height: 70, color: "#505887", display: "flex", flexWrap: "wrap" }}
        >
          <Grid container sx={{justifyContent:"space-between"}}>
            <Grid item xs={6} md={2}>
              <ListItemAvatar>

              </ListItemAvatar>
              <ListItemText>
                {transaction.connectedUser}
                <ListItemText  primaryTypographyProps={{ fontSize: "11px" }}>
                {convertTime(transaction.createdAt)}
  
                </ListItemText>
              </ListItemText>
            </Grid>
            {/*  */}
  
           
            {/*  */}
            <Grid item xs={1.5} sx={{display:{xs:"none",md:"block"}}}>
              <ListItemText primaryTypographyProps={{ fontSize: "14px" }}>
                {transaction.type}
              </ListItemText>
            </Grid>
            {/*  */}
  
            <Grid item xs={2} sx={{display:{xs:"none",md:"block"}}}>
              <ListItemText primaryTypographyProps={{ fontSize: "14px" }}>
                {cardContent(transaction.connectedCard)}
              </ListItemText>
            </Grid>
            {/*  */}
           
            {/*  */}
  
            
  
            <Grid item xs={6} md={2} sx={{ textAlign: {xs:"end",md:"start"} }}>
              <ListItemText sx={{color:+transaction.amount<0 ? "#FE5C73" : "#16DBAA"}}>
                {amount(transaction.amount, transaction.currency)}
              </ListItemText>
            </Grid>
  
  
            {/*  */}
             
  
          </Grid>
        </ListItemButton>
      </ListItem>
    )
  }
  
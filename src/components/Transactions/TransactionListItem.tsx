import { ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import getSymbolFromCurrency from 'currency-symbol-map'
import { ITransactions } from '../../Models/Transactions'
import { current } from '@reduxjs/toolkit'

export default function TransactionListItem({transaction}:{transaction:ITransactions}) {

    function convertTime(time:string){
        let date = new Date(time)
    
        return `${date.getHours()}:${date.getMinutes() <10 ? "0"+ date.getMinutes():date.getMinutes()}    ${date.getFullYear()}/${date.getMonth()<10 ? "0" + date.getMonth() : date.getMonth()}/${date.getDate()}`
      }

    function cardContent(cardNumber:string){

        return `XXXX XXXX XXXX ${cardNumber.toString().slice(12,16)}`

    }

    function amount(amount:string, currency:string){


      let result = ""
      if(+amount <0){
        result +="-"
      }
      
      result += getSymbolFromCurrency(currency) + (amount >"0" ? + amount : (-amount)).toLocaleString()
  
      return result
    }

  return (
    <ListItem sx={{paddingTop: 1, paddingBottom: 1}}>
                  
                  <ListItemButton sx={{height:75,color:"white",display:"flex",flexWrap:"wrap"}} >
                    <ListItemAvatar>

                    </ListItemAvatar>
                    <ListItemText>{transaction.type}
                            <ListItemText primaryTypographyProps={{fontSize: '11px'}}>{convertTime(transaction.createdAt)}</ListItemText>

                    </ListItemText>
                      
                      <ListItemText primaryTypographyProps={{fontSize:"14px"}}>{cardContent(transaction.connectedCard)}</ListItemText>
                      
                      <ListItemText>
                        <ListItemIcon></ListItemIcon>
                        {transaction.amount <"0" ? "Outcome" : "Income"}
                      </ListItemText>
                      
                      <ListItemText  >{amount(transaction.amount,transaction.currency)}</ListItemText>
                      
                      
                  </ListItemButton>
                </ListItem>
  )
}

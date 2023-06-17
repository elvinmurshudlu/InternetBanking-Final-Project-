import { List,ListItem, ListItemButton,ListItemIcon ,Typography,TextField } from '@mui/material'
import { ICard } from '../../Models/Card'
import DialogModal from '../DialogModal/DialogModal'
import { useState } from 'react'
import { Box } from '@mui/material'
import { FetchData } from '../../services/UserInformations'
import { useAppDispatch } from '../../store/store'
import { fetchCards } from '../../features/cardsSlice'


export default function Settings({currentCard}:{currentCard:ICard}) {

    const [open,setOpen] = useState(false)

    const [password,setPassword] = useState("")

    const [error,setError] = useState(false)

   const dispatch = useAppDispatch()

   async function blockUnBlock(){
        if(password.trim()===""){
            setError(true)
            return false
        }else{
            try{
                await FetchData.cardAvailability(currentCard.cardNumber,!currentCard.isAvailable,password)
                dispatch(fetchCards())
            }catch{
                setPassword("")
                setError(true)
                return false

            }

        }
        setError(false)
        setPassword("")
        return true

    }


  return (
    <List>
                    <ListItem>
                      <ListItemButton onClick={()=>setOpen(true)}>
                        <ListItemIcon sx={{marginRight:"10px"}}><img src="./icons/BlockCard.svg" alt="" /></ListItemIcon>
                        <Typography sx={{color:"#505887",fontWeight:"500"}} variant="h6">{currentCard.isAvailable ? "Block" :"UnBlock"}
                        <Typography sx={{color:"#718EBF",fontWeight:"300"}} variant="subtitle2">Instantly block your card</Typography>
                        </Typography>
                       
                      </ListItemButton>
                    </ListItem>
                    <DialogModal content={currentCard.isAvailable ? "Write your password and agree to block your card" : "Write your password and agree to unblock your card"} open={open} setOpen={setOpen} onSubscribe={blockUnBlock}>
                              <Box>
                                <TextField error={error} value={password} onChange={(e:any)=>setPassword(e.target.value)} fullWidth type='password' label="Your password"></TextField>
                                </Box> 
                    </DialogModal>
                </List>
  )
}

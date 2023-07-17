import { List,ListItem, ListItemButton,ListItemIcon ,Typography,TextField } from '@mui/material'
import { ICard } from '../../Models/Card'
import DialogModal from '../DialogModal/DialogModal'
import {useContext, useState} from 'react'
import { Box } from '@mui/material'
import { FetchData } from '../../services/UserInformations'
import { useAppDispatch } from '../../store/store'
import { fetchCards } from '../../features/cardsSlice'
import { useGetUserCardsQuery } from '../../features/cardDetails'
import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";

export default function Settings({currentCard}:{currentCard:ICard}) {
    const language = useContext(LanguageApi)

    const {refetch} = useGetUserCardsQuery("")

    const [open,setOpen] = useState(false)

    const [password,setPassword] = useState("")

    const [error,setError] = useState(false)

  //  const dispatch = useAppDispatch()

   async function blockUnBlock(){
        if(password.trim()===""){
            setError(true)
            return false
        }else{
            try{
                await FetchData.cardAvailability(currentCard.cardNumber,!currentCard.isAvailable,password)
                // dispatch(fetchCards())
                refetch()
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
                        <Typography sx={{color:"#505887",fontWeight:"500"}} variant="h6">{currentCard.isAvailable ? dictionary["Block"][language.language] :dictionary["UnBlock"][language.language]}
                        <Typography sx={{color:"#718EBF",fontWeight:"300"}} variant="subtitle2">{dictionary["Instantly block your card"][language.language]}</Typography>
                        </Typography>
                       
                      </ListItemButton>
                    </ListItem>
                    <DialogModal content={dictionary["Confirm block"][language.language]} open={open} setOpen={setOpen} onSubscribe={blockUnBlock}>
                              <Box>
                                <TextField error={error} value={password} onChange={(e:any)=>setPassword(e.target.value)} fullWidth type='password' label={dictionary["Type password"][language.language]}></TextField>
                                </Box> 
                    </DialogModal>
                </List>
  )
}

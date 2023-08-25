import { Grid,FormControl ,TextField, Button} from '@mui/material'
import {useContext, useState} from 'react'
import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";
import {ThemeApi} from "../../contextApi/ThemeContext";

interface IChangePassword{
    password?:string
    newPassword?:string
    confirmPassword?:string


}

export default function ChangePassword() {
    const mode = useContext(ThemeApi)
    const language = useContext(LanguageApi)
    const [credentials,setCredentials] = useState<IChangePassword>({})

    function fillCredentials(e:any){
        const target = e.target.id
        const value = e.target.value
        setCredentials(credentials=>({...credentials,[target]:value}))

    }

    function changePassword(){

    }

  return (
        <Grid container className={mode.mode} spacing={2} >
            <Grid item xs={12} >
                <FormControl >
                    <TextField
                    value={credentials.password}
                    label={dictionary["Current password"][language.language]}
                    size='small'
                    id='password'
                    onChange={fillCredentials}
                    type='password'
                    >

                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} >
                <FormControl >
                    <TextField
                    value={credentials.newPassword}
                    type='password'

                    label={dictionary["New password"][language.language]}
                    size='small'
                    id='newPassword'
                    onChange={fillCredentials}
                    >

                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} >
                <FormControl >
                    <TextField
                    value={credentials.confirmPassword}
                    type='password'
                    label={dictionary["Confirm password"][language.language]}
                    size='small'
                    id='confirmPassword'
                    onChange={fillCredentials}
                    >

                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} >
                <Button variant='outlined'>{dictionary["Change password"][language.language]}</Button>
            </Grid>

        </Grid>
    )
}

import { CheckBox } from "@mui/icons-material";
import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Snackbar, SnackbarOrigin, TextField } from "@mui/material";
import {useState} from "react"
import { Register } from "../../Models/LoginRegister";
import { validate } from "../../validation/Validation";
import { Authendication } from "../../services/Auth";

export interface State extends SnackbarOrigin {
  open: boolean;
}


export default function RegisterComponent() {

  let [credentials,setCredentials] = useState<Register>({"name":"","surname":"","email":"","passwordRegister":"","confirmPassword":""})

  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;


  function handleClose(isOpen : boolean){
    setState(prevVal => ({
      ...prevVal,["open"]:isOpen
    }))
  }


  let [credentialsError,setCredentialsError] = useState({
    "name":false,
    "surname":false,
    "email":false,
    "passwordRegister":false,
    "confirmPassword":false
    
  })

  function freeFromErrors(){
    let result = true
    for(let a in credentials){
      let key = a as keyof typeof credentials

      if(key != "confirmPassword"){
        if(!validate[key](credentials[key])){
          result = false
        }
  
        setCredentialsError(prevVal => ({...prevVal,[key]:!validate[key](credentials[key])}))
      }else{
        if(!validate[key](credentials[key],credentials["passwordRegister"])){
          result = false
        }
        setCredentialsError(prevVal => ({...prevVal,[key]:!validate[key](credentials[key],credentials["passwordRegister"])}))

      }
    }

    return result
  }


  function fillForm(e:any){
    let value = e.target.value
    let target = e.target.id

    setCredentials(prevVal => ({...prevVal,[target]:value}))

  }






  async function submit(e:any){
    e.preventDefault()
    
    if(freeFromErrors()){      
      try{
          let data =  await Authendication.register(credentials)

          handleClose(true)

          console.log(data);

      }catch(err:any){

        console.log(err,"Error oldu")
        
        setCredentialsError(prevVal => ({...prevVal,["email"]:true}))

      }

    }

  }



  return (
    <Box component="form" sx={{
      display: "flex",
      flexDirection: "column",
      width: "80%",
      alignItems: "center",
      rowGap: "10px",
    }}>

      <FormControl fullWidth>
        <TextField error={credentialsError.name} onChange={(e:any)=>fillForm(e)} required size="small" label="Ad" id="name"></TextField>
        <FormHelperText error>{credentialsError.name && "Ad qeyd edin"}</FormHelperText>
      </FormControl>
      
      <FormControl fullWidth>
        <TextField error={credentialsError.surname} required onChange={(e:any)=>fillForm(e)} size="small" label="Soyad" id="surname"></TextField>
        {/* <FormHelperText error>Ad qeyd edin</FormHelperText> */}
        <FormHelperText error>{credentialsError.surname && "Soyad qeyd edin"}</FormHelperText>

      </FormControl >
      <FormControl fullWidth>
        <TextField error={credentialsError.email} required size="small" label="Email" onChange={(e:any)=>fillForm(e)} id="email"></TextField>
        {/* <FormHelperText error>Ad qeyd edin</FormHelperText> */}
        <FormHelperText error>{credentialsError.email && "Email qeyd edin"}</FormHelperText>

      </FormControl>
      <FormControl fullWidth>
        <TextField type="password" error={credentialsError.passwordRegister} required size="small" label="Şifrə" onChange={(e:any)=>fillForm(e)} id="passwordRegister"></TextField>
        {/* <FormHelperText error>Ad qeyd edin</FormHelperText> */}
        <FormHelperText error>{credentialsError.passwordRegister && "Sifre qeyd edin"}</FormHelperText>

      </FormControl>
      <FormControl fullWidth>
        <TextField type="password" error={credentialsError.confirmPassword} required size="small" label="Təkrar şifrə" onChange={(e:any)=>fillForm(e)} id="confirmPassword"></TextField>
        {/* <FormHelperText error>Ad qeyd edin</FormHelperText> */}
        <FormHelperText error>{credentialsError.confirmPassword && "Tekrar sifre qeyd edin"}</FormHelperText>

      </FormControl>

      {/* <FormControl fullWidth>
          <FormControlLabel  label="test" control={<Checkbox required size="small"></Checkbox>}></FormControlLabel>
      </FormControl> */}

      <Button onClick={(e:any)=>submit(e)} size="large" variant="contained" color="secondary" fullWidth type="submit">Register</Button>
    

    <Snackbar 
    anchorOrigin={{vertical,horizontal}}
    autoHideDuration={3000}
    onClose={()=>handleClose(false)}
    open={open}>
        <Alert severity="success">Register succesfully</Alert>


    </Snackbar>
    
    </Box>
  )
}

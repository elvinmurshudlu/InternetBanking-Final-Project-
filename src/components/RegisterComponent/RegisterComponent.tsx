import { CheckBox } from "@mui/icons-material";
import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Snackbar, SnackbarOrigin, TextField } from "@mui/material";
import {useContext, useState} from "react"
import { Register, State } from "../../Models/LoginRegister";
import { validate } from "../../validation/Validation";
import { Authendication } from "../../services/Auth";
import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";
import {Link, useNavigate} from "react-router-dom";


export default function RegisterComponent() {
  const language = useContext(LanguageApi)

  const navigate = useNavigate()

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
          await Authendication.register(credentials)

          handleClose(true)


      }catch(err:any){

        
        setCredentialsError(prevVal => ({...prevVal,["email"]:true}))

      }

    }

  }



  return (
    <Box className={'form_login dark'} component="form" sx={{
      display: "flex",
      flexDirection: "column",
      width: "90%",
      alignItems: "center",
      rowGap: "10px",
    }}>

      <FormControl fullWidth>
        <TextField error={credentialsError.name} onChange={(e:any)=>fillForm(e)} required size="small" label={dictionary["Name"][language.language]} id="name"></TextField>
        <FormHelperText error>{credentialsError.name && dictionary["Type name"][language.language]}</FormHelperText>
      </FormControl>
      
      <FormControl fullWidth>
        <TextField error={credentialsError.surname} required onChange={(e:any)=>fillForm(e)} size="small" label={dictionary["Surname"][language.language]} id="surname"></TextField>
        {/* <FormHelperText error>Ad qeyd edin</FormHelperText> */}
        <FormHelperText error>{credentialsError.surname && dictionary["Type surname"][language.language]}</FormHelperText>

      </FormControl >
      <FormControl fullWidth>
        <TextField error={credentialsError.email} required size="small" label="Email" onChange={(e:any)=>fillForm(e)} id="email"></TextField>
        {/* <FormHelperText error>Ad qeyd edin</FormHelperText> */}
        <FormHelperText error>{credentialsError.email && dictionary["Type email"][language.language]}</FormHelperText>

      </FormControl>
      <FormControl fullWidth>
        <TextField type="password" error={credentialsError.passwordRegister} required size="small" label={dictionary["Password"][language.language]} onChange={(e:any)=>fillForm(e)} id="passwordRegister"></TextField>
        {/* <FormHelperText error>Ad qeyd edin</FormHelperText> */}
        <FormHelperText error>{credentialsError.passwordRegister && dictionary["Type password"][language.language]}</FormHelperText>

      </FormControl>
      <FormControl fullWidth>
        <TextField type="password" error={credentialsError.confirmPassword} required size="small" label={dictionary["Confirm password"][language.language]} onChange={(e:any)=>fillForm(e)} id="confirmPassword"></TextField>
        {/* <FormHelperText error>Ad qeyd edin</FormHelperText> */}
        <FormHelperText error>{credentialsError.confirmPassword && dictionary["Type confirm password"][language.language]}</FormHelperText>

      </FormControl>

      {/* <FormControl fullWidth>
          <FormControlLabel  label="test" control={<Checkbox required size="small"></Checkbox>}></FormControlLabel>
      </FormControl> */}

      <Button onClick={(e:any)=>submit(e)} size="large" variant="contained" color="error" fullWidth type="submit">{dictionary["Register"][language.language]}</Button>

      <hr/>

      {/*<Button onClick={()=>navigate("/login")}>Hesabınız var? Daxil olun</Button>*/}
      <Link to={"/login"} ><span style={{color:'white'}}>{dictionary["Have an account"][language.language]}</span></Link>

    <Snackbar 
        anchorOrigin={{vertical,horizontal}}
        autoHideDuration={3000}
        onClose={()=>handleClose(false)}
        open={open}>
            <Alert severity="success">{dictionary["Register succesfully"][language.language]}</Alert>


    </Snackbar>
    
    </Box>
  )
}

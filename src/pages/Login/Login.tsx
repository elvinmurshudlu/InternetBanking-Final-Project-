import { Box, Button, FormControl,   FormHelperText, Grid,  TextField } from "@mui/material";
import { useState ,useEffect} from "react";
import { Authendication } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [userInformation,setUserInformation] = useState({"email":"","password":""})

  let [isLogged,setIsLogged] = useState(true)  

  let navigate = useNavigate()

  function userCredentials(name:any,event:any){

    let value = event.target.value

    setUserInformation(prevInformation => (
      {
      ...prevInformation,[name]:value
    }
    ))

  }
  

 async function submit(e:Event){
    e.preventDefault()

    try{
      let response =  await Authendication.login(userInformation.email,userInformation.password)
      document.cookie = `TOKEN=${response.data}`
      navigate("/")

    }catch(err:any){
        console.log(err.response.status)
    }  

  }

  async function isAuthendicated(){
    try{

      await Authendication.isLogged()

      setIsLogged(true)

      navigate("/")

    }catch(err:any){        
        setIsLogged(false)
    }
  }


  useEffect(()=>{
      isAuthendicated()
  },[])
  




  return  (
    <>
    {isLogged || <Grid container sx={{width:"100%",height:"100vh"}}>
      <Grid item sm={0} md={9} ></Grid>
      <Grid item  xs={12} md={3} sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>

        <Box component="form"  sx={{display:"flex",flexDirection:"column",width:"75%",alignItems:"center",rowGap:"5px"}}>
          <FormControl fullWidth>
            <TextField onChange={(e)=>userCredentials("email",e)} margin="normal" fullWidth  id="email" label="Email"></TextField > 
          </FormControl>
          <FormControl fullWidth>
            <TextField onChange={(e)=>userCredentials("password",e)} fullWidth type="password"  id="password" label="Password"></TextField>
            {/* <FormHelperText error>Test</FormHelperText> */}
          <FormHelperText >Test</FormHelperText>           
          </FormControl>


          <Button fullWidth size="large" onClick={(e:any)=>submit(e)} type="submit">Login</Button>

            <span>və ya</span>

        </Box>



      </Grid>

    </Grid>}

    </>
  )
}

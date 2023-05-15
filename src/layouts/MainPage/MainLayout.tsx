import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {useEffect , useState} from "react"
import { Authendication } from "../../services/Auth"
import { Box, Grid, Typography } from "@mui/material"
import Aside from "../Aside/Aside"
import { deepPurple, indigo } from "@mui/material/colors"

import animation from "../../assets/Animations/animation.module.css"
import Header from "../../components/Header/Header"

export default function MainLayout() {  

  let [isLogged,setIsLogged] = useState(false)
  let location = useLocation()

  let navigate = useNavigate()

  async function isAuthendicated(){
    try{

      await Authendication.isLogged()

      setIsLogged(true)


    }catch(err:any){    

       navigate("/login")

    }
  }

  useEffect(()=>{
      isAuthendicated()
  },[location]) 

   return  (

    <>

    {isLogged && 
    
    <Grid container sx={{width:"100%",height:"100vh",background:`linear-gradient(to right ,${deepPurple["A700"]},${deepPurple["800"]}  )`}} >

      <Grid item md={2} sx={{display:{xs:"none",lg:"flex"},justifyContent:"center"}}>

        <Aside></Aside>

      </Grid>

      <Grid item xs={12} md={10} sx={{position:"relative",overflow:"hidden"}}>


          <Box sx={{position:"absolute",zIndex:"1",width:"100%",height:"100%",padding:"15px 35px"}}>

              <Header></Header>

              <Outlet></Outlet> 


          </Box>



          {/* //! animation circles */}
        <div style={{background:`linear-gradient( ${deepPurple["A700"]} , ${deepPurple["600"]} )`}} className={[animation.box,animation.one].join(" ")}></div>
        <div style={{background:`linear-gradient(to right , ${deepPurple["A700"]} , ${deepPurple["800"]} )`}} className={[animation.box,animation.two].join(" ")}></div>
        <div style={{background:`linear-gradient(to right , ${deepPurple["A700"]} , ${deepPurple["800"]} )`}} className={[animation.box,animation.three].join(" ")}></div>
      
      </Grid>

    </Grid>
    
    }
    </>
  )
}

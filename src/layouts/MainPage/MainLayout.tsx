import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {useEffect , useState} from "react"
import { Authendication } from "../../services/Auth"
import { Box, Grid } from "@mui/material"
import Aside from "../Aside/Aside"
import { deepPurple } from "@mui/material/colors"

import animation from "../../assets/Animations/animation.module.css"
import Header from "../../components/Header/Header"
import { useDispatch } from "react-redux"
import { fetchCards } from "../../features/cardsSlice"
import { useAppDispatch } from "../../store/store"
import { server, serverIp, serverPort } from "../../services/config"
import { setTransactions } from "../../features/transactionSlice"

export default function MainLayout() {  

  let [isLogged,setIsLogged] = useState(false)

  let dispatch = useAppDispatch()

  let location = useLocation()

  let navigate = useNavigate()

  async function isAuthendicated(){
    try{
      await Authendication.isLogged()
      setIsLogged(true)
      return true

    }catch(err:any){    

       navigate("/login")
       return false
    }
  }
  const [socket, setSocket] = useState<any>(null);

  useEffect(()=>{
      isAuthendicated() 
      if(isLogged){
        dispatch(fetchCards())


        let cookie = document.cookie.split("=")[1]  
        const newSocket = new WebSocket(`ws://${serverIp+serverPort}?sessionId=${cookie}`);
  
        newSocket.addEventListener('open', () => {
          console.log('WebSocket connected');
        });
  
        newSocket.addEventListener('message', (event) => {
        
        const data = JSON.parse(event.data)
        if(data.type ==="transaction_created"){
          
        }
        else if(data.type == "transaction_updated"){
          dispatch(setTransactions(data.data))

        }
        
        else{
          dispatch(setTransactions(data))
        }
        // console.log(JSON.stringify(data[0]))
      });
  
      newSocket.addEventListener('close', () => {
        console.log('WebSocket disconnected');
      });
  
      setSocket(newSocket);
  
      return () => {
        newSocket.close();
      };




      }
      

     

  },[location,isLogged]) 

   return  (

    <>

    {isLogged && 
    
    <Grid container sx={{width:"100%",height:"100vh",background:`linear-gradient(to right ,${deepPurple["A700"]},${deepPurple["800"]}  )`}} >

      <Grid item lg={2} sx={{display:{xs:"none",lg:"flex"},justifyContent:"center"}}>

        <Aside></Aside>

      </Grid>

      <Grid item xs={12} lg={10} sx={{position:"relative",overflow:"hidden"}}>

          <Box sx={{position:"absolute",zIndex:"1",width:"100%",height:"100%",padding:"0px 35px",overflow:"scroll",}}>

                <Box sx={{width:"100%",height:90,padding:"15px 0"}}>
                    <Header ></Header>
                </Box>

                                                     {/* ,overflow:"scroll" */}
                <Box sx={{height:'calc(100vh - 90px)'}}> 
                    <Outlet ></Outlet>
                  </Box> 
           





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

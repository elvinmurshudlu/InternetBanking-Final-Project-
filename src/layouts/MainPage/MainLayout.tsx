import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {useContext, useEffect, useState} from "react"
import { Authendication } from "../../services/Auth"
import { Box, Grid } from "@mui/material"
import Aside from "../Aside/Aside"
import { deepPurple } from "@mui/material/colors"
import {palette, ThemeApi} from "../../contextApi/ThemeContext";
import animation from "../../assets/Animations/animation.module.css"
import Header from "../../components/Header/Header"
import { useDispatch, useSelector } from "react-redux"
import { fetchCards } from "../../features/cardsSlice"
import { RootState, useAppDispatch } from "../../store/store"
import { server, serverIp, serverPort } from "../../services/config"
import { addTransaction, setTransactions } from "../../features/transactionSlice"
import { State } from "../../Models/LoginRegister"
import { Alert, Snackbar } from "@mui/material"
import { useGetUserCardsQuery } from "../../features/cardDetails"


export default function MainLayout() {
    const mode = useContext(ThemeApi)

  let [isLogged,setIsLogged] = useState(false)

  const {refetch} = useGetUserCardsQuery("")


  const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)

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


        let cookie = document.cookie.split("=")[1]  
        const newSocket = new WebSocket(`ws://${serverIp+serverPort}?sessionId=${cookie}`);
  
        newSocket.addEventListener('open', () => {
          console.log('WebSocket connected');
        });
  
        newSocket.addEventListener('message', (event) => {
        
        const data = JSON.parse(event.data)
        if(data.type ==="transaction_created"){
              dispatch(addTransaction(data.data))
              data.data.notification && handleClose(true)
          
        }
      
        
        else{
          dispatch(setTransactions(data))
        }
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

  useEffect(()=>{
    if(isLogged){
      refetch()
      // dispatch(fetchCards())
    }

  },[location,isLogged,transactions])





  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  })
  const { vertical, horizontal, open } = state

  function handleClose(isOpen: boolean) {
    setState((prevVal) => ({
      ...prevVal,
      ["open"]: isOpen,
    }))
  }




   return  (

    <>

    {isLogged && 
    
    <Grid container sx={{width:"100%",height:"100vh",background:`linear-gradient(to right ,${deepPurple["A700"]},${deepPurple["800"]}  )`}} >

      <Grid item lg={2} sx={{display:{xs:"none",lg:"flex"},justifyContent:"center"}}>

        <Aside></Aside>

      </Grid>

      <Grid item xs={12} lg={10} sx={{position:"relative",overflow:"hidden"}}>

          <Box sx={{position:"absolute",zIndex:"1",width:"100%",height:"100%",padding:"0px 0px",overflow:"scroll",}}>

                <Box sx={{width:"100%",height:90,padding:"0 15px",backgroundColor:palette.primary[mode.mode],display:"flex",alignItems:"center"}}>
                    <Header ></Header>
                </Box>

                                                     {/* ,overflow:"scroll" */}
                <Box sx={{height:'calc(100vh - 90px)',padding:"15px 35px",backgroundColor:palette.secondary[mode.mode],overflow:"scroll"}}>
                    <Outlet ></Outlet>
                  </Box> 
           





          </Box>



          {/* //! animation circles */}
        {/* <div style={{background:`linear-gradient( ${deepPurple["A700"]} , ${deepPurple["600"]} )`}} className={[animation.box,animation.one].join(" ")}></div>
        <div style={{background:`linear-gradient(to right , ${deepPurple["A700"]} , ${deepPurple["800"]} )`}} className={[animation.box,animation.two].join(" ")}></div>
        <div style={{background:`linear-gradient(to right , ${deepPurple["A700"]} , ${deepPurple["800"]} )`}} className={[animation.box,animation.three].join(" ")}></div> */}
      
      </Grid>


      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal,
        }}
        autoHideDuration={3000}
        onClose={() => handleClose(false)}
        open={open}
      >
        <Alert
          sx={{
            backgroundColor: deepPurple["900"],
          }}
          variant="filled"
          severity="success"
        >
          Money received 
        </Alert>
      </Snackbar>

    </Grid>
    
    }
    </>
  )
}

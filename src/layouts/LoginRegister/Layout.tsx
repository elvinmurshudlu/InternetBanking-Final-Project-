import { Box, Button, Grid,  Modal, Typography} from "@mui/material";
import { Authendication } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import {useEffect,useState} from "react"
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Logo from '../../assets/logo/logo-red.png'

import imageOne from "../../assets/pictures/slider/login.jpg"
import imageTwo from "../../assets/pictures/slider/login2.jpg"
import imageThree from "../../assets/pictures/slider/login3.jpg"
import imageFour from "../../assets/pictures/slider/login4.jpg"


export default function Layout(props:any) {

    let [isLogged,setIsLogged] = useState(true) 
     
    let navigate = useNavigate()

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
      

      //!For slider   

      let [currentImage,setCurrentImage] = useState(imageOne)

      useEffect(()=>{

        let images = [imageOne,imageTwo,imageThree,imageFour]
        let counter = 0

       let interval =  setInterval(()=>{
          counter++
          if(counter >= images.length) counter = 0
          setCurrentImage(images[counter])
            // console.log("a")
        },3000)

        return ()=>{
          clearInterval(interval)
        }
      },[])

     


      //! For Modal

      const [open, setOpen] = useState(false);

      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);


      const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


  return (
    <>
    {isLogged || 
    
    <Grid className={'login_layout'}  container sx={{width:"100%",height:"100vh"}}>

        <Grid item sm={0} md={9} sx={{width:"100%", maxHeight:"100%",display:{xs:"none" , md:"inline"}}}  >

          <Box component="div" sx={{width:"100%",height:"100%",overflow:"hidden"}}>
              {/*<img style={{width:"100%",height:"100%",objectFit:"cover",transition:"2s"}} src={currentImage} alt="" />*/}
              {/*<img style={{width:"100%",height:"100%",objectFit:"cover",transition:"2s"}} src={imageFour} alt="" />*/}
          </Box>

        </Grid>

        <Grid item  xs={12} md={3}  sx={{display:"flex",flexWrap:"wrap"}}>

          <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>

            <div style={{width:"80%",padding:"10px",textAlign:'center',color:'red'
            ,paddingTop:'40px',letterSpacing:"2px"}}>
                <img style={{width:"100% "}} src={Logo} alt=""/>
            </div>

          </Grid>

          <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>

              {props.children}

          </Grid>

          <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
            <Box component="div" sx={{width:"65%"}}>

            {/*<Button onClick={handleOpen}><QrCode2Icon sx={{fontSize:"60px"}}></QrCode2Icon>Login WIth QR CODE</Button>*/}
                <Modal
                  
                  open={open}
                  onClose={handleClose}
                  // aria-labelledby="keep-mounted-modal-title"
                  // aria-describedby="keep-mounted-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                      Text in a modal
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                  </Box>
                </Modal>

            </Box>
          </Grid>

        </Grid>

    </Grid>}

    </>
  )
}

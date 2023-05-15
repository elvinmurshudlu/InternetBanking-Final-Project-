import { createTheme } from "@mui/material";

export const theme  = createTheme({
    components:{
        MuiTextField:{
            styleOverrides:{
                root:{
                    
                     '& .MuiInputBase-root .Mui-focused': {
                            border:"1px solid white" ,
                        },
                        
                       "& .MuiInputBase-root":{
                        border:"1px solid white" ,
                        // height:"50px",

                           color:"white",
                           letterSpacing:"2px"  ,
                           
                           
                       } 
                }
            }
        },
        MuiIcon:{
            styleOverrides:{
                root:{
                    ".MuiIcon-root":{
                        fontSize:"80px"
                    }
                }
            }
        }
    }
})
import { indigo } from "@mui/material/colors"

export const style = {
    "&.Mui-selected":{
        backgroundColor:"white",
        color:"#2D60FF",
        "&:hover":{
            backgroundColor:"white",
            fontSize:"100px",
            color:indigo["800"]            
        
        }, 
        "& .MuiListItemIcon-root": {

            "& .MuiSvgIcon-root":{

                color: "#505887" // Change the color here
            },
      },
    }
    ,
    "&:hover":{
            backgroundColor:"white" ,
            color:indigo["800"]
    }
    ,
    "& .MuiListItemIcon-root": {

            "& .MuiSvgIcon-root":{

                color: "#505887" // Change the color here

            },
      },
    
    borderRadius:"10px",
    color: "#505887" // Change the color here

    
}





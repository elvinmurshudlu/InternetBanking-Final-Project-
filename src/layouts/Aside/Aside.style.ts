import { indigo } from "@mui/material/colors"

export const style = {
    "&.Mui-selected":{
        backgroundColor:"white",
        color:indigo["800"],
        "&:hover":{
            backgroundColor:"white",
            fontSize:"100px",
            color:indigo["800"]            
        
        }, 
        "& .MuiListItemIcon-root": {

            "& .MuiSvgIcon-root":{

                color: indigo["800"] // Change the color here
            },
      },
    }
    ,
    "&:hover":{
            backgroundColor:indigo["200"] ,
            color:indigo["800"]
    }
    ,
    "& .MuiListItemIcon-root": {

            "& .MuiSvgIcon-root":{

                color: "white" // Change the color here
            },
      },
    
    borderRadius:"10px",
    color:"white",
    
}





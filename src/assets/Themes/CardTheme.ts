import { Typography, createTheme } from "@mui/material";


declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        "card-header": true;
    }
  }


export const cardTheme = createTheme({
    components:{
        MuiTypography:{
            
            variants:[
                {
                    props:{variant:"card-header"},
                    style:{
                        fontSize:"12px",
                        color:"#B3AAE4"
                    }
                }
            ]
        }
    }
})
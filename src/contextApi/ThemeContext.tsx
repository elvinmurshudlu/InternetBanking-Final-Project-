import React, {createContext, useState} from 'react'
import { deepPurple } from '@mui/material/colors'

export const ThemeApi = createContext<ITheme>({mode:"light"})

interface ITheme {
    mode:string,
    changeTheme?:any

}
export const palette = {
    primary:{
        "dark":"#000000",
        "light":"white"
    },
    secondary:{
        "dark":"#202020",
        "light":"#F5F7FA"
    },
    border:{
        "dark":"#000000",
        "light":"#E6EFF5"
    },
    textColor:{
        "dark":"#718EBF",
        "light":"#000000"
    },
    blockedCard:{
        "dark":"#424242",
        'light':'grey'
    },
    selectedCard:{
        "dark":"linear-gradient(#000000,#010010)",
        'light':"linear-gradient(#FFAA07,#D99D2A)"
    },
    
    default:{
        "dark":"grey",
        'light':"white"
    }

    ,

    activeCardIndicator:{
        'dark':'#000000',
        "light":deepPurple['300']
    },

    nonActiveCardIndicator:{
        'dark':'grey',
        "light":deepPurple['900']
    },
    componentsBackground:{
        'light':'white',
        'dark':'#000000'
    },
    inputFields:{
        'dark':"#434343",
        'light':'white'
    },
    inputPlaceHolder:{
        'dark':'white',
        'light':'#000000'
    },
    buttonBackground:{
        'dark':'#8B0000',
        'light':'blue'
    }

} as {[key:string]:any}

export default function ThemeContext({children}:{children:React.ReactNode}) {
    const [mode,setMode] = useState<string>(()=>{
        const theme = localStorage.getItem("theme")
        if(theme){
            return theme
        }else{
            localStorage.setItem("theme","light")
            return "light"
        }

    })

    function onChangeTheme(){
        setMode(mode === "dark" ? "light" :"dark")
    }


    return (
       <ThemeApi.Provider value={{mode:mode,changeTheme:onChangeTheme}}>
           {children}
       </ThemeApi.Provider>
    )
}

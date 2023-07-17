import React, {createContext, FC, useState} from 'react'

interface ILanguage{
    language:string,
    change?:any
}

export const LanguageApi = createContext<ILanguage>({language:"AZE"})
export default function LanguageContext({children}:{children:any}) {
    const [currentLang,setCurrentLang] = useState<string>(()=>{
        const currLang = localStorage.getItem("Lang")
        if(currLang){
            return currLang
        }else{
            localStorage.setItem("Lang","AZE")
            return "AZE"
        }

    })
    const [currentLag,setCurrentang] = useState<string>(()=>{
        const currLang = localStorage.getItem("Lang")
        if(currLang){
            return currLang
        }else{
            localStorage.setItem("Lang","AZE")
            return "AZE"
        }

    })

    function changeLanguage(lang:string){
        setCurrentLang(lang)
    }

    return (
       <LanguageApi.Provider value={{language:currentLang,change:changeLanguage}}>
           {children}
       </LanguageApi.Provider>
    )
}

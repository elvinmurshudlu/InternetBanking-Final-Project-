import {useState , useEffect} from "react"

import { useNavigate} from "react-router-dom"
import { Authendication } from "../../services/Auth"


export default function Register() {

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
  
  return  (

    <>
    {isLogged || <div>Register</div>}
    </>
    
  )
}

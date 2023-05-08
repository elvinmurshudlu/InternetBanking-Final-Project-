import { useNavigate } from "react-router-dom"
import {useEffect , useState} from "react"
import { ROUTES } from "../../constants/routePath"
import { Authendication } from "../../api/Auth"

export default function MainLayout() {
  

  let [isLogged,setIsLogged] = useState(false)


  let navigate = useNavigate()


  async function isAuthendicated(){
    try{

      await Authendication.isLogged()

      setIsLogged(true)


    }catch(err:any){    

       navigate("/login")

    }
  }

  useEffect(()=>{
      isAuthendicated()
  },[])

  

   return  (


    <>
    {isLogged && <div>MainLayout</div>}
    </>
  )
}

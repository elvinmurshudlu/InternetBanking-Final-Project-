import axios from "axios";
import { server ,serverUrls} from "./config";


export class Authendication{    

    static async  login(email:string,password:string){        

            let response =  await axios.post(`${server+ serverUrls.loginRequest}`,{"email":email,"password":password},{
                
            })
            return response

         


    }

    static async isLogged(){
        let cookie = document.cookie
        return await axios(`${server+  serverUrls.isLogged}`,{
            headers:{
                "Authendication":cookie.split("=")[1],
                'Bypass-Tunnel-Reminder': 'true'
            }
        }
        
        )
    }

    static async register(information:any){
        return await axios.post(`${server+  serverUrls.registerRequest}`,information)
    }

}
import axios from "axios";
import { server ,serverPort,serverUrls} from "./config"; 
import { error } from "console";


export class Authendication{    

    static async  login(email:string,password:string){

        

            let response =  await axios.post(`${server+ serverPort+ serverUrls.loginRequest}`,{"email":email,"password":password})
         return response

         


    }

    static async isLogged(){
        let cookie = document.cookie
        return await axios(`${server+ serverPort+ serverUrls.isLogged}`,{
            headers:{
                "Authendication":cookie.split("=")[1]
            }
        }
        
        )
    }

    static async register(information:any){
        return await axios.post(`${server+ serverPort+ serverUrls.registerRequest}`,information)
    }

}
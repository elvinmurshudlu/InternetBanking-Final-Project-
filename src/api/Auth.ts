import axios from "axios";
import { server ,serverPort,serverUrls} from "./config"; 


export class Authendication{

    

    static async  login(email:string,password:string){
         let response =  await axios.post(`${server+ serverPort+ serverUrls.loginRequest}`,{"email":email,"password":password})
         return response       


    }

    static async isLogged(){
        let cookie = document.cookie

        // console.log("Cookie",cookie);

       return await axios(`${server+ serverPort+ serverUrls.isLogged}`,{
            headers:{
                "Authendication":cookie.split("=")[1]
            }
        }
        
        )

    }
}
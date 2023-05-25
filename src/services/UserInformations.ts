import axios from "axios"
import { server, serverPort, serverUrls } from "./config"

export class FetchData{

    static async getCards(){
        const cookie = document.cookie.split("=")[1]
        return await axios.get(`${server + serverPort + serverUrls.getCards}`,{
            headers:{
                Authorization: cookie
            }
        }) 
    }

    static async quickTransfer(fromCardNumber:string,toCardNumber:string,amount:string){
        const cookie = document.cookie.split("=")[1]
        return await axios.post(`${server+serverPort+serverUrls.quickTransfer}`,{fromCardNumber,toCardNumber,amount},{
            headers:{
                Authorization:cookie
            }
        })

    }
}
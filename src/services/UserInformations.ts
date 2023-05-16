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
}
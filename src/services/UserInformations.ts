import axios from "axios"
import { server, serverPort, serverUrls } from "./config"
import { ICardDetail } from "../Models/Card"

export class FetchData {
  static async getCards() {
    const cookie = document.cookie.split("=")[1]
    return await axios.get(`${server + serverPort + serverUrls.getCards}`, {
      headers: {
        Authorization: cookie,
      },
    })
  }

  static async quickTransfer(
    fromCardNumber: string,
    toCardNumber: string,
    amount: string
  ) {
    const cookie = document.cookie.split("=")[1]

    fromCardNumber = fromCardNumber.split(" ").join("")

    toCardNumber = toCardNumber.split(" ").join("")

    return await axios.post(
      `${server + serverPort + serverUrls.quickTransfer}`,
      { fromCardNumber, toCardNumber, amount },
      {
        headers: {
          Authorization: cookie,
        },
      }
    )
  }

  static async addCard(cardDetails:ICardDetail){


    const cookie = document.cookie.split("=")[1]

    return await axios.post(`${server + serverPort + serverUrls.addCard}`,{"cardHolder":cardDetails.cardHolder,"cardNumber":cardDetails.cardNumber.split(" ").join(""),
    "cvv":cardDetails.cvv,"date":cardDetails.date["$D"]+"/"+cardDetails.date["$y"]},{
      headers: {
        Authorization: cookie,
      },
    })
  }

  static async cardAvailability(cardNumber:string,value:boolean,password:string){
    const cookie = document.cookie.split("=")[1]

    return await axios.post(`${server + serverPort + serverUrls.cardAvailability}`,{cardNumber,value,password},
    {
      headers: {
        Authorization: cookie,
      },
    }
    
    )

  }
}

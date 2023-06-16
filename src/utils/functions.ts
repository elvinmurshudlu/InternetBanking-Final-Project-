import getSymbolFromCurrency from "currency-symbol-map"


export function amount(amount: string, currency: string,card=false) {
    let result = ""
    
    if(!card){
        if (+amount < 0) {
            result += "-"
          }else{
            result += "+"
          }
    }

    result +=
      getSymbolFromCurrency(currency) +
      (amount >= "0" ? +amount : -amount).toLocaleString()

    return result
  }

export function cardNumber(number:string){
    return `${number.slice(0,4)} **** **** ${number.slice(12)}`

}
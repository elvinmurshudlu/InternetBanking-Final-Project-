export interface ICardProps{
    cardInformation:ICard,
    selected?:boolean,
    color?:string
}



export interface ICard{
    id:number,
    cardNumber:string,
    userId:number,
    currency:string,
    amount:string,
    cvv:number,
    expireDate:string,
    type:string,
    isAvailable:boolean,
    security:boolean,
    pin:string,
    accountNumber:string,
    cardHolder:string,
    createdAt:string,
    updatedAt:string
}
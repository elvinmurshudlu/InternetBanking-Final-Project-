export interface ITransactions{
    id: number
    amount: string
    currency: string
    userId: number
    type: string
    connectedCard: string
    connectedUser: string
    createdAt: string
    updatedAt: string
    notification:boolean
}
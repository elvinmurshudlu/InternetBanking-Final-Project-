export interface ITransactions{
    id: number
    amount: string
    fromUserId: number
    senderName: string
    recipientName: string
    toUserId: string
    fromCard: string
    toCard: string
    currency: string
    transferType: string
    transferHeader: string
    notification: boolean
    createdAt: string
    updatedAt: string
}
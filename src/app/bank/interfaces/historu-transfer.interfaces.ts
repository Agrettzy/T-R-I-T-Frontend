

export interface HistoryTransaction {
    transactionId: string;
    amount: string;
    status: 'success' | 'failed' | 'pending';
    fromName: string;
    fromAccount: string;
    toName: string;
    toAccount: string;
    createdAt: Date;
    type: 'sent' | 'received';

}

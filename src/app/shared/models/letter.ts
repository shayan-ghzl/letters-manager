export interface Letter {
    letterUUID: string;
    fileNumber: string;
    accountingCode: string;
    sellerId: string;
    buyerId: string;
    plateNumber: string;
    device: string;
    type: string;
    model: string;
    stringDate: string;
    systemId:number;
    colorId:number;
    isRemoved?:boolean;
    isEdited?:boolean;
    isAdded?:boolean;
}
export interface LetterParams {
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
}
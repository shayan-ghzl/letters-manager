import { Image } from './upload';

export interface Person {
    customerUUID: string | null;
    firstName: string;
    lastName: string;
    fatherName: string;
    nationalID: string;
    certificateNumber: string;
    fromLocation: string;
    stringBirthDate: string;
    address: string;
    phoneNumber: string;
    isRemoved?:boolean;
    isEdited?:boolean;
    isAdded?:boolean;
    hasWarning?:boolean;
    medias:any[]
}
export interface PersonParams {
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
    keyword?: string;
}
export interface PersonSubErrors {
    field: string;
    message: string;
    object: string;
    rejectedValue: string;
}
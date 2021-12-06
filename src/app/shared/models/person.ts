export interface Person {
    personUUID: string;
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
}
export interface PersonParams {
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
    keyword?: string;
}
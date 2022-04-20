export interface ModificationHighlights {
    isRemoved?: boolean;
    isEdited?: boolean;
    isAdded?: boolean;
}
export interface Letter extends ModificationHighlights {
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
    systemId: number;
    colorId: number;
}
export interface Person extends ModificationHighlights {
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
    medias: any[]
    hasWarning?: boolean;
}
export interface Company extends ModificationHighlights {
    customerUUID: string;
    mediaIds: string[]
    address: string;
    phoneNumber: string;
    name: string;
    type: string;
    registerCode: string;
    nationalCode: string;
}
export interface Vehicle extends ModificationHighlights {
    itemUUID: string;
    creationDate: string;
    lastUpdate: string;
    system: string;
    color: string;
    chassisNumber: string;
    motorNumber: string;
    bodyNumber: string;
    vin: string;
    plaque: string;
    removable: boolean;
}
export interface Image extends ModificationHighlights {
    mediaUUID: string;
    name: string;
    description: string;
    contentType: string;
    size: number;
    uploadDate: string;
    resourceUrl: string;
    customers: string[];
    letters: string[];
    categories: MediaCategory[];
    alternateText: string;

    isSelected?: boolean;
}
export interface ImageParams {
    page?: number;
    size?: number;
}
export interface MediaCategoryParams {
    page?: number;
    size?: number;
    sort?: string;
    order?: string;

}
export interface MediaCategory extends ModificationHighlights {
    categoryUUID: string;
    parentId: string | null;
    name: string;
    description: string;
    children: MediaCategory[],
    removable: boolean;
    childrenCount: number;
    isEditOpen?: boolean;
    isSelected?: boolean;
    level?: number;
}
export interface AddMediaCategory {
    categoryUUID: string | null;
    name: string;
    description: string;
    parentId: string | null;

}
export interface CardFormControls {
    formControlName: string;
    fieldErrorMessage: string;
    persianLable: string;
    validation: {
        isRequired: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: string;
    }
}
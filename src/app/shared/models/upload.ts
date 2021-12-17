export interface Image {
    mediaUUID: string;
    name: string;
    description: string;
    contentType: string;
    size: number;
    uploadDate: string;
    resourceUrl: string;
    alternateText: string;
    isRemoved?:boolean;
    isEdited?:boolean;
    isAdded?:boolean;
}
export interface ImageParams {
    page?: number;
    size?: number;
}
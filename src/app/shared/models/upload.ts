export interface Image {
    mediaUUID: string;
    name: string;
    description: string;
    contentType: string;
    size: number;
    uploadDate: string;
    resourceUrl: string;
    alternateText: string;
    isRemoved?: boolean;
    isEdited?: boolean;
    isAdded?: boolean;
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
export interface MediaCategory {
    categoryUUID: string;
    name: string;
    description: string;
    children: MediaCategory[],
    removable: boolean;
    childrenCount: number;
    isRemoved?: boolean;
    isEdited?: boolean;
    isAdded?: boolean;
    isSelected?: boolean;
}
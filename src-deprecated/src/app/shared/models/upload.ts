export interface Image {
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
    parentId: string | null;
    name: string;
    description: string;
    children: MediaCategory[],
    removable: boolean;
    childrenCount: number;
    isRemoved?: boolean;
    isEdited?: boolean;
    isEditOpen?: boolean;
    isAdded?: boolean;
    isSelected?: boolean;
    level?: number;
}
export interface AddMediaCategory {
    categoryUUID: string | null;
    name: string;
    description: string;
    parentId: string | null;

}
export interface TableColumn {
    name: string;
    class: string;
    order: boolean;
    isSortable: boolean;
}
export interface Pagination {
    querySet: MediaCategory[];
    page: number;
    rows: number;
    window: number;
    maxLeft:() => number;
    maxRight:() => number;
  }
  export interface PageItem {
    page: number;
    isActive: boolean;
  }
  export interface PaginationPack {
    pageItems: PageItem[];
    hasNext: boolean;
    hasPrev: boolean;
  }
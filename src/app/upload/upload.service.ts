import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddMediaCategory, ImageParams, MediaCategory, Image } from '../shared/model/model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // this is for get image
  getImages(parameters: ImageParams): Observable<any> {
    console.log(parameters);
    let params = new HttpParams();
    // these params are integer and maybe value will be zero so condition will be false
    if (typeof parameters.page !== 'undefined') {
      params = params.append('page', parameters.page);
    }
    // these params are integer and maybe value will be zero so condition will be false
    if (typeof parameters.size !== 'undefined') {
      params = params.append('size', parameters.size);
    }
    if (parameters.keyword) {
      params = params.append('keyword', parameters.keyword);
    }
    return this.http.get<Image>(this.baseUrl + 'lm/v1/media/image', { params: params });
  }

  getImageById(imageId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('imageId ', imageId);
    return this.http.get<Image>(this.baseUrl + 'lm/v1/media/image', { params: params });
  }

  addImage(file: any) {
    let formData = new FormData();
    formData.append('image', <File>file);
    formData.append('contentType', 'multipart/form-data');
    formData.append('description', '');
    formData.append('alternateText', '');
    return this.http.post<any>(this.baseUrl + 'lm/v1/media/image', formData);
  }

  editImage(image: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'lm/v1/media/image', image);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'lm/v1/media/image/' + imageId);
  }

  getCategories(parameters: any): Observable<any> {
    let params = new HttpParams();
    // these params are integer and maybe value will be zero so condition will be false
    if (typeof parameters.page !== 'undefined') {
      params = params.append('page', parameters.page);
    }
    // these params are integer and maybe value will be zero so condition will be false
    if (typeof parameters.size !== 'undefined') {
      params = params.append('size', parameters.size);
    }
    if (parameters.sort) {
      params = params.append('sort', parameters.sort);
    }
    if (parameters.order) {
      params = params.append('order', parameters.order);
    }
    return this.http.get<MediaCategory>(this.baseUrl + 'lm/v1/media/category/', { params: params });
  }

  addCategory(category: AddMediaCategory) {
    return this.http.post<MediaCategory>(this.baseUrl + 'lm/v1/media/category', category);
  }

  editCategory(category: AddMediaCategory): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'lm/v1/media/category', category);
  }

  deleteCategory(category: MediaCategory): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'lm/v1/media/category/' + category.categoryUUID);
  }

  // this is for add mediaCategory or edit
  modificationMediaCategory(mediaCategory: MediaCategory): Observable<any> {
    if(mediaCategory.categoryUUID){
      return this.http.put<any>(this.baseUrl + 'lm/v1/media/category', mediaCategory);

    }else{
      return this.http.post<any>(this.baseUrl + 'lm/v1/media/category', mediaCategory);
    }
  }
}

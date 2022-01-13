import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddMediaCategory, Image, ImageParams, MediaCategory } from '../shared/models/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // this is for get image
  getImages(parameters: ImageParams): Observable<any> {
    let params = new HttpParams();
    // these params are integer and maybe value will be zero so condition will be false
    if (typeof parameters.page !== 'undefined') {
      params = params.append('page', parameters.page);
    }
    // these params are integer and maybe value will be zero so condition will be false
    if (typeof parameters.size !== 'undefined') {
      params = params.append('size', parameters.size);
    }
    return this.http.get<Image>(this.baseUrl + 'lm/v1/media/image', { params: params });
  }

  uploadImages(file: any) {
    let formData = new FormData();
    formData.append('image', <File>file);
    formData.append('contentType', 'multipart/form-data');
    formData.append('description', '');
    formData.append('alternateText', '');
    return this.http.post<any>(this.baseUrl + 'lm/v1/media/image', formData);
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
    return this.http.get<MediaCategory>(this.baseUrl + 'lm/v1/category/media', { params: params });
  }


  addCategory(category: AddMediaCategory) {
    return this.http.post<MediaCategory>(this.baseUrl + 'lm/v1/category/media', category);
  }
}

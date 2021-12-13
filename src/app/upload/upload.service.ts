import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image, ImageParams } from '../shared/models/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // this is for get image
  getImages(parameters: ImageParams): Observable<any> {
    let params = new HttpParams();
    if (parameters.page) {
      params = params.append('page', parameters.page);
    }
    if (parameters.size) {
      params = params.append('size', parameters.size);
    }
    return this.http.get<Image>(this.baseUrl + 'lm/v1/media/image', { params: params });
  }


}

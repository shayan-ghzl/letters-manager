import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../shared/models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getColors(): Observable<any> {
    return this.http.get<Color>(this.baseUrl + 'lm/v1/color');
  }
  deleteColor(color:Color): Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'lm/v1/color/' + color.id);
  }
  addColor(color: Color): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'lm/v1/color',color);
  }
}

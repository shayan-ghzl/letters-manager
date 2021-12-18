import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { System } from '../shared/models/system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getSystems(): Observable<any> {
    return this.http.get<System>(this.baseUrl + 'lm/v1/system');
  }
  deleteSystem(system:System): Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'lm/v1/system/' + system.id);
  }
  addSystem(system: System): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'lm/v1/system',system);
  }
  
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Person } from '../models/person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getPersons(): Observable<any>{
    return this.http.get<Person>(this.baseUrl + 'lm/v1/person')
    .pipe(
      map((response: any) => {
        console.log(response);
        return response.content;
      })
    );
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from './models/person';

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
        // console.log(response);
        return response.content;
      })
    );
  }
  putPerson(person: Person): Observable<any>{
    return this.http.put<any>(this.baseUrl + 'lm/v1/person/' + person.personUUID , person)
    .pipe(
      map(response => {
        return response;
      })
    );
  }

}

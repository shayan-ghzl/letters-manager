import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../shared/models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPersons(parameters: any): Observable<any> {
    let params = new HttpParams();
    if (parameters.page) {
      params = params.append('page', parameters.page);
    }
    if (parameters.size) {
      params = params.append('size', parameters.size);
    }
    if (parameters.sort) {
      params = params.append('sort', parameters.sort);
    }
    if (parameters.order) {
      params = params.append('order', parameters.order);
    }
    if (parameters.keyword) {
      params = params.append('keyword', parameters.keyword);
    }
    return this.http.get<Person>(this.baseUrl + 'lm/v1/person', { params: params })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  putPerson(person: Person): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'lm/v1/person/' + person.personUUID, person)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  deletePerson(person: Person): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'lm/v1/person/' + person.personUUID)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

}

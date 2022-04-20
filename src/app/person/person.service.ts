import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../shared/model/model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
 
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // this is for get person
  getPersons(parameters: any): Observable<any> {
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
    if (parameters.keyword) {
      params = params.append('keyword', parameters.keyword);
    }
    return this.http.get<Person>(this.baseUrl + 'lm/v1/person', { params: params });
  }
  // this is for edit person 
  putPerson(person: Person): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'lm/v1/person', person);
  }
  // this is for delete person
  deletePerson(person: Person): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'lm/v1/person/' + person.customerUUID);
  }
  // this is for add person
  addPerson(person: Person): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'lm/v1/person', person);
  }
  // this is for add person or edit
  modificationPerson(person: Person): Observable<any> {
    if(person.customerUUID){
      return this.http.put<any>(this.baseUrl + 'lm/v1/person', person);

    }else{
      return this.http.post<any>(this.baseUrl + 'lm/v1/person', person);
    }
  }

  getPersonById(id:string): Observable<any> {
    return this.http.get<Person>(this.baseUrl + 'lm/v1/person/' + id);
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Letter } from '../shared/models/letter';

@Injectable({
  providedIn: 'root'
})
export class LetterService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  // this is for get letter
  getLetters(parameters: any): Observable<any> {
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
    return this.http.get<Letter>(this.baseUrl + 'lm/v1/letter', { params: params });
  }
  // // this is for edit letter 
  // putLetter(letter: Letter): Observable<any> {
  //   return this.http.put<any>(this.baseUrl + 'lm/v1/letter/' + letter.customerUUID, letter);
  // }
  // // this is for delete letter
  // deleteLetter(letter: Letter): Observable<any> {
  //   return this.http.delete<any>(this.baseUrl + 'lm/v1/letter/' + letter.customerUUID);
  // }
  // // this is for add letter
  // addLetter(letter: Letter): Observable<any> {
  //   return this.http.post<any>(this.baseUrl + 'lm/v1/letter',letter);
  // }

}

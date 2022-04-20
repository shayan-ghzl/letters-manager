import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../shared/model/model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // this is for get company
  getCompanys(parameters: any): Observable<any> {
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
    return this.http.get<Company>(this.baseUrl + 'lm/v1/company', { params: params });
  }
  // this is for edit company 
  putCompany(company: Company): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'lm/v1/company', company);
  }
  // this is for delete company
  deleteCompany(company: Company): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'lm/v1/company/' + company.customerUUID);
  }
  // this is for add company
  addCompany(company: Company): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'lm/v1/company', company);
  }

  getCompanyById(id:string): Observable<any> {
    return this.http.get<Company>(this.baseUrl + 'lm/v1/company/' + id);
  }
    // this is for add company or edit
    modificationCompany(company: Company): Observable<any> {
      if(company.customerUUID){
        return this.http.put<any>(this.baseUrl + 'lm/v1/company', company);
  
      }else{
        return this.http.post<any>(this.baseUrl + 'lm/v1/company', company);
      }
    }
}

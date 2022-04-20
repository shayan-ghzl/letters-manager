import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../shared/model/model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // this is for get vehicle
  getVehicles(parameters: any): Observable<any> {
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
    return this.http.get<Vehicle>(this.baseUrl + 'lm/v1/item/vehicle', { params: params });
  }
  // this is for edit vehicle 
  putVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'lm/v1/item/vehicle', vehicle);
  }
  // this is for delete vehicle
  deleteVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'lm/v1/item/vehicle/' + vehicle.itemUUID);
  }
  // this is for add vehicle
  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'lm/v1/item/vehicle', vehicle);
  }

  getVehicleById(id:string): Observable<any> {
    return this.http.get<Vehicle>(this.baseUrl + 'lm/v1/item/vehicle/' + id);
  }


  // this is for add vehicle or edit
  modificationVehicle(vehicle: Vehicle): Observable<any> {
    if(vehicle.itemUUID){
      return this.http.put<any>(this.baseUrl + 'lm/v1/item/vehicle', vehicle);
    }else{
      return this.http.post<any>(this.baseUrl + 'lm/v1/item/vehicle', vehicle);
    }
  }
}

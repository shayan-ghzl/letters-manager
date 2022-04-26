import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  passwordMatchValidator(password:string, confirmPassword:string){}
  
  usernameNotTakenValidator(username:string){}

}

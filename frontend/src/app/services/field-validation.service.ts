import { Injectable } from '@angular/core';
import * as shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class FieldValidationService {

  constructor() { }

  /* Takes in string and returned hashed output*/
  public hashPW(pw:string){
    let hashedPW = shajs('sha256').update(pw).digest('hex')    
    return hashedPW
  }

  public validatePW(pw:string){
    let isValid = true;
    if(pw==""){
      isValid = false
    }
    // else if (pw.toLowerCase() == pw){
    //   isValid = false
    // }
    return isValid
  }

  public validatePin(pin:string){
    let isValid = true
    if( !/^\d+$/.test(pin)){
      isValid = true
    }
    else if(pin.length != 8){
      isValid = false
    }
    
    return isValid
  }
}

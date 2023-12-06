import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor() { }

  public setSessionStorage(key:string,content:any){
    sessionStorage.setItem(key,content);
  }

  public getSessionStorage(key:string){
    return sessionStorage.getItem(key);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private client: HttpClient) { }

  getAllProducts () {
    return this.client.get("/api/get_products",{responseType:'json'})
  }

  async getEndDate(pin:string){
    let result = await fetch("/api/get_end", {
      method: 'POST',
      body: JSON.stringify({
        pin: pin,
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });
    console.log(result);
    
  }
}

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
}

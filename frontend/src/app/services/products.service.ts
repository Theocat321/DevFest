import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserStorageService } from './browser-storage.service';
import { BrowserDetailsService } from './browser-details.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private client: HttpClient, private bStorage: BrowserStorageService,
              private bDetails:BrowserDetailsService) { }

  getAllProducts () {
    return this.client.get("/api/get_products",{responseType:'json'})
  }

  public async addProductToBasket(product_id:string, quantity:number, single_cost:number){
    // Pre processing
    let pin = this.bStorage.getSessionStorage("current_basket_pin")
    let pw = this.bStorage.getSessionStorage("current_basket_hash")
    if(pin == null || pw == null){
      console.warn("User not in basket");
      return false;
    }
    let totalCost = quantity * single_cost
    let browserfingerprint = await this.bDetails.getBrowserFingerprint()
    const response = await fetch("/api/add_item_to_basket", {
      method: 'POST',
      body: JSON.stringify({
        pin: pin,
        pw:pw,
        product_id:product_id,
        quantity:quantity,
        cost:totalCost,
        confirmed: false,
        user_added: browserfingerprint
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });    
    if (response.status != 200){
      console.warn("Error in uploading items");
      return false;
    } else{       
      return true;
    }
  }

  public async updatePendingToTrue(listOfConfirmed:any){
    // Preprocessing
    let pin = this.bStorage.getSessionStorage("current_basket_pin")
    let pw = this.bStorage.getSessionStorage("current_basket_hash")
    if(pin == null || pw == null){
      console.warn("User not in basket");
      return false;
    }
    let browserfingerprint = await this.bDetails.getBrowserFingerprint()
    const response = await fetch("/api/update_product_status", {
      method: 'POST',
      body: JSON.stringify({
        pin: pin,
        pw:pw,
        updated_products:listOfConfirmed,
        user_added: browserfingerprint
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });    
    if(response.status != 200){
      console.warn("Error changing the items");
      return false;      
    }
    return true;
  }
}

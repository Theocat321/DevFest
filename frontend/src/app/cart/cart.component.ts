import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { generate } from 'rxjs';
import { BrowserDetailsService } from '../services/browser-details.service';
import { FieldValidationService } from '../services/field-validation.service';
import { BrowserStorageService } from '../services/browser-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  isOpen = false;
  activeBasket = false;

  // Attributes for the current basket if there is one
  basketPin!:string;
  basketExpire!:Date;
  basketItems!:any; // This will be replaced by a list

  constructor(private formBuilder:FormBuilder, private browserDetails:BrowserDetailsService,
              private validationService:FieldValidationService, private bStorage:BrowserStorageService){}

  // Initalising the forms
  joinForm = this.formBuilder.group({
    pin: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    pw: new FormControl("", [Validators.required])
  });
  get JoinPin() { return this.joinForm.get('pin')!; }
  get JoinPW() { return this.joinForm.get('pw')!; }


  generateForm = this.formBuilder.group({
    dt: new FormControl("", [Validators.required]),
    pw: new FormControl("", [Validators.required])
  });
  get GenDate() { return this.generateForm.get('dt')!; }
  get GenPW() { return this.generateForm.get('pw')!; }

  // Functions for the forms
  async submitGenerateBasket(){
    let pw = this.GenPW.value
    // Validate PW
    if (!this.validationService.validatePW(pw!)){
      return
    }
    // hash the password
    pw = this.validationService.hashPW(pw!)

    // Get the vistor ID
    let visitorID = await this.browserDetails.getBrowserFingerprint();
    if(visitorID){
      // Generate the basket via post request
      this.generateBasket(visitorID,pw)
    }else{
      console.error("Browser Fingerprint not recived");
    }
  }

  public async generateBasket(browserfingerprint:string,hashedPW:string){
    // Generate random 8 digit int
    let pin:number = Math.floor(10000000 + Math.random() * 90000000);

    //Todo remove this and change to user input
    var date = new Date();
    date.setDate(date.getDate() + 7);

    // Send to server
    const response = await fetch("/api/new_basket", {
      method: 'POST',
      body: JSON.stringify({
        pin: pin,
        pw:hashedPW,
        browserfingerprint:browserfingerprint,
        endtime:date,
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });
    // If the response is invalid
    if(response.status != 200){
      console.warn("Error in creating basket");
    }
    else{
      // Changing user state 
      this.basketPin = pin.toString()
      this.activeBasket = true
      // Setting session storage to current basket info
      this.bStorage.setSessionStorage("current_basket_pin",pin.toString())
      this.bStorage.setSessionStorage("current_basket_hash",hashedPW)
      this.bStorage.setSessionStorage("current_basket_end",date)
      // Fetch basket items
      this.fetchBasketItems(pin.toString(),hashedPW)
    }
  }

  public submitJoinBasket(){
    let pin = this.JoinPin.value
    let pw = this.JoinPW.value
    // Validate the pin and PW
    if(!this.validationService.validatePW(pw!) || !this.validationService.validatePin(pin!)){
      return;
    }
    // hash the pw
    pw = this.validationService.hashPW(pw!);
    this.joinBasket(pin!,pw)
  }

  public async joinBasket(pin:string, hashedPW:string){
    // Send post request
    const response = await fetch("/api/join_basket", {
      method: 'POST',
      body: JSON.stringify({
        pin: pin,
        pw:hashedPW
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });
    // If invalid stop    
    if (response.status != 200){
      console.warn("Error in joining basket");
    }else{
      let response_data = await response.json();
      // Shows user basket 
      this.basketPin = pin
      this.activeBasket = true;
      // Setting session storage to current basket info
      this.bStorage.setSessionStorage("current_basket_pin",pin.toString())
      this.bStorage.setSessionStorage("current_basket_hash",hashedPW)
      this.bStorage.setSessionStorage("current_basket_end",response_data['end_time'])
      // Fetching basket information
      this.fetchBasketItems(pin,hashedPW)
    }
  }

  // Open or close the basket
  public toggleOpen(){
    this.isOpen =  !this.isOpen
    // When basket is open check if there are session storage and load appropriate basket
    if (this.isOpen){
      // Get session storage
      let session_pin = this.bStorage.getSessionStorage("current_basket_pin")
      let session_hash = this.bStorage.getSessionStorage("current_basket_hash")
      // If there are details load the basket
      if(session_hash != null && session_pin != null){
        this.basketPin = session_pin
        this.activeBasket = true;
        this.fetchBasketItems(session_pin,session_hash)
      }else{
        this.activeBasket = false
      }
    }
  }

  public async fetchBasketItems(pin:string,hashedPW:string){
    const response = await fetch("/api/join_basket", {
      method: 'POST',
      body: JSON.stringify({
        pin: pin,
        pw:hashedPW
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });    
    if (response.status != 200){
      console.warn("Error in fetching basket items");
    } else{       
      let data =  await response.json();
      this.basketItems = data['data']    
      console.log(this.basketItems);
        
    }
  }
}
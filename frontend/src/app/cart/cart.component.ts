import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { generate } from 'rxjs';
import { BrowserDetailsService } from '../services/browser-details.service';
import { FieldValidationService } from '../services/field-validation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  isOpen = true;
  activeBasket = false;

  // Attributes for the current basket if there is one
  basketPin!:string;
  basketExpire!:Date;
  basketItems!:any; // This will be replaced by a list

  constructor(private formBuilder:FormBuilder, private browserDetails:BrowserDetailsService,private validationService:FieldValidationService){}

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
      this.activeBasket = true
      //TODO: logic for joining the basket
      this.basketPin = pin.toString()
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
      this.activeBasket = true;
      // logic for showing the active basket items
      this.basketPin = pin
      this.fetchBasketItems(pin,hashedPW)
    }
  }

  // Open or close the basket
  public toggleOpen(){
    this.isOpen =  !this.isOpen
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
      this.basketItems =  await response.json();
    }
  }
}
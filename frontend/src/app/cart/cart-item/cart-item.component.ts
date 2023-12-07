import { Component, Input, OnInit } from '@angular/core';
import { BrowserDetailsService } from 'src/app/services/browser-details.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit{
  @Input() item:any;

  myItem:boolean = false

  constructor(private bDetails:BrowserDetailsService){}

  async ngOnInit() {
    let fingerprint =await  this.bDetails.getBrowserFingerprint() 
    if(this.item['user_added']==fingerprint){
      this.myItem = true;
    }
  }

}

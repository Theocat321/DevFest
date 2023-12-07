import { Component, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { BrowserStorageService } from 'src/app/services/browser-storage.service';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent {

  private subscription!: Subscription;

  public dateNow = new Date();
  @Input() public dDay!:Date;
  @Input() resetBasket:any;
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference:any;
  public secondsToDday:any;
  public minutesToDday:any;
  public hoursToDday:any;
  public daysToDday:any;

  constructor(private bStorage:BrowserStorageService){}


  private async getTimeDifference () {
      this.timeDifference = this.dDay.getTime() - new  Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
      if(this.timeDifference < 0 ){
        let pin = this.bStorage.getSessionStorage("current_basket_pin")
        let pw = this.bStorage.getSessionStorage("current_basket_hash")

        // Send request to order items
        const response = await fetch("/api/order_basket", {
          method: 'POST',
          body: JSON.stringify({
            pin: pin,
            pw:pw
          }),
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });    
        if (response.status != 200){
          console.warn("Error in fetching basket items");
        } else{ 
          let data =  await response.json();
          if(data['enough_items']==true){
            alert("Basket expired \n Items have been ordered")
          }else{
            alert("Basket not full enough \n Deleted from database, start a new basket")
          }
        }
        // Stop timer
        this.subscription.unsubscribe()

        // reset basket
        this.resetBasket()
      }
  }

  private allocateTimeUnits (timeDifference:any) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
        this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnInit() {  
    this.subscription = interval(1000)
    .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

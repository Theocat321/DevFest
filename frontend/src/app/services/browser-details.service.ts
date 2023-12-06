import { Injectable } from '@angular/core';
import {  FingerprintjsProAngularService } from '@fingerprintjs/fingerprintjs-pro-angular';

@Injectable({
  providedIn: 'root'
})
export class BrowserDetailsService {

  constructor(private fingerprintjsProAngularService: FingerprintjsProAngularService) {}

  async getBrowserFingerprint(){
    try {
      const data = await this.fingerprintjsProAngularService.getVisitorData({
        extendedResult: true,
      });
      let visitorId = data.visitorId;
      return visitorId
    } catch (error) {
      // error
      console.log(error);
      return null
    }
  }
}

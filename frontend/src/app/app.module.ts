import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingPageComponent } from './pages/index/landing-page/landing-page.component';
import { IndexPageComponent } from './pages/index/index-page/index-page.component';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { OurMissionSectionComponent } from './pages/index/our-mission-section/our-mission-section.component';
import { HowItWorksComponent } from './pages/index/how-it-works/how-it-works.component';
import { InstructionCirclesComponent } from './pages/index/how-it-works/instruction-circles/instruction-circles.component';
import { FinalCallToActionComponent } from './pages/index/final-call-to-action/final-call-to-action.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsPageComponent } from './pages/products/products-page/products-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './pages/products/product-item/product-item.component';
import { SingleProductPageComponent } from './pages/single-product/single-product-page/single-product-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OurMissionPageComponent } from './pages/our-mission/our-mission-page/our-mission-page.component';
import { CartComponent } from './cart/cart.component';
import { FingerprintjsProAngularModule } from '@fingerprintjs/fingerprintjs-pro-angular';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CountDownComponent } from './cart/count-down/count-down.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandingPageComponent,
    IndexPageComponent,
    NavLinksComponent,
    OurMissionSectionComponent,
    HowItWorksComponent,
    InstructionCirclesComponent,
    FinalCallToActionComponent,
    FooterComponent,
    ProductsPageComponent,
    ProductItemComponent,
    SingleProductPageComponent,
    OurMissionPageComponent,
    CartComponent,
    CartItemComponent,
    CountDownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FingerprintjsProAngularModule.forRoot({
      loadOptions: {
        apiKey: "cdpOFSivlm7ENYkUjoX2",
        region: "eu"
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

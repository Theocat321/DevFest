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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

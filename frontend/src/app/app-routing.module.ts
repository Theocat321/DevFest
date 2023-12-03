import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index/index-page/index-page.component';
import { ProductsPageComponent } from './pages/products/products-page/products-page.component';
import { SingleProductPageComponent } from './pages/single-product/single-product-page/single-product-page.component';
import { OurMissionPageComponent } from './pages/our-mission/our-mission-page/our-mission-page.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:product_id', component: SingleProductPageComponent },
  { path: 'our-mission', component:OurMissionPageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

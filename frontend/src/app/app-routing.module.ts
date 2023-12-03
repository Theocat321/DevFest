import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index/index-page/index-page.component';
import { ProductsPageComponent } from './pages/products/products-page/products-page.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'products', component: ProductsPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

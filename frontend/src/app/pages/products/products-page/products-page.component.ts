import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  public products = []

  constructor(private ProductsClient:ProductsService){}

  ngOnInit() {  
    this.ProductsClient.getAllProducts().subscribe((data:any)=>{
      this.products = data['results']
  })
  }
}

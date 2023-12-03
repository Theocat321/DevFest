import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent implements OnInit{

  public product_id!: string;
  public product_info:any;
  public valid_id:boolean = false;

  quantityForm = this.formBuilder.group({
    qt: '',
  });

  constructor(private route: ActivatedRoute, private ProductsClient:ProductsService,private formBuilder: FormBuilder,) {}

  ngOnInit() {
    // Get the product id from url
    this.product_id = this.route.snapshot.paramMap.get('product_id')!;
    // Get the data from backend
    this.ProductsClient.getAllProducts().subscribe((data:any)=>{
      // Getting the product ID from 
      let productList = data['results'];
      for (var product of productList){
        if(product['product_id']==this.product_id){
          this.product_info = product;
          this.valid_id = true;
        }
      }
      console.log(this.product_info)
    })
  }

  onSubmit(): void {
    // TODO: Check if basket open
    // TODO: add to basket
    alert('Your items have been added to the basket');
    this.quantityForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrowserDetailsService } from 'src/app/services/browser-details.service';
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
    qt:  new FormControl("", [Validators.required]),
  });

  get quantity() { return this.quantityForm.get('qt')!; }


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
    console.log(this.product_info);
    
  }

  onSubmit(): void {
    // Ask service to add to basket
    let quantityInt = parseInt(this.quantity.value!)
    let costPerUnit = parseFloat(this.product_info['cost_per_unit'])
    this.ProductsClient.addProductToBasket(this.product_id,quantityInt,costPerUnit);
    alert('Your items have been added to the basket');
    this.quantityForm.reset();
  }
}

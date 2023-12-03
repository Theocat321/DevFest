import { Component, Input } from '@angular/core';

type Tproduct = {
  product_id:string
  title:string
  description:string
  cost_per_unit:number
  unit_name:string
  sourced_country:string
  warehouse_location:string
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product_id!:string;
  @Input() title!:string;
  @Input() description!:string;
  @Input() cost_per_unit!:number;
  @Input() unit_name!:string;
  @Input() sourced_country!:string;
  @Input() warehouse_location!:string;
  @Input() image_url!:string;
}

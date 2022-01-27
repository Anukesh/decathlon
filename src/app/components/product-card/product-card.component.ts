import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/common/types/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: Product;
  @Input() loading!: boolean;
  @Output()
  quantityUpdated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  change(e: any, product: Product) {
    this.quantityUpdated.emit({ ...product, quantity: e });
  }
}

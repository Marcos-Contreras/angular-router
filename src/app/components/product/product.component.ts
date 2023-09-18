import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  // INITIALIZE THE VALUE OF PRODUCT SO AVOID TYPESCRIPT ERRORS
  @Input() product: Product = {
    id: '',
    name: '',
    image: '',
    price: 0
  };

@Output() addedProduct = new EventEmitter<Product>();

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
}

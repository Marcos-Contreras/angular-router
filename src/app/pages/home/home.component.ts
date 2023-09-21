import { Component } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }

  loadMore() {
      this.productsService.getProductsByPage(this.limit, this.offset)
      .subscribe(response => {
        console.log(response);
        this.products = this.products.concat(response);
        this.offset += this.limit;
      });
    }
}

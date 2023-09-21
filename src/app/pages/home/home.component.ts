import { Component } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { Product } from './../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      console.log(data);
      this.products = data;
    });
    this.activatedRoute.queryParamMap.subscribe(params => {
      // SETTING THE productId VARIABLE TO THE VALUE PASSED FROM QUERYPARAMS
      // ACTIVATES THE set productId FUNCTION IN THE PRODUCTS COMPONENT FILE
      this.productId = params.get('product');
      console.log('actual log');

      console.log(this.productId);

    });
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset + this.limit)
    .subscribe(response => {
      console.log(response);
      this.products = this.products.concat(response);
      this.offset += this.limit;
    });
  }
}

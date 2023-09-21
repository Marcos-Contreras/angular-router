import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Product } from 'src/app/models/product.model';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      console.log(this.categoryId);
      if(this.categoryId){
        this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe(response => {
          this.products = response;
        })
      }
    });
    this.activatedRoute.queryParamMap.subscribe(params => {
      // SETTING THE productId VARIABLE TO THE VALUE PASSED FROM QUERYPARAMS
      // ACTIVATES THE set productId FUNCTION IN THE PRODUCTS COMPONENT FILE
      this.productId = params.get('product');
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

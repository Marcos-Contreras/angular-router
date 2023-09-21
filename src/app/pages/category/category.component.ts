import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Product } from 'src/app/models/product.model';

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

  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      console.log(this.categoryId);
      if(this.categoryId){
        this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe(response => {
          this.products = response;
        })
      }
    })
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

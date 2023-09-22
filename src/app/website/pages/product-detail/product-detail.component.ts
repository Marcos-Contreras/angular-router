import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { switchMap, subscribeOn } from 'rxjs/operators';
import { ProductsService } from '../../../services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');

          console.log(this.productId);

          if(this.productId) {
            return this.productsService.getProduct(this.productId);
          }
          return [null];
        })
      )
      .subscribe((response) => {
        this.product = response;
      })
  }

  goBack() {
    this.location.back();
  }
}

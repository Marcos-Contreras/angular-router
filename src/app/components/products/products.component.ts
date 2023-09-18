import { Component } from '@angular/core';
import { Product } from './../../models/product.model';
import { StoreService } from './../../services/store.service';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);

  // INJECT THE STORE CART SERVICE
  // DEPENDENCY INJECTION ENGINE OF ANGULAR CREATES THE INSTANCE OF THE SERVICE SO WE DO NOT HAVE TO
  // THE INSTANCE IS STORED AND IS BEING USED JUST ONCE (IT IS NOT CREATED BY EACH COMPONENT)
  constructor(
    private StoreService: StoreService,
    private ProductsService: ProductsService
  ) {
    this.myShoppingCart = this.StoreService.getShoppingCart();
  }

  ngOnInit(): void {
    this.ProductsService.getAllProducts()
    .subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product){
    // this.myShoppingCart.push(product);
    this.StoreService.addProduct(product);
    // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
    this.total = this.StoreService.getTotal();
  }
}

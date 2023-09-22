import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total: number = 0;
  @Input() products: Product[] = [];
  @Input()
  set productId(id: string | null) {
    if(id) {
      this.onShowDetail(id);
    }
  };
  today = new Date();
  date = new Date(2021, 1, 21);
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: '',
      title: ''
    }
  };
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  @Output() onLoadMore = new EventEmitter();

  // INJECT THE STORE CART SERVICE
  // DEPENDENCY INJECTION ENGINE OF ANGULAR CREATES THE INSTANCE OF THE SERVICE SO WE DO NOT HAVE TO
  // THE INSTANCE IS STORED AND IS BEING USED JUST ONCE (IT IS NOT CREATED BY EACH COMPONENT)
  constructor(
    private StoreService: StoreService,
    private ProductsService: ProductsService
  ) {
    this.myShoppingCart = this.StoreService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product){
    // this.myShoppingCart.push(product);
    this.StoreService.addProduct(product);
    // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
    this.total = this.StoreService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = ! this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    // this.toggleProductDetail();
    this.ProductsService.getProduct(id)
    .subscribe((response: Product) => {
      console.log('product: ', response);
      this.toggleProductDetail();
      this.productChosen = response;
      this.statusDetail = 'success';
    }, error => {
      window.alert(error);
      this.statusDetail = 'error';
    });
  }

  createNewProduct() {
    const newProduct: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Nueva descripción',
      images: ['https://placeimg.com/640/480/any'],
      price: 1000,
      categoryId: 2
    }

    this.ProductsService.create(newProduct)
    .subscribe(response => {
      console.log('created', response);
      this.products.unshift(response);
    });
  }

  updateProduct() {
    const changedProduct: UpdateProductDTO = {
      title: 'Title Updated',
    }
    const productId = this.productChosen.id;
    this.ProductsService.update(productId, changedProduct)
    .subscribe(response => {
      console.log('updated', response);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = response;
      this.productChosen = response;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.ProductsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });

  }

  loadMore() {
    this.onLoadMore.emit();
  }
}

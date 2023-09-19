import { Component } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from './../../models/product.model';
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

  limit = 10;
  offset = 0;

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
    this.ProductsService.getAllProducts(this.limit, this.offset)
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

  toggleProductDetail() {
    this.showProductDetail = ! this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.ProductsService.getProduct(id)
    .subscribe(response => {
      console.log('product: ', response);
      this.toggleProductDetail();
      this.productChosen = response;
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
    this.ProductsService.getProductsByPage(this.limit, this.offset)
    .subscribe(response => {
      console.log(response);
      this.products = this.products.concat(response);
      this.offset += this.limit;
    });
  }
}

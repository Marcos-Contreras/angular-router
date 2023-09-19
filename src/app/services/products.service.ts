import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.API_URL + '/api/v1/products/';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
   let params = new HttpParams();
   if(typeof limit === 'number' && typeof offset === 'number') {
     params = params.set('limit', limit);
     params = params.set('offset', offset);
   }
    // TYPE THE REQUEST TO RECEIVE AN ARRAY OF PRODUCTS
    return this.http.get<Product[]>(this.apiUrl, {
      params
    });
  }

  getProduct(id: string) {
    return this.http.get<Product>(this.apiUrl + id)
  }

  // DATA TRANSFER OBJECT
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(this.apiUrl + id, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(this.apiUrl + id);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl, {
      params: {
        limit,
        offset
      }
    });

  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { environment } from './../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.API_URL + '/api/v1';

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
    return this.http.get<Product[]>(this.apiUrl + '/products', {
      params
    });
  }

  getProduct(id: string) {
    return this.http.get<Product>(this.apiUrl + '/products/' + id)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict) {
          return throwError('Something is wrong in the server');
        }
        if(error.status === HttpStatusCode.NotFound) {
          return throwError('The product does not exist');
        }
        if(error.status === HttpStatusCode.Unauthorized) {
          return throwError('The action is not authorized');
        }
        return throwError('Ups...something went wrong');
      })
    );
  }

  // DATA TRANSFER OBJECT
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl + '/products' , dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(this.apiUrl + '/products/' + id, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(this.apiUrl + '/products/' + id);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl + '/products', {
      params: {
        limit,
        offset
      }
    });
  }

  getByCategory(categoryId: string, limit: number, offset: number) {
    let params = new HttpParams();
    if(typeof limit === 'number' && typeof offset === 'number') {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl + '/categories/' + categoryId + '/products', { params })
  }
}

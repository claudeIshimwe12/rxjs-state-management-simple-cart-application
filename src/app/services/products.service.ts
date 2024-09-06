import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private url = 'https://fakestoreapi.com/products';
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      catchError((err) => {
        console.log('Something went wrong while fetching');
        return of([]);
      })
    );
  }
}

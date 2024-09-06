import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';
import { Product } from '../models/product.interface';
import { Cart } from '../models/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart[]>([]);
  private totoalSubject = new BehaviorSubject<number>(0);
  products$: Observable<Cart[]> = this.cartSubject.asObservable();
  total$: Observable<number> = this.totoalSubject.asObservable();

  addToCart(product: Cart): void {
    let currentProducts: Cart[] = [];
    this.products$.subscribe((data) => (currentProducts = data));
    let currentPrice: number = 0;

    this.total$.subscribe((data) => (currentPrice = data));

    this.totoalSubject.next(currentPrice + product.product.price);

    this.cartSubject.next([...currentProducts, product]);
  }

  getCartProducts(): Observable<Cart[]> {
    return this.products$;
  }

  increaseProductQuantity(product: Product): void {
    let currentPrice: number = 0;

    this.total$.subscribe((data) => (currentPrice = data));

    this.totoalSubject.next(currentPrice + product.price);
    this.products$
      .pipe(
        take(1),
        map((currentProducts: Cart[]) => {
          return currentProducts.map((cartItem) => {
            if (cartItem.product.title === product.title) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
          });
        })
      )
      .subscribe((updatedProducts) => {
        this.cartSubject.next(updatedProducts);
      });
  }
  decreaseProductQuantity(product: Cart): void {
    let currentPrice: number = 0;

    this.total$.subscribe((data) => (currentPrice = data));

    this.products$.subscribe((data) => {
      if (data.includes(product)) {
        this.totoalSubject.next(currentPrice - product.product.price);
      }
    });
  }

  clearCart() {
    this.cartSubject.next([]);
  }
  removeItemFromCart(product: Cart): void {
    let currentPrice: number = 0;

    this.total$.subscribe((data) => (currentPrice = data));

    this.totoalSubject.next(
      currentPrice - product.product.price * product.quantity
    );
    this.products$
      .pipe(
        take(1),
        map((currentProducts: Cart[]) => {
          return currentProducts.filter(
            (cartItem) => cartItem.product.title !== product.product.title
          );
        })
      )
      .subscribe((updatedProducts) => {
        this.cartSubject.next(updatedProducts);
      });
  }

  getTotal(): Observable<number> {
    return this.total$;
  }

  getTotalProductCount(): Observable<number> {
    return this.products$.pipe(
      map((cartItems: Cart[]) => {
        return cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
      })
    );
  }

  emptyCart() {
    this.cartSubject.next([]);
    this.totoalSubject.next(0);
  }
}

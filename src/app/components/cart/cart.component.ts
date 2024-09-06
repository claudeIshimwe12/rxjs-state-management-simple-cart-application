import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.interface';
import { isEmpty, Observable, pipe } from 'rxjs';
import { Cart } from '../../models/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  @Output() onOrderConfirmation: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  cart$!: Observable<Cart[]>;
  isCartEmpty$!: Observable<boolean>;
  totalPrice$!: Observable<number>;
  numberOfProducts!: Observable<number>;

  constructor(private cartService: CartService) {
    this.cart$ = cartService.getCartProducts();
    this.isCartEmpty$ = this.cart$.pipe(isEmpty());
    this.totalPrice$ = this.cartService.getTotal();
    this.numberOfProducts = this.cartService.getTotalProductCount();
  }

  removeItem(product: Cart) {
    this.cartService.removeItemFromCart(product);
  }

  confirmOrder() {
    this.onOrderConfirmation.emit(true);
  }
  emptyCart() {
    this.cartService.clearCart();
  }
}

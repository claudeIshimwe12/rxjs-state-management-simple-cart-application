import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent {
  @Output() cartEmpty: EventEmitter<any> = new EventEmitter();
  cart$!: Observable<Cart[]>;
  totalPrice$!: Observable<number>;
  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.getCartProducts();
    this.totalPrice$ = this.cartService.getTotal();
  }

  onStartNewOrder() {
    this.cartService.emptyCart();
    this.cartEmpty.emit();
    location.reload();
  }
}

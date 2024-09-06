import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ScreenService } from '../../services/window.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  quantity: number = 1;
  screenSize!: number;

  product$!: Observable<Cart[]>;

  constructor(
    private screenService: ScreenService,
    private cartService: CartService
  ) {
    this.product$ = this.cartService.getCartProducts();
  }

  ngOnInit(): void {
    this.screenSize = this.screenService.getScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenSize = this.screenService.getScreenWidth();
  }

  onClick(product: Product) {
    this.cartService.addToCart({ product, quantity: 1 });
  }

  onQuantityIncrese(product: Product) {
    this.cartService.increaseProductQuantity(product);
    this.quantity = this.quantity + 1;
  }
  onQuantityDecrease(product: Product) {
    if (this.quantity <= 1) {
      this.cartService.removeItemFromCart({ product, quantity: 1 });
    } else {
      this.cartService.decreaseProductQuantity({ product, quantity: 1 });
      this.quantity = this.quantity - 1;
    }
  }
}

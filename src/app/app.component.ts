import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './models/product.interface';
import { Observable } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  products$!: Observable<Product[]>;
  isOrderConfirmed: boolean = false;
  constructor(
    private products: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products$ = this.products.getProducts();
  }

  handleOrderConfirmation() {
    this.isOrderConfirmed = !this.isOrderConfirmed;
  }
  placeNewOrder() {
    this.isOrderConfirmed = !this.isOrderConfirmed;
  }
}

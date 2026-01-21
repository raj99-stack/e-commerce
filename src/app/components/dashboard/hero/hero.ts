import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, MOCK_PRODUCTS } from '../../../models/product';
import { User } from '../../../models/user';
import { ProductCard } from '../product-card/product-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-page',
  imports: [CommonModule, ProductCard, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class HeroPage {
  bannerMessage: string = 'Shop The Latest Products!';
  @Input() products: Product[] = [];
  @Input() loggedInUser: User | null = null;

  @Output() cartUpdated = new EventEmitter<User>();

  searchTerm: string = '';
  sortCategory: string = '';

  onAddToCart(product: Product) {
    if (!this.loggedInUser) {
      alert('Please login first to add items to cart!');
      return;
    }

    if (this.loggedInUser.role === 'admin') {
      alert('Admins cannot add products to cart.');
      return;
    }

    if (!this.loggedInUser.cart) {
      this.loggedInUser.cart = [];
    }

    const existing = this.loggedInUser.cart.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.loggedInUser.cart.push({ ...product, quantity: 1 });
    }

    // ✅ Emit updated user back to App
    this.cartUpdated.emit(this.loggedInUser);
  }

  get filteredProducts(): Product[] {
    let result = this.products;

    // 🔍 filter by search
    if (this.searchTerm) {
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    }

    // 📂 sort by category
    if (this.sortCategory) {
      result = result.filter(
        (p) => p.category?.toLowerCase() === this.sortCategory.toLowerCase(),
      );
    }

    return result;
  }
}

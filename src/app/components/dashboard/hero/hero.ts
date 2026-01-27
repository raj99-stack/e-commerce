import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service'; // ✅ Import ProductService
import { UserService } from '../../../services/user-service'; // ✅ Import UserService
import { User } from '../../../models/user';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [CommonModule, ProductCard, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class HeroPage implements OnInit {
  
  bannerMessage: string = 'Shop The Latest Products!';
  
  // ✅ No more @Input() products! We fetch them.
  products: Product[] = [];
  
  // ✅ No more @Input() loggedInUser! We get it from Service.
  loggedInUser: User | null = null;

  searchTerm: string = '';
  sortCategory: string = '';

  constructor(
    private productService: ProductService, // ✅ Inject ProductService
    private userService: UserService,       // ✅ Inject UserService
    private router: Router
  ) {}

  ngOnInit() {
    // 1. Fetch Products
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });

    // 2. Get User from Service (Assuming your service has a method or property for this)
    // If your UserService uses an Observable/Signal, subscribe to it here.
    // For now, let's assume a method like getCurrentUser() or similar exists.
    this.loggedInUser = this.userService.loggedInUser; 
  }

  onAddToCart(product: Product) {
    if (!this.loggedInUser) {
      alert('Please login first to add items to cart!');
      this.router.navigate(['/login']); // ✅ Redirect to login via Router
      return;
    }

    if (this.loggedInUser.role === 'admin') {
      alert('Admins cannot add products to cart.');
      return;
    }

    // ✅ Move Logic: Directly call Service instead of emitting event
    this.userService.addToCart(product);
    alert("Added to Cart");
  }

  onAddToWishList(product: Product) {
    if (!this.loggedInUser) {
      alert('Please login first!');
      return;
    }
    
    // ✅ Move Logic: Directly call Service
    this.userService.addToWishlist(product);
    alert('Added to wishlist');
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
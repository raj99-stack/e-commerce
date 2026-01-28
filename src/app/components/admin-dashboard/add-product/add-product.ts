import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
 
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
})
export class AddProduct {
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: null as any,
    category: '',
    imageUrl: 'assets/image.png'
  };
 
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}
 
  onSubmit() {
    // ✅ Add product directly via service
    this.productService.addProduct(this.newProduct);
 
    alert('✅ Product has been added successfully!');
 
    // Reset form
    this.newProduct = { id: 0, name: '', description: '', price: null as any, category: '', imageUrl: 'assets/image.png' };
 
    // Redirect to product list
    this.router.navigate(['/admin/products']);
  }
}
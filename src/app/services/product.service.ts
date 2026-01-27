import { Injectable } from '@angular/core';
import { Product, MOCK_PRODUCTS } from '../models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // In a real app, this would be an HTTP call
  private products: Product[] = [...MOCK_PRODUCTS];

  constructor() { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  // Get single product by ID (we will need this for the Detail page later!)
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
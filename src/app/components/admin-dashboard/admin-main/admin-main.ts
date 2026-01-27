import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product';
import { Admin } from '../admin/admin';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewProduct } from '../view-product/view-product';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [CommonModule, FormsModule, Admin,ViewProduct],
  templateUrl: './admin-main.html',
  styleUrls: ['./admin-main.css'],
})
export class AdminMain {
  @Input() productList: Product[] = [];
  @Output() logoutEvent = new EventEmitter<void>();  // ✅ new output
  @Output() productListChange = new EventEmitter<Product[]>();
  view: string = 'home';
  currIndex: number = 0;

  ngOnChanges() {
    this.currIndex = this.productList.length + 1;
  }

  addProduct(newProduct: Product) { 
    const productWithId = { ...newProduct, id: this.currIndex }; 
    this.productList.push(productWithId); this.currIndex++; 
    console.log('Updated products:', this.productList); 
    this.productListChange.emit(this.productList); 
   }

  logout() {
    this.logoutEvent.emit();   // ✅ notify parent to log out
  }
}
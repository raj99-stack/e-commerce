import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  @Output() productAdded = new EventEmitter<Product>(); 
  newProduct: Product = { id: 0, name: '', description: '', price: 0,imageUrl:'assets/image.png'}; 
  onSubmit() 
  { 
    this.productAdded.emit(this.newProduct)
    alert('✅ Product has been added successfully!');
    this.newProduct={ id: 0, name: '', description: '', price: 0,imageUrl:'assets/image.png'};
  }; 
}

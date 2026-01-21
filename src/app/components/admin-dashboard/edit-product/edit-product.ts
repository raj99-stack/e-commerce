import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class Editproduct 
{
  @Input() productList: Product[] = []; 
  saveProduct(product: Product) 
  { 
    console.log('Product saved:', product);
  }
}

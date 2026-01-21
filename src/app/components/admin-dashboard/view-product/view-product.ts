import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
@Component({
  selector: 'app-view-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css',
})
export class ViewProduct 
{
  @Input() productList: Product[] = [];
}

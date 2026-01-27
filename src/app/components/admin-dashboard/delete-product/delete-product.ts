import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deleteproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-product.html',
  styleUrls: ['./delete-product.css'],
})
export class Deleteproduct {
  @Input() productList: Product[] = [];

  deleteProduct(i: number) {
    // Show confirmation alert
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${this.productList[i].name}"?`
    );

    if (confirmDelete) {
      this.productList.splice(i, 1);
    }
  }
}
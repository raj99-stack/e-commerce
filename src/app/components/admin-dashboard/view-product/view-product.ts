import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-product.html',
  styleUrls: ['./view-product.css'],
})
export class ViewProduct {
  @Input() productList: Product[] = [];

  searchTerm: string = '';
  sortCategory: string = '';

  // ✅ Computed filtered list
  get filteredProducts(): Product[] {
    return this.productList.filter(p => {
      const matchesSearch =
        !this.searchTerm ||
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        !this.sortCategory || p.category === this.sortCategory;

      return matchesSearch && matchesCategory;
    });
  }
}
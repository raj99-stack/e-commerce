import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.css'],
})
export class Editproduct {
  @Input() productList: Product[] = [];

  searchTerm: string = '';
  sortCategory: string = '';

  constructor(private router: Router) {}

  // ✅ Filtered list
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

  goToEdit(id: number) {
    this.router.navigate(['/admin/edit', id]); 
  }

  goToDelete(id: number) {
    this.router.navigate(['/admin/delete', id]); // routed to delete component
  }
}
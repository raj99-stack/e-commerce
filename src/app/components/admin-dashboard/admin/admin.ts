import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddProduct } from '../add-product/add-product';
import { Deleteproduct } from '../delete-product/delete-product'; 
import { Editproduct } from '../edit-product/edit-product'; 
import { ViewProduct } from '../view-product/view-product';
@Component({
  selector: 'app-admin',
  imports: [FormsModule,CommonModule,AddProduct,Deleteproduct,Editproduct,ViewProduct],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin 
{
  @Input() productList:Product[]=[];

  @Output() productAdded=new EventEmitter<Product>();

  selectedOption: 'view' | 'add' | 'edit' | 'delete' = 'view';
  showManageDropdown = false; 
  toggleManageDropdown() 
  { 
    this.showManageDropdown = !this.showManageDropdown; 
  }
}

import { Product } from './product'; // Import your existing Product interface

export enum OrderStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Returned = 'Returned',
  Fulfilled = 'Fulfilled' // ✅ NEW STATUS
}

// ... rest of the file stays the same
// 1. A single item inside an order
export interface OrderItem {
  productId: number;      // Relates to Product.id
  quantity: number;
  priceAtPurchase: number; // Price might change later, so we lock it here
}

// 2. The main Order object
export interface Order {
  id: string;             // Unique Order ID (e.g., 'ORD-001')
  userId: number;         // Relates to User.id (from user.ts)
  date: string;           // ISO Date string
  status: OrderStatus;
  items: OrderItem[];     // List of items
  totalAmount: number;    // Calculated total
  
  // Optional: We can add this property to help the UI display details easily
  // We will populate this in the Service
  productDetails?: (Product & { quantity: number; priceAtPurchase: number })[];
}
import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../models/order';
import { MOCK_PRODUCTS } from '../models/product'; 
import { CartItem } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OrderMgmt {
  
  // 1. SHARED STATE
  activeUserId: number | undefined = 1; 
  private deliveryCharge: number = 50;

  // 2. MASTER DATA (History Database)
  private orders: Order[] = [
    {
      id: 'ORD-1001',
      userId: 3, 
      date: '2026-01-15T10:00:00',
      status: OrderStatus.Delivered,
      totalAmount: 47000,
      items: [
        { productId: 2, quantity: 1, priceAtPurchase: 45000 }, 
        { productId: 1, quantity: 1, priceAtPurchase: 2000 }
      ]
    },
    {
      id: 'ORD-1002',
      userId: 3, 
      date: '2026-01-20T14:30:00',
      status: OrderStatus.Pending,
      totalAmount: 3500,
      items: [{ productId: 4, quantity: 1, priceAtPurchase: 3500 }]
    },
    {
      id: 'ORD-1003',
      userId: 1, 
      date: '2026-01-25T09:00:00',
      status: OrderStatus.Shipped,
      totalAmount: 50500,
      items: [
        { productId: 3, quantity: 1, priceAtPurchase: 50000 },
        { productId: 8, quantity: 1, priceAtPurchase: 500 }
      ]
    }
  ];

  constructor() { }

  // ==============================================================
  //  SECTION A: CART LOGIC (Updated to match OrderSummary)
  // ==============================================================

  getOriginalTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // ✅ Updated to accept 'discount' from the component
  getGrandTotal(cartItems: CartItem[], discount: number = 0): number {
    const originalTotal = this.getOriginalTotal(cartItems);
    const delivery = originalTotal > 2000 ? 0 : this.deliveryCharge;
    return originalTotal - discount + delivery;
  }

  // ✅ Added this missing method
  getTotalSavings(cartItems: CartItem[], discount: number): number {
    const originalTotal = this.getOriginalTotal(cartItems);
    const deliverySaved = originalTotal > 2000 ? this.deliveryCharge : 0;
    return discount + deliverySaved;
  }

  applyCoupon(code: string, cartItems: CartItem[]): number {
    const total = this.getOriginalTotal(cartItems);
    if (code === 'newuser') {
      return Math.floor(total * 0.1); // Returns the calculated discount
    }
    return 0;
  }

  // ✅ THE BRIDGE: Creates the order
  placeOrder(cartItems: CartItem[]) {
    // We recalculate grand total assuming no discount strictly for the record, 
    // or you could pass the final amount in if you wanted exact precision.
    // For now, this is safe:
    const finalAmount = this.getGrandTotal(cartItems, 0); 
    
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      userId: this.activeUserId || 0,
      date: new Date().toISOString(),
      status: OrderStatus.Pending,
      totalAmount: finalAmount,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        priceAtPurchase: item.price
      }))
    };

    this.orders.unshift(newOrder);
    console.log('Order Placed & Saved:', newOrder);
    alert(`Order placed! Final amount: ₹${finalAmount}`);
    cartItems.length = 0; // Clear cart
    
  }

  // ==============================================================
  //  SECTION B: MANAGEMENT LOGIC (History & Status)
  // ==============================================================

  getOrdersForUser(userId?: number): Order[] {
    const targetId = userId ?? this.activeUserId;
    if (!targetId) return [];

    const userOrders = this.orders.filter(order => order.userId === targetId);

    return userOrders.map(order => {
      this.checkAndAutoFulfill(order); 
      const enrichedItems = order.items.map(item => {
        const productInfo = MOCK_PRODUCTS.find(p => p.id === item.productId);
        if (productInfo) {
          return { 
            ...productInfo, 
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase 
          };
        }
        return null; 
      }).filter(item => item !== null) as any;

      return { ...order, productDetails: enrichedItems };
    });
  }

  getOrderById(orderId: string): Order | undefined {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return undefined;

    this.checkAndAutoFulfill(order);

    const enrichedItems = order.items.map(item => {
        const productInfo = MOCK_PRODUCTS.find(p => p.id === item.productId);
        if (productInfo) {
          return { ...productInfo, quantity: item.quantity, priceAtPurchase: item.priceAtPurchase };
        }
        return null;
    }).filter(i => i !== null) as any;

    return { ...order, productDetails: enrichedItems };
  }

  cancelOrder(orderId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order && (order.status === OrderStatus.Pending || order.status === OrderStatus.Shipped)) {
      order.status = OrderStatus.Cancelled;
    }
  }

  returnOrder(orderId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order && order.status === OrderStatus.Delivered) {
      order.status = OrderStatus.Returned;
    }
  }

  private checkAndAutoFulfill(order: Order) {
    if (order.status === OrderStatus.Delivered) {
      const orderDate = new Date(order.date);
      const today = new Date();
      const diffDays = Math.ceil(Math.abs(today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 15) order.status = OrderStatus.Fulfilled;
    }
  }

  getStats(userId?: number) {
    const myOrders = this.getOrdersForUser(userId);
    return {
      totalOrders: myOrders.length,
      totalSpent: myOrders.reduce((acc, curr) => acc + curr.totalAmount, 0),
      pendingCount: myOrders.filter(o => 
        o.status === OrderStatus.Pending || o.status === OrderStatus.Shipped
      ).length
    };
  }
}
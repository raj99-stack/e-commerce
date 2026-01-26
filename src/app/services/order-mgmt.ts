import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../models/order';
import { MOCK_PRODUCTS } from '../models/product'; 

@Injectable({
  providedIn: 'root'
})
export class OrderMgmt {
  
  // Stores the ID so the list component knows whose orders to show
  activeUserId: number | undefined;

  // Mock Data: Includes an "Old" order to test the auto-fulfilled logic
  private orders: Order[] = [
    {
      id: 'ORD-1001',
      userId: 3, // Alice
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
      userId: 3, // Alice
      date: '2026-01-20T14:30:00',
      status: OrderStatus.Pending,
      totalAmount: 3500,
      items: [{ productId: 4, quantity: 1, priceAtPurchase: 3500 }]
    },
    {
      id: 'ORD-1003',
      userId: 1, // John Doe
      date: '2026-01-25T09:00:00',
      status: OrderStatus.Delivered,
      totalAmount: 50500,
      items: [
        { productId: 3, quantity: 1, priceAtPurchase: 50000 },
        { productId: 8, quantity: 1, priceAtPurchase: 500 }
      ]
    },
    // TEST DATA: Old order (Dec 2025) -> Should auto-switch to 'Fulfilled'
    {
      id: 'ORD-OLD-999',
      userId: 3, 
      date: '2025-12-01T10:00:00', 
      status: OrderStatus.Delivered, 
      totalAmount: 2000,
      items: [{ productId: 1, quantity: 1, priceAtPurchase: 2000 }]
    }
  ];

  constructor() { }

  // ✅ HELPER: Checks dates and updates status automatically
  private checkAndAutoFulfill(order: Order) {
    if (order.status === OrderStatus.Delivered) {
      const orderDate = new Date(order.date);
      const today = new Date();
      
      // Calculate difference in days
      const diffTime = Math.abs(today.getTime() - orderDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Rule: If > 15 days, mark as Fulfilled (Return window closed)
      if (diffDays > 15) {
        order.status = OrderStatus.Fulfilled;
      }
    }
  }

  // ✅ 1. Get Orders for List (with Hydration)
  getOrdersForUser(userId?: number): Order[] {
    const targetId = userId ?? this.activeUserId;
    if (!targetId) return [];

    const userOrders = this.orders.filter(order => order.userId === targetId);

    return userOrders.map(order => {
      // Run the check before showing
      this.checkAndAutoFulfill(order);

      const enrichedItems = order.items.map(item => {
        const productInfo = MOCK_PRODUCTS.find(p => p.id === item.productId);
        
        if (productInfo) {
          return { 
            ...productInfo, 
            quantity: item.quantity,
            // ✅ FIX: Explicitly copy priceAtPurchase so HTML can read it
            priceAtPurchase: item.priceAtPurchase 
          };
        }
        return null; 
      }).filter(item => item !== null) as any;

      return { ...order, productDetails: enrichedItems };
    });
  }

  // ✅ 2. Get Single Order for Detail View
  getOrderById(orderId: string): Order | undefined {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return undefined;

    // Run the check here too
    this.checkAndAutoFulfill(order);

    const enrichedItems = order.items.map(item => {
        const productInfo = MOCK_PRODUCTS.find(p => p.id === item.productId);
        
        if (productInfo) {
          return { 
            ...productInfo, 
            quantity: item.quantity,
            // ✅ FIX: Explicitly copy priceAtPurchase
            priceAtPurchase: item.priceAtPurchase 
          };
        }
        return null;
    }).filter(i => i !== null) as any;

    return { ...order, productDetails: enrichedItems };
  }

  // ✅ 3. Action: Cancel Order (Only if Pending)
  cancelOrder(orderId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    
    // ✅ FIX: Update the check to allow 'Shipped' as well
    if (order && (order.status === OrderStatus.Pending || order.status === OrderStatus.Shipped)) {
      order.status = OrderStatus.Cancelled;
    }
  }

  // ✅ 4. Action: Return Order (Only if Delivered)
  returnOrder(orderId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    // Can only return if it's Delivered (NOT if it's already Fulfilled)
    if (order && order.status === OrderStatus.Delivered) {
      order.status = OrderStatus.Returned;
    }
  }
// ✅ NEW: Call this when the user clicks "Checkout" or "Place Order"
  placeOrder(cartItems: any[], totalAmount: number): Order {
    
    // 1. Generate a random Order ID (e.g., ORD-5921)
    const newId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

    // 2. Create the Order Object
    const newOrder: Order = {
      id: newId,
      userId: this.activeUserId || 0, // Uses the logged-in user
      date: new Date().toISOString(), // Sets "Now" as the time
      status: OrderStatus.Pending,    // Default status
      totalAmount: totalAmount,
      
      // 3. Convert Cart Items to Order Items (Clean data for DB)
      items: cartItems.map(item => ({
        productId: item.id,        // Assuming your cart item has .id
        quantity: item.quantity,
        priceAtPurchase: item.price // Store the price they paid NOW
      }))
    };

    // 4. Add to the MASTER array
    // using 'unshift' adds it to the TOP of the list (newest first)
    this.orders.unshift(newOrder);

    console.log('Order Placed Successfully:', newOrder);
    return newOrder;
  }
  // Helper for Dashboard Stats
  getStats(userId?: number) {
    const myOrders = this.getOrdersForUser(userId);
    
    return {
      totalOrders: myOrders.length,
      totalSpent: myOrders.reduce((acc, curr) => acc + curr.totalAmount, 0),
      
      // ✅ LOGIC FIX: Count both 'Pending' AND 'Shipped' as "Pending Delivery"
      pendingCount: myOrders.filter(o => 
        o.status === OrderStatus.Pending || 
        o.status === OrderStatus.Shipped
      ).length
    };
  }
}
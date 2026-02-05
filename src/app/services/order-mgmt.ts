import { Injectable } from '@angular/core';
import { Order, OrderStatus, MockOrders } from '../models/order';
import { MOCK_PRODUCTS } from '../models/product'; 
import { CartItem } from '../models/user';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class OrderMgmt {

  private deliveryCharge: number = 50;

  // 2. MASTER DATA (History Database)
  private orders: Order[] = MockOrders;

  constructor(private userService: UserService) {}

  //  CART LOGIC
  
  getOriginalTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getGrandTotal(cartItems: CartItem[], discount: number = 0): number {
    const originalTotal = this.getOriginalTotal(cartItems);
    const delivery = originalTotal > 2000 ? 0 : this.deliveryCharge;
    return originalTotal - discount + delivery;
  }

  getTotalSavings(cartItems: CartItem[], discount: number): number {
    const originalTotal = this.getOriginalTotal(cartItems);
    const deliverySaved = originalTotal > 2000 ? this.deliveryCharge : 0;
    return discount + deliverySaved;
  }

  applyCoupon(code: string, cartItems: CartItem[]): number {
    const total = this.getOriginalTotal(cartItems);
    if (code === 'newuser') {
      return Math.floor(total * 0.1);
    }
    return 0;
  }

  placeOrder(cartItems: CartItem[]) {
    const currentUser = this.userService.loggedInUser;
    if (!currentUser) {
      alert('You must be logged in to place an order.');
      return;
    }

    const finalAmount = this.getGrandTotal(cartItems, 0);

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      userId: currentUser.id,   
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
    // cartItems.length = 0;
    

  }

  // MANAGEMENT LOGIC

  getOrdersForUser(userId?: number): Order[] {
    const targetId = userId ?? this.userService.loggedInUser?.id;
    if (!targetId) {
      console.warn("getOrdersForUser called with no ID!");
      return [];
    }

    const userOrders = this.orders.filter(order => order.userId === targetId);

    return userOrders.map(order => {
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



  getStats(userId?: number) {
    const myOrders = this.getOrdersForUser(userId);
    return {
      totalOrders: myOrders.length,
      //remove total spent form order dashboard stats
      // totalSpent: myOrders.reduce((acc, curr) => acc + curr.totalAmount, 0), 
      pendingCount: myOrders.filter(o =>
        o.status === OrderStatus.Pending || o.status === OrderStatus.Shipped
      ).length
    };
  }
}

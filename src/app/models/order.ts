export enum OrderStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Returned = 'Returned',
  Fulfilled = 'Fulfilled'
}

export interface OrderItem {
  productId: number; 
  quantity: number;
  priceAtPurchase: number;
  
}

export interface Order {
  id: string;
  userId: number;
  date: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  productDetails?: any[]; 
}

export const MockOrders: Order[] = [
    {
      id: 'ORD-1004',
      userId: 2,
      date: '2026-01-22T10:00:00',
      status: OrderStatus.Delivered,
      totalAmount: 2000,
      items: [
        { productId: 1, quantity: 1, priceAtPurchase: 2000 }
      ]
    },
    {
      id: 'ORD-1005',
      userId: 2,
      date: '2026-01-26T14:30:00',
      status: OrderStatus.Pending,
      totalAmount: 45000,
      items: [
        { productId: 2, quantity: 1, priceAtPurchase: 45000 }
      ]
    },
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
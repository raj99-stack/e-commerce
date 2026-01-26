export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface User { 
  id: number; 
  name: string; 
  email: string; 
  password: string; 
  shippingAddress?: string; 
  paymentDetails?: string; 
  cart: CartItem[];        // ✅ required
  wishlist: CartItem[];    // ✅ required
  role: 'user' | 'admin'; 
}



export const MOCK_USERS: User[] = [
  {
    id: 0,
    name: 'System Admin',
    email: 'admin@example.com',
    password: 'Admin1234@',
    role: 'admin',
    cart: [],        // ✅ empty array
    wishlist: []     // ✅ empty array
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'John1234@',
    shippingAddress: '123 Street, City',
    paymentDetails: 'Visa **** 1234',
    cart: [],
    wishlist: [
      ],
    role: 'user'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'abcd',
    shippingAddress: '456 Avenue, City',
    paymentDetails: 'Mastercard **** 5678',
    cart: [],
    wishlist: [],
    role: 'user'
  },
  {
    id: 3,
    name: 'Alice',
    email: 'alice@example.com',
    password: 'Alic1234@',
    shippingAddress: '789 Road, City',
    paymentDetails: 'UPI alice@upi',
    cart: [],
    wishlist: [
      ],
    role: 'user'
  },
];

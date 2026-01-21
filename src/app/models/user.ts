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
    cart: [
      { id: 101, name: 'Laptop', price: 50000, quantity: 1 },
      { id: 102, name: 'Headphones', price: 2000, quantity: 2 },
    ],
    wishlist: [
      { id: 201, name: 'Keyboard', price: 1500, quantity: 1 },
      { id: 202, name: 'Mousepad', price: 500, quantity: 1 },
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
    cart: [{ id: 103, name: 'Smartphone', price: 30000, quantity: 1 }],
    wishlist: [{ id: 203, name: 'Smartwatch', price: 8000, quantity: 1 }],
    role: 'user'
  },
  {
    id: 3,
    name: 'Alice',
    email: 'alice@example.com',
    password: 'alicepw',
    shippingAddress: '789 Road, City',
    paymentDetails: 'UPI alice@upi',
    cart: [
      { id: 1314, name: 'PC', price: 5000, quantity: 1 },
      { id: 1245, name: 'TV', price: 2000, quantity: 2 },
    ],
    wishlist: [
      { id: 204, name: 'Gaming Chair', price: 7000, quantity: 1 },
      { id: 205, name: 'Speakers', price: 2500, quantity: 1 },
      { id: 1245, name: 'TV', price: 2000, quantity: 2 },
    ],
    role: 'user'
  },
];

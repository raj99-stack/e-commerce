export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling over-ear headphones with 40-hour battery life.',
    price: 2000,
    imageUrl: './assets/image.png', 
    category: 'Electronics',
  },

  {
    id: 2,
    name: 'Smartphone',
    description:
      'Latest flagship Android smartphone with 120Hz AMOLED display and pro-grade camera.',
    price: 45000,
    imageUrl: './assets/image.png',
    category: 'Mobiles',
  },
  {
    id: 3,
    name: 'Gaming Laptop',
    description: 'High-performance laptop featuring an RTX 4060 and 16GB RAM for seamless gaming.',
    price: 85000,
    imageUrl: './assets/image.png',
    category: 'Computers',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile blue switches.',
    price: 3500,
    imageUrl: './assets/image.png',
    category: 'Accessories',
  },
  {
    id: 5,
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitoring, GPS, and water resistance.',
    price: 12000,
    imageUrl: './assets/image.png',
    category: 'Wearables',
  },
  {
    id: 6,
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with deep bass and 360-degree sound.',
    price: 2500,
    imageUrl: './assets/image.png',
    category: 'Electronics',
  },
  {
    id: 7,
    name: '4K Ultra HD Monitor',
    description: '27-inch IPS panel with color accuracy perfect for designers.',
    price: 28000,
    imageUrl: './assets/image.png',
    category: 'Computers',
  },
  {
    id: 8,
    name: 'USB-C Hub Adapter',
    description: '7-in-1 multi-port adapter with HDMI, USB 3.0, and SD card reader.',
    price: 1500,
    imageUrl: './assets/image.png',
    category: 'Accessories',
  },
];

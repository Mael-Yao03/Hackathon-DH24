export interface Product {
  id: string;
  name: string;
  expiryDate: string;
  stock: number;
  category: string;
  price: number;
  supplier: string;
  location: string;
  threshold: number;
}

export interface Pharmacy {
  id: string;
  name: string;
  location: string;
  inventory: Product[];
}

export interface InventoryAlert {
  id: string;
  type: 'expiry' | 'stock' | 'price';
  message: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  read: boolean;
  product: {
    id: string;
    name: string;
    currentStock: number;
    threshold: number;
  };
}
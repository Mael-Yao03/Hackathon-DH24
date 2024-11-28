export interface Product {
  id: string;
  name: string;
  expiryDate: string;
  stock: number;
  category: string;
  price: number;
  supplier: string;
  location: string;
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
}
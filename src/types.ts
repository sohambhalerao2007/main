export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'ta';

export type NavTab = 'overview' | 'explain' | 'billing' | 'pyr' | 'network' | 'roi' | 'pricing';

export interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  sold: number;
  price: number;
  expiryHours: number;
  category: 'Breads' | 'Viennoiserie' | 'Confectionery' | 'Savory' | 'Dairy';
  skuCode: string;
}

export interface PyrRow {
  id: string;
  sku: string;
  season: string;
  pyrDemand: number;
  prepared: number;
  sold: number;
  expiry: number;
  basePrice: number;
  bid: number;
}

export interface ConsumerBid {
  id: string;
  consumer: string;
  item: string;
  qty: number;
  bid: number;
  status: 'Active' | 'Accepted' | 'Fulfilled';
  distanceKm: number;
  timestamp: string;
}

export interface BillRecord {
  id: string;
  time: string;
  items: string;
  itemCount: number;
  mode: 'UPI' | 'Cash' | 'Card';
  total: number;
  cashierName: string;
}

export interface PickupToken {
  id: string;
  item: string;
  qty: number;
  amount: number;
  consumer: string;
  code: string;
  time: string;
}

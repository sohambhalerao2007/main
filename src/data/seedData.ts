import { InventoryItem, PyrRow, ConsumerBid, BillRecord } from '../types';

export const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: 'Artisan Country Sourdough (750g)',
    stock: 24,
    sold: 15,
    price: 160,
    expiryHours: 5,
    category: 'Breads',
    skuCode: 'BRD-SD-01'
  },
  {
    id: 2,
    name: 'Butter Pain au Chocolat (Flaky)',
    stock: 30,
    sold: 21,
    price: 130,
    expiryHours: 3,
    category: 'Viennoiserie',
    skuCode: 'VNN-PC-02'
  },
  {
    id: 3,
    name: 'Dark Hazelnut Brownie Square',
    stock: 18,
    sold: 14,
    price: 180,
    expiryHours: 7,
    category: 'Confectionery',
    skuCode: 'CNF-HB-03'
  },
  {
    id: 4,
    name: 'Smoked Cheese & Jalapeño Focaccia',
    stock: 16,
    sold: 9,
    price: 150,
    expiryHours: 4,
    category: 'Savory',
    skuCode: 'SAV-FC-04'
  },
  {
    id: 5,
    name: 'Farm Fresh Whole Milk Pouch (1L)',
    stock: 40,
    sold: 28,
    price: 72,
    expiryHours: 11,
    category: 'Dairy',
    skuCode: 'DRY-MK-05'
  },
  {
    id: 6,
    name: 'Almond Frangipane Tartlet',
    stock: 12,
    sold: 7,
    price: 195,
    expiryHours: 4,
    category: 'Viennoiserie',
    skuCode: 'VNN-AT-06'
  }
];

export const initialPyrRows: PyrRow[] = [
  {
    id: 'pyr-1',
    sku: 'Country Sourdough (750g)',
    season: 'Autumn Baseline',
    pyrDemand: 26,
    prepared: 24,
    sold: 15,
    expiry: 5,
    basePrice: 160,
    bid: 135
  },
  {
    id: 'pyr-2',
    sku: 'Pain au Chocolat',
    season: 'Rainy Afternoon Dip',
    pyrDemand: 32,
    prepared: 30,
    sold: 21,
    expiry: 3,
    basePrice: 130,
    bid: 100
  },
  {
    id: 'pyr-3',
    sku: 'Hazelnut Brownies',
    season: 'All Seasons Steady',
    pyrDemand: 18,
    prepared: 18,
    sold: 14,
    expiry: 7,
    basePrice: 180,
    bid: 150
  },
  {
    id: 'pyr-4',
    sku: 'Jalapeño Focaccia',
    season: 'Lunch Rush High',
    pyrDemand: 16,
    prepared: 16,
    sold: 9,
    expiry: 4,
    basePrice: 150,
    bid: 120
  },
  {
    id: 'pyr-5',
    sku: 'Whole Milk Pouches',
    season: 'Morning Breakfast',
    pyrDemand: 42,
    prepared: 40,
    sold: 28,
    expiry: 11,
    basePrice: 72,
    bid: 65
  }
];

export const initialConsumerBids: ConsumerBid[] = [
  {
    id: 'BID-401',
    consumer: 'Ananya Sharma',
    item: 'Artisan Country Sourdough (750g)',
    qty: 2,
    bid: 130,
    status: 'Active',
    distanceKm: 0.6,
    timestamp: '10 mins ago'
  },
  {
    id: 'BID-402',
    consumer: 'Vikram Mehta',
    item: 'Butter Pain au Chocolat (Flaky)',
    qty: 3,
    bid: 95,
    status: 'Active',
    distanceKm: 1.2,
    timestamp: '18 mins ago'
  },
  {
    id: 'BID-403',
    consumer: 'Sneha Patel',
    item: 'Smoked Cheese & Jalapeño Focaccia',
    qty: 2,
    bid: 115,
    status: 'Active',
    distanceKm: 0.9,
    timestamp: '25 mins ago'
  },
  {
    id: 'BID-404',
    consumer: 'Kabir Verma',
    item: 'Almond Frangipane Tartlet',
    qty: 2,
    bid: 145,
    status: 'Active',
    distanceKm: 1.5,
    timestamp: '32 mins ago'
  }
];

export const initialBillsLog: BillRecord[] = [
  {
    id: 'TXN-9081',
    time: '02:15 PM',
    items: '2x Pain au Chocolat, 1x Hazelnut Brownie',
    itemCount: 3,
    mode: 'UPI',
    total: 395,
    cashierName: 'Counter 1'
  },
  {
    id: 'TXN-9080',
    time: '01:48 PM',
    items: '1x Country Sourdough, 2x Fresh Milk',
    itemCount: 3,
    mode: 'Cash',
    total: 304,
    cashierName: 'Counter 1'
  },
  {
    id: 'TXN-9079',
    time: '01:10 PM',
    items: '2x Jalapeño Focaccia',
    itemCount: 2,
    mode: 'UPI',
    total: 300,
    cashierName: 'Counter 2'
  },
  {
    id: 'TXN-9078',
    time: '12:25 PM',
    items: '3x Pain au Chocolat, 1x Almond Tartlet',
    itemCount: 4,
    mode: 'Card',
    total: 585,
    cashierName: 'Counter 1'
  }
];

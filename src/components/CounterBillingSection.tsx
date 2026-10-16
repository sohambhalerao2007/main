import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Clock, 
  Zap, 
  Printer, 
  CheckCircle, 
  AlertCircle, 
  QrCode, 
  CreditCard, 
  Coins, 
  TrendingUp, 
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';
import { InventoryItem, BillRecord } from '../types';
import { calculateDynamicPrice, assessSurplusRisk } from '../utils/rules';

interface CounterBillingSectionProps {
  inventory: InventoryItem[];
  billsLog: BillRecord[];
  onCompleteBill: (cart: Record<number, number>, mode: 'UPI' | 'Cash' | 'Card', printReceipt: boolean) => void;
  onOpenAddBatchModal: () => void;
  onTriggerQuickClearance: (itemId: number) => void;
  shiftHour: number;
  onChangeShiftHour: (hour: number) => void;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const Money: React.FC<{ amount: number | string; className?: string }> = ({ amount, className }) => (
  <span className={className}>
    <span className="currency-sym">₹</span>
    {typeof amount === 'number' ? amount.toLocaleString('en-IN') : amount}
  </span>
);

export const CounterBillingSection: React.FC<CounterBillingSectionProps> = ({
  inventory,
  billsLog,
  onCompleteBill,
  onOpenAddBatchModal,
  onTriggerQuickClearance,
  shiftHour,
  onChangeShiftHour,
  onOpenCopilotWithPrompt
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Cash' | 'Card'>('UPI');
  const [showUpiQr, setShowUpiQr] = useState<boolean>(false);

  const categories = ['All', 'Breads', 'Viennoiserie', 'Confectionery', 'Savory', 'Dairy'];

  // Filter items
  const filteredItems = inventory.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.skuCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate cart total
  const cartTotal = Object.entries(cart).reduce((sum, [idStr, qty]) => {
    const item = inventory.find(i => i.id === Number(idStr));
    if (!item || qty <= 0) return sum;
    const dynPrice = calculateDynamicPrice(item.price, item.expiryHours, Math.max(0, item.stock - item.sold));
    return sum + (dynPrice * qty);
  }, 0);

  const cartItemCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  // Cart operations
  const updateCartQty = (id: number, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      const item = inventory.find(i => i.id === id);
      const available = item ? item.stock - item.sold : 999;

      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: Math.min(next, available) };
    });
  };

  const clearCart = () => setCart({});

  // Summary Metrics
  const atRiskTotal = inventory.reduce((acc, item) => {
    const remaining = Math.max(0, item.stock - item.sold);
    const risk = assessSurplusRisk(item.stock, item.sold, item.expiryHours);
    return acc + (risk.surplusUnits * item.price);
  }, 0);

  const recoverableCash = Math.round(atRiskTotal * 0.77);
  const totalBilledToday = billsLog.reduce((acc, b) => acc + b.total, 4850);

  // Handle Checkout
  const handleCheckout = (printReceipt: boolean) => {
    if (cartItemCount === 0) return;
    onCompleteBill(cart, paymentMode, printReceipt);
    setCart({});
  };

  // Clock display format
  const formatHour = (h: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:00 ${ampm}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">Seller Hub & Direct Counter Billing</h2>
            <span className="px-2 py-0.5 rounded bg-purple-950/80 text-fuchsia-300 border border-purple-700/60 text-[10px] font-bold">
              Fast POS Sync
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ring up daily counter sales in 2 taps. Automatically tracks inventory velocity, dynamic clearance markdowns, and saved food cash.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAddBatchModal}
            className="px-3.5 py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Add Morning Batch</span>
          </button>
          
          <button
            onClick={() => onOpenCopilotWithPrompt("Analyze today's inventory velocity and advise 4 PM dynamic markdown strategy.")}
            className="btn-foursight px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Shift Advisory</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Banners */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 hover:border-purple-800/40 transition-colors">
          <div className="text-slate-400 text-xs font-medium">At-Risk Surplus Today</div>
          <div className="mt-2 text-2xl font-heading font-bold text-amber-400 font-mono-num"><Money amount={atRiskTotal} /></div>
          <div className="mt-1 text-[11px] text-slate-500">Unsold items before evening shift</div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 hover:border-purple-800/40 transition-colors">
          <div className="text-slate-400 text-xs font-medium">Recoverable Cash</div>
          <div className="mt-2 text-2xl font-heading font-bold text-fuchsia-400 font-mono-num"><Money amount={recoverableCash} /></div>
          <div className="mt-1 text-[11px] text-purple-300 font-medium">77% recovery via 4 PM bundles</div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 hover:border-purple-800/40 transition-colors">
          <div className="text-slate-400 text-xs font-medium">Billed Today (Auto-Tracked)</div>
          <div className="mt-2 text-2xl font-heading font-bold text-white font-mono-num"><Money amount={totalBilledToday} /></div>
          <div className="mt-1 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <Zap className="w-3 h-3" /> Live Counter Feed
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 hover:border-purple-800/40 transition-colors">
          <div className="text-slate-400 text-xs font-medium">MTD Food Diverted & Salvaged</div>
          <div className="mt-2 text-2xl font-heading font-bold text-emerald-400 font-mono-num"><Money amount={14350} /></div>
          <div className="mt-1 text-[11px] text-slate-500">48.2 Kg food prevented from landfill</div>
        </div>
      </div>

      {/* Main 2-Column Split: Left = Fast POS Terminal, Right = Surplus Engine & Shift Simulation */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Fast POS Counter Billing (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-fuchsia-400" />
                <span>Fast Counter POS Terminal</span>
              </h3>
              <p className="text-xs text-slate-400">Tap items to ring up customer order.</p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search SKU or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131c31] border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none" tabIndex={0} aria-label="Product categories">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-900/80 text-fuchsia-200 border border-purple-600/60 font-semibold'
                    : 'bg-[#131c31] text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredItems.map(item => {
              const remaining = item.stock - item.sold;
              const isOut = remaining <= 0;
              const dynPrice = calculateDynamicPrice(item.price, item.expiryHours, remaining);
              const isDiscounted = dynPrice < item.price;
              const inCartQty = cart[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    inCartQty > 0
                      ? 'bg-purple-950/30 border-purple-500/60 shadow-sm'
                      : 'bg-[#131c31] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white leading-tight">{item.name}</h4>
                      <span className="text-[10px] font-mono-num text-slate-400 shrink-0">{item.skuCode}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-slate-400">Stock:</span>
                      <span className={`text-xs font-bold font-mono-num ${isOut ? 'text-rose-400' : 'text-slate-200'}`}>
                        {isOut ? 'Sold Out' : `${remaining} left`}
                      </span>
                      {isDiscounted && (
                        <span className="px-1.5 py-0.2 rounded bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-700 text-[10px] font-bold">
                          Flash Deal
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-fuchsia-400 font-mono-num">₹{dynPrice}</span>
                      {isDiscounted && (
                        <span className="text-[10px] text-slate-500 line-through ml-1.5 font-mono-num">₹{item.price}</span>
                      )}
                    </div>

                    {isOut ? (
                      <span className="text-[10px] text-slate-500 italic">None left</span>
                    ) : inCartQty > 0 ? (
                      <div className="flex items-center gap-1.5 bg-[#0f172a] rounded-lg p-0.5 border border-purple-800/60">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-6 h-6 rounded bg-slate-800 text-white font-bold text-xs flex items-center justify-center hover:bg-slate-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-white font-mono-num">{inCartQty}</span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-6 h-6 rounded btn-foursight text-white font-bold text-xs flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-fuchsia-200 text-xs font-semibold border border-purple-700/60 flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Tender Summary */}
          <div className="pt-4 border-t border-slate-800 space-y-4 bg-[#050508]/60 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Cart Items ({cartItemCount} items):
              </span>
              {cartItemCount > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {/* Payment Mode Selector */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-slate-400">Payment Tender:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => { setPaymentMode('UPI'); setShowUpiQr(true); }}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    paymentMode === 'UPI'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-[#131c31] text-slate-300 hover:text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>UPI / QR</span>
                </button>

                <button
                  onClick={() => { setPaymentMode('Cash'); setShowUpiQr(false); }}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    paymentMode === 'Cash'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-[#131c31] text-slate-300 hover:text-white'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Cash</span>
                </button>

                <button
                  onClick={() => { setPaymentMode('Card'); setShowUpiQr(false); }}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    paymentMode === 'Card'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-[#131c31] text-slate-300 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
              </div>
            </div>

            {/* Bill Total Display */}
            <div className="flex items-center justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
              <span className="text-sm text-slate-300">Total Tender:</span>
              <span className="text-2xl text-fuchsia-400 font-mono-num font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                disabled={cartItemCount === 0}
                onClick={() => handleCheckout(false)}
                className="btn-foursight py-3 rounded-xl text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Complete Bill & Sync</span>
              </button>

              <button
                disabled={cartItemCount === 0}
                onClick={() => handleCheckout(true)}
                className="py-3 rounded-xl bg-[#131c31] hover:bg-slate-800 border border-purple-800/60 text-slate-200 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-fuchsia-400" />
                <span>Bill + Print Receipt</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Surplus Watchlist, Clock & Bills Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Shift Time Machine Slider */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Shift Time Simulator
                </span>
                <p className="text-[11px] text-slate-400">Slide hour to watch clearance markdowns trigger</p>
              </div>
              <div className="text-base font-bold text-fuchsia-400 font-mono-num bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-700/60">
                {formatHour(shiftHour)}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono-num">
                <span>08:00 AM (Open)</span>
                <span>02:00 PM (Mid)</span>
                <span>09:00 PM (Close)</span>
              </div>
              <input
                type="range"
                min="8"
                max="21"
                step="1"
                value={shiftHour}
                onChange={(e) => onChangeShiftHour(Number(e.target.value))}
                className="w-full accent-fuchsia-500 cursor-pointer"
                aria-label="Shift Hour Simulator"
              />
            </div>
          </div>

          {/* Surplus Watchlist Table */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                Surplus Watchlist & Markdown Matrix
              </h3>
              <span className="text-[10px] text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                Auto-Updating
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131c31] text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2 font-medium">SKU</th>
                    <th className="p-2 font-medium">Risk Status</th>
                    <th className="p-2 font-medium">Clearance ₹</th>
                    <th className="p-2 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {inventory.map(item => {
                    const remaining = Math.max(0, item.stock - item.sold);
                    const risk = assessSurplusRisk(item.stock, item.sold, item.expiryHours);
                    const dynPrice = calculateDynamicPrice(item.price, item.expiryHours, remaining);

                    const badgeColors = {
                      safe: 'bg-emerald-950 text-emerald-400 border-emerald-800',
                      moderate: 'bg-amber-950 text-amber-300 border-amber-800',
                      high: 'bg-orange-950 text-orange-400 border-orange-800',
                      critical: 'bg-rose-950 text-rose-300 border-rose-800'
                    };

                    return (
                      <tr key={item.id} className="hover:bg-slate-900/50">
                        <td className="p-2">
                          <div className="font-bold text-white leading-tight">{item.name}</div>
                          <div className="text-[10px] text-slate-400">{remaining} left • {item.expiryHours}h shelf</div>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeColors[risk.riskLevel]}`}>
                            {risk.riskLevel.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-2 font-mono-num">
                          <span className="font-bold text-fuchsia-400">₹{dynPrice}</span>
                          {dynPrice < item.price && (
                            <span className="text-[10px] text-slate-500 line-through ml-1">₹{item.price}</span>
                          )}
                        </td>
                        <td className="p-2 text-right">
                          <button
                            onClick={() => onTriggerQuickClearance(item.id)}
                            className="px-2 py-1 rounded bg-purple-950 hover:bg-purple-900 text-fuchsia-300 border border-purple-700/60 text-[10px] font-semibold transition-colors"
                          >
                            Flash Bundle
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Today's Transactions Log */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Today's Counter Bills Log</span>
              </h3>
              <span className="text-[10px] text-slate-400">{billsLog.length} orders</span>
            </div>

            <div className="overflow-x-auto max-h-56 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131c31] text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2 font-medium">Time</th>
                    <th className="p-2 font-medium">Items Billed</th>
                    <th className="p-2 font-medium">Mode</th>
                    <th className="p-2 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {billsLog.map(bill => (
                    <tr key={bill.id} className="hover:bg-slate-900/50">
                      <td className="p-2 text-slate-400 font-mono-num">{bill.time}</td>
                      <td className="p-2 text-slate-200 font-medium max-w-[140px] truncate" title={bill.items}>
                        {bill.items}
                      </td>
                      <td className="p-2">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                          {bill.mode}
                        </span>
                      </td>
                      <td className="p-2 text-right font-bold text-fuchsia-400 font-mono-num">
                        ₹{bill.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7-Day Waste Prevented vs Discarded Chart Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>7-Day Yield: Salvaged vs Discarded</span>
                </h3>
                <p className="text-[11px] text-slate-400">Actual rupees saved through dynamic clearance</p>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-fuchsia-500 inline-block" />
                  <span className="text-slate-300">Salvaged (₹)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-700 inline-block" />
                  <span className="text-slate-400">Discarded (₹)</span>
                </div>
              </div>
            </div>

            {/* Responsive Pure SVG Bar Chart */}
            <div className="pt-2">
              <div className="grid grid-cols-7 gap-2 items-end h-36 border-b border-slate-800 pb-2">
                {[
                  { day: 'Wed', salvaged: 1950, loss: 400 },
                  { day: 'Thu', salvaged: 2100, loss: 350 },
                  { day: 'Fri', salvaged: 2450, loss: 420 },
                  { day: 'Sat', salvaged: 2800, loss: 500 },
                  { day: 'Sun', salvaged: 2600, loss: 480 },
                  { day: 'Mon', salvaged: 1100, loss: 250 },
                  { day: 'Today', salvaged: 1420, loss: 420 }
                ].map((d, i) => {
                  const maxVal = 3200;
                  const salvagedH = Math.round((d.salvaged / maxVal) * 110);
                  const lossH = Math.round((d.loss / maxVal) * 110);

                  return (
                    <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
                      <div className="text-[9px] text-fuchsia-300 font-mono-num opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{d.salvaged}
                      </div>
                      <div className="w-full max-w-[28px] flex items-end justify-center gap-1">
                        <div
                          style={{ height: `${salvagedH}px` }}
                          className="w-3 rounded-t-md bg-gradient-to-t from-purple-700 to-fuchsia-400 group-hover:brightness-110 transition-all"
                          title={`Salvaged: ₹${d.salvaged}`}
                        />
                        <div
                          style={{ height: `${lossH}px` }}
                          className="w-2.5 rounded-t bg-slate-700 group-hover:bg-slate-600 transition-all"
                          title={`Discarded loss: ₹${d.loss}`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{d.day}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2">
                <span>Total 7-Day Salvage: <strong className="text-emerald-400">₹14,420</strong></span>
                <span className="text-purple-300">Recovery Rate: <strong>81.4%</strong></span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

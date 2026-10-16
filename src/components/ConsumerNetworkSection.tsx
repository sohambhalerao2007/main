import React, { useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Send, 
  QrCode, 
  Sparkles, 
  HelpCircle,
  Share2,
  Ticket
} from 'lucide-react';
import { ConsumerBid, PickupToken } from '../types';

interface ConsumerNetworkSectionProps {
  bids: ConsumerBid[];
  onAddBid: (newBid: Omit<ConsumerBid, 'id' | 'status' | 'timestamp'>) => void;
  onAcceptBid: (bidId: string) => void;
  pickupTokens: PickupToken[];
  onOpenCopilotWithPrompt: (prompt: string) => void;
  onShowToast: (msg: string) => void;
}

export const ConsumerNetworkSection: React.FC<ConsumerNetworkSectionProps> = ({
  bids,
  onAddBid,
  onAcceptBid,
  pickupTokens,
  onOpenCopilotWithPrompt,
  onShowToast
}) => {
  const [consumerName, setConsumerName] = useState('Local Neighbor');
  const [itemName, setItemName] = useState('Artisan Country Sourdough (750g)');
  const [qty, setQty] = useState(2);
  const [bidPrice, setBidPrice] = useState(130);
  const [distanceKm, setDistanceKm] = useState(0.8);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || qty <= 0 || bidPrice <= 0) return;

    onAddBid({
      consumer: consumerName,
      item: itemName,
      qty,
      bid: bidPrice,
      distanceKm
    });

    onShowToast(`Broadcasted fair-price bid for ${qty}x ${itemName} at ₹${bidPrice}!`);
    setItemName('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">Consumer Demand & Fair-Price Network</h2>
            <span className="px-2 py-0.5 rounded bg-purple-950/80 text-fuchsia-300 border border-purple-700/60 text-[10px] font-bold">
              Neighborhood Match
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connect local food lovers directly with store surplus. Consumers submit fair-price bids; stores clear inventory before closing.
          </p>
        </div>

        <button
          onClick={() => onOpenCopilotWithPrompt("How can local stores use WhatsApp broadcast lists to alert consumers about evening surplus deals?")}
          className="btn-foursight px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>WhatsApp Broadcast Playbook</span>
        </button>
      </div>

      {/* Explainer Box */}
      <div className="bg-[#131c31] border border-purple-800/40 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-purple-500/20 text-fuchsia-400 shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">How the Fair-Price Network Works</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Instead of throwing unsold items into dumpsters, store managers open the bid feed at 4 PM. When an incoming bid matches evening surplus, the store accepts it with 1 click. A digital pickup token is generated instantly, and the buyer arrives before closing time to pay and collect.
          </p>
        </div>
      </div>

      {/* 2-Column Grid: Left = Submit Bid Form, Right = Live Bids Feed */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Submit Consumer Fair-Price Request (5 cols) */}
        <div className="lg:col-span-5 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Neighborhood Buyer Interface</span>
            <h3 className="text-sm font-heading font-bold text-white mt-0.5">Submit Fair-Price Surplus Request</h3>
            <p className="text-xs text-slate-400 mt-1">Tell nearby bakeries and food counters what you want to buy today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Your Name / Alias</label>
              <input
                type="text"
                value={consumerName}
                onChange={(e) => setConsumerName(e.target.value)}
                required
                className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Item Requested</label>
              <input
                type="text"
                placeholder="e.g. Sourdough Loaf, Bagels, Croissants"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  required
                  className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono-num focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Fair Bid (₹/unit)</label>
                <input
                  type="number"
                  min="10"
                  value={bidPrice}
                  onChange={(e) => setBidPrice(Number(e.target.value))}
                  required
                  className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-fuchsia-400 font-bold font-mono-num focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Pickup Distance Range: {distanceKm} km</label>
              <input
                type="range"
                min="0.2"
                max="5.0"
                step="0.2"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-fuchsia-500 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="btn-foursight w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 mt-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Bid to Local Sellers</span>
            </button>
          </form>
        </div>

        {/* RIGHT: Live Neighborhood Bid Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                  Live Neighborhood Bid Feed
                </h3>
                <p className="text-xs text-slate-400">Incoming consumer requests ready for 1-click clearance acceptance.</p>
              </div>
              <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                {bids.filter(b => b.status === 'Active').length} Active
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {bids.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No active bids in this radius. Use the form on the left to submit a request.
                </div>
              ) : (
                bids.map((bid) => (
                  <div
                    key={bid.id}
                    className="p-3.5 rounded-xl bg-[#131c31] border border-slate-800 hover:border-purple-800/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{bid.item}</span>
                        <span className="text-[10px] bg-purple-950/80 text-fuchsia-300 px-1.5 py-0.2 rounded font-mono-num font-semibold">
                          x{bid.qty}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span>{bid.consumer}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-400" /> {bid.distanceKm} km
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {bid.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Offered Price:</div>
                        <div className="text-sm font-bold text-fuchsia-400 font-mono-num">
                          ₹{bid.bid * bid.qty} <span className="text-[10px] font-normal text-slate-400">(₹{bid.bid}/ea)</span>
                        </div>
                      </div>

                      {bid.status === 'Active' ? (
                        <button
                          onClick={() => onAcceptBid(bid.id)}
                          className="btn-foursight px-3 py-1.5 rounded-lg text-xs font-bold text-white shrink-0 shadow-sm"
                        >
                          Accept & Issue Token
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-400 font-semibold px-2 py-1 rounded bg-emerald-950/60 border border-emerald-800/40">
                          Matched ✓
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Matched Pickup Tokens */}
          {pickupTokens.length > 0 && (
            <div className="bg-[#0f172a] border border-purple-800/50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>Active Customer Pickup Tokens</span>
                </h4>
                <span className="text-[10px] text-emerald-400 font-semibold">Store Ready</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {pickupTokens.map(token => (
                  <div key={token.id} className="p-3 bg-[#131c31] border border-purple-800/40 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{token.consumer}</span>
                      <span className="font-mono-num font-bold text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-700">
                        {token.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {token.qty}x {token.item} • <span className="font-bold text-fuchsia-400">₹{token.amount}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 flex justify-between items-center pt-1 border-t border-slate-800">
                      <span>Issued: {token.time}</span>
                      <span className="text-emerald-400 font-medium">Ready for collection</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

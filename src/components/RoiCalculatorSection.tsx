import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateRoiSalvage } from '../utils/rules';

interface RoiCalculatorSectionProps {
  onSelectPlan: (plan: string) => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({ onSelectPlan }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(150000);
  const [wasteRate, setWasteRate] = useState<number>(10);
  const [planTier, setPlanTier] = useState<'basic' | 'pro'>('basic');

  const planCost = planTier === 'basic' ? 250 : 600;
  const roi = calculateRoiSalvage(monthlyRevenue, wasteRate, planCost, 75);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">Interactive Food Waste ROI Calculator</h2>
          <span className="px-2 py-0.5 rounded bg-purple-950/80 text-fuchsia-300 border border-purple-700/60 text-[10px] font-bold">
            Guaranteed Math
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Adjust the sliders below to see your counter's exact monthly waste loss and how much cash 4OURSIGHT salvages.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Input Panel (6 cols) */}
        <div className="lg:col-span-6 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* Slider 1: Monthly Turnover */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Monthly Counter Turnover:</span>
              <span className="text-white font-mono-num font-bold text-base bg-[#131c31] px-3 py-1 rounded-lg border border-slate-700">
                ₹{monthlyRevenue.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="25000"
              max="1000000"
              step="5000"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full accent-fuchsia-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono-num">
              <span>₹25,000 (Small Kiosk)</span>
              <span>₹2,50,000 (Artisan Bakery)</span>
              <span>₹10,00,000+ (Busy Outlet)</span>
            </div>
          </div>

          {/* Slider 2: Estimated Waste Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Typical Unsold Food Loss:</span>
              <span className="text-amber-400 font-mono-num font-bold text-base bg-[#131c31] px-3 py-1 rounded-lg border border-slate-700">
                {wasteRate}% of daily stock
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="25"
              step="1"
              value={wasteRate}
              onChange={(e) => setWasteRate(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono-num">
              <span>3% (Very tight)</span>
              <span>10% (UNEP average)</span>
              <span>25% (High perishability)</span>
            </div>
          </div>

          {/* Plan Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-300 font-semibold block">Select 4OURSIGHT Plan:</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPlanTier('basic')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  planTier === 'basic'
                    ? 'bg-purple-950/60 border-purple-500 text-white'
                    : 'bg-[#131c31] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">Basic Plan</div>
                <div className="text-sm font-mono-num font-bold text-fuchsia-400 mt-1">₹250 / mo</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Single store dashboard</div>
              </button>

              <button
                onClick={() => setPlanTier('pro')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  planTier === 'pro'
                    ? 'bg-purple-950/60 border-purple-500 text-white'
                    : 'bg-[#131c31] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">Pro Plan</div>
                <div className="text-sm font-mono-num font-bold text-fuchsia-400 mt-1">₹600 / mo</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Multi-batch & bulk connect</div>
              </button>
            </div>
          </div>

        </div>

        {/* Results Card (6 cols) */}
        <div className="lg:col-span-6 bg-[#150a2a] border-2 border-purple-500/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-purple-950/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Monthly Projection</span>
            <h3 className="text-2xl font-heading font-bold text-white mt-1">
              Your Net Cash Gain with 4OURSIGHT
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0f172a]/90 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Monthly Food Dumped:</span>
              <div className="text-xl font-bold text-rose-400 font-mono-num mt-1">
                -₹{roi.monthlyWastedRupees.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-500">Currently thrown away</span>
            </div>

            <div className="bg-[#0f172a]/90 p-4 rounded-xl border border-purple-800/60">
              <span className="text-[11px] text-purple-300">Cash Salvaged (75%):</span>
              <div className="text-xl font-bold text-fuchsia-400 font-mono-num mt-1">
                +₹{roi.monthlySalvagedRupees.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-400">Via dynamic clearance</span>
            </div>
          </div>

          {/* Grand Net Box */}
          <div className="bg-[#050508]/80 p-5 rounded-2xl border border-purple-600/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Net Profit (After ₹{planCost} Plan Fee):</span>
              <div className="text-3xl font-heading font-bold text-emerald-400 font-mono-num mt-1">
                +₹{roi.netMonthlyGain.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-purple-300 font-semibold">Net ROI Multiplier:</span>
              <div className="text-3xl font-heading font-bold text-fuchsia-400 font-mono-num mt-1">
                {roi.roiMultiplier}x
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Software pays for itself within the first 24 hours of operation.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes 30-day risk-free trial. Zero upfront commitment.</span>
            </div>
          </div>

          <button
            onClick={() => onSelectPlan(planTier === 'basic' ? 'Basic (₹250/mo)' : 'Pro (₹600/mo)')}
            className="btn-foursight w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Activate 30-Day Free Trial on this Counter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

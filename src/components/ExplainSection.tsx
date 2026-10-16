import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Store, 
  UserCheck, 
  ShoppingBag, 
  FileText, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldAlert,
  Zap,
  DollarSign
} from 'lucide-react';
import { NavTab } from '../types';

interface ExplainSectionProps {
  onGoToBilling: () => void;
  onGoToPyr: () => void;
  onGoToRoi: () => void;
}

export const ExplainSection: React.FC<ExplainSectionProps> = ({
  onGoToBilling,
  onGoToPyr,
  onGoToRoi
}) => {
  const [activeHour, setActiveHour] = useState<number>(17); // 5 PM
  const [activeAudience, setActiveAudience] = useState<'owner' | 'cashier' | 'consumer' | 'investor'>('owner');
  const [copiedPitch, setCopiedPitch] = useState(false);

  const timePhases = [
    {
      hour: 8,
      timeLabel: '08:00 AM',
      phase: 'Phase 1: Morning Prep with PYR',
      icon: '🌅',
      status: 'Intelligent Batch Sizing',
      headline: 'Stop guessing daily bake counts',
      story: 'The baker opens the PYR (Past Year Records) ledger. Instead of blindly baking 35 loaves like yesterday, 4OURSIGHT factors in today’s weather and day-of-week: "Prepare 24 sourdoughs to avoid surplus." Overproduction is stopped before flour touches the mixer.',
      stat: '25% prep waste eliminated at 8 AM',
      highlightBadge: 'Preventive Intelligence'
    },
    {
      hour: 14,
      timeLabel: '02:00 PM',
      phase: 'Phase 2: Live Counter Billing POS',
      icon: '☀️',
      status: 'Frictionless Sales Tracking',
      headline: 'Ring up sales naturally—zero new hardware',
      story: 'Customers arrive for lunch. The counter staff rings up orders on the 4OURSIGHT billing terminal in 2 taps via UPI, Cash, or Card. Every bill automatically updates the shelf-life countdown clock without tedious end-of-day spreadsheet typing.',
      stat: '15 items sold; 9 remaining with 4h shelf-life',
      highlightBadge: 'Real-Time Sync'
    },
    {
      hour: 17,
      timeLabel: '05:00 PM',
      phase: 'Phase 3: Dynamic Price Clearance',
      icon: '🌇',
      status: 'Automated Cash Salvage',
      headline: 'Sell it before it becomes garbage',
      story: 'With 3 hours until closing and 7 sourdough loaves left, 4OURSIGHT automatically activates an algorithmic 25% discount and bundles with evening beverages. Local consumers in the neighborhood network get notified of fair-price deals.',
      stat: '7 items cleared at ₹120 each = ₹840 saved',
      highlightBadge: 'Dynamic Clearance'
    },
    {
      hour: 20,
      timeLabel: '08:30 PM',
      phase: 'Phase 4: Store Closing & Settlement',
      icon: '🌙',
      status: 'Clean Counter & Max Profit',
      headline: 'Zero loaves in the dumpster, cash in drawer',
      story: 'Closing time. The store manager prints the daily salvage report: 96% inventory clearance achieved. What used to be ₹1,800 in thrown-out food is now ₹1,420 of hard cash in the register. The data auto-feeds into tomorrow’s PYR model.',
      stat: '₹14,350 net cash salvaged this month',
      highlightBadge: 'Salvaged Margin'
    }
  ];

  const currentPhaseData = timePhases.find(p => p.hour === activeHour) || timePhases[2];

  const audienceViews = {
    owner: {
      title: 'For Bakery & Café Store Owners',
      role: 'Owners & Operators',
      quote: '"I save ₹14,000+ every month without replacing my billing hardware or hiring data consultants."',
      points: [
        'No capex: runs on any phone, tablet, or existing desktop browser.',
        'Prevents 10-15% of daily inventory from turning into zero-value garbage.',
        'Starts at just ₹250/month (Basic) with a 30-day risk-free trial.'
      ],
      ctaText: 'Calculate Your Monthly ROI',
      ctaAction: onGoToRoi
    },
    cashier: {
      title: 'For Cashiers & Counter Staff',
      role: 'Front-of-House Team',
      quote: '"Billing is as fast as a phone calculator, and I never have to spend 45 minutes manually counting leftovers at night."',
      points: [
        'Fast 1-tap product addition and instant UPI QR / Cash settlement.',
        'Clearance prices apply automatically when time drops; no manual math.',
        '1-click thermal receipt printing or digital WhatsApp share.'
      ],
      ctaText: 'Test Drive Counter POS Terminal',
      ctaAction: onGoToBilling
    },
    consumer: {
      title: 'For Neighborhood Food Lovers',
      role: 'Local Buyers',
      quote: '"I get artisan sourdough and gourmet pastries fresh from local bakeries at honest 20-40% discounts."',
      points: [
        'Submit fair-price bids on what you crave before evening rush.',
        'Support neighborhood small businesses while saving on daily meals.',
        'Instant pickup tokens with zero platform subscription fees.'
      ],
      ctaText: 'View Neighborhood Bids Feed',
      ctaAction: onGoToBilling
    },
    investor: {
      title: 'For ESG Partners & Investors',
      role: 'Impact & Economics',
      quote: '"4OURSIGHT turns a massive global climate inefficiency (UNEP 2024: 28% food waste) into high-margin recurring SaaS."',
      points: [
        '57x monthly customer ROI on the ₹250 Basic subscription tier.',
        'High customer stickiness due to daily counter POS and historical PYR data integration.',
        'Scales across 15M+ independent food-service counters across emerging markets.'
      ],
      ctaText: 'Inspect PYR Seasonal Data',
      ctaAction: onGoToPyr
    }
  };

  const handleCopyPitch = () => {
    const pitchText = `4OURSIGHT — B2B Surplus Intelligence & Direct Counter Billing:
• The Problem: Bakeries and grocers lose up to 15% of daily revenue to unsold food waste (UNEP 2024 benchmark).
• The Solution: 4OURSIGHT combines Past Year Records (PYR) morning batch estimation with automated counter billing and dynamic 4 PM clearance markdowns.
• The Result: Average ₹14,350/mo cash salvaged per counter on a ₹250/mo subscription (57x ROI). Zero POS hardware replacement required.`;

    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#0f172a] border border-purple-900/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 60-Second Master Explainer
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            How 4OURSIGHT Turns Food Waste into Pure Profit
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Use this interactive walkthrough to explain 4OURSIGHT to your team, store owners, cashiers, or investors. Follow a typical 12-hour shift from morning flour to evening cash salvage.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={handleCopyPitch}
              className="px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-900/80 border border-purple-700/60 text-xs font-semibold text-fuchsia-200 transition-all flex items-center gap-2"
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPitch ? 'Pitch Copied to Clipboard!' : 'Copy 1-Minute Pitch'}</span>
            </button>
            <button
              onClick={onGoToBilling}
              className="btn-foursight px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
            >
              <span>Launch Live POS Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Time-Machine Simulation */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Interactive Daily Shift Simulator</span>
            <h3 className="text-lg font-heading font-bold text-white mt-1">
              Click a time to see 4OURSIGHT in action throughout the day:
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-[#131c31] p-1.5 rounded-xl border border-slate-800">
            {timePhases.map((phase) => (
              <button
                key={phase.hour}
                onClick={() => setActiveHour(phase.hour)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeHour === phase.hour
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{phase.icon}</span>
                <span>{phase.timeLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phase Card Display */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-fuchsia-300 border border-purple-700/60 text-xs font-bold">
                {currentPhaseData.phase}
              </span>
              <span className="text-xs text-slate-400">• {currentPhaseData.timeLabel}</span>
            </div>
            
            <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentPhaseData.headline}
            </h4>

            <p className="text-slate-300 text-sm leading-relaxed bg-[#131c31] p-4 rounded-xl border border-slate-800">
              {currentPhaseData.story}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
                <CheckCircle2 className="w-4 h-4" />
                <span>{currentPhaseData.stat}</span>
              </div>
              <div className="text-xs text-purple-300 font-medium">
                Tag: {currentPhaseData.highlightBadge}
              </div>
            </div>
          </div>

          {/* Visual Simulation Display Box */}
          <div className="lg:col-span-5 bg-[#050508] border border-purple-900/60 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-fuchsia-400" /> Artisan Bakery Counter
              </span>
              <span className="font-mono-num text-fuchsia-400 font-bold">{currentPhaseData.timeLabel}</span>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Inventory Sample:</span>
                <span className="text-white font-medium">Country Sourdough (750g)</span>
              </div>

              {activeHour === 8 && (
                <div className="bg-[#131c31] p-3 rounded-lg border border-purple-800/40 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Standard Prep:</span>
                    <span className="line-through text-slate-500">35 units</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-400">
                    <span>PYR Weather Adjusted:</span>
                    <span>24 units (-31%)</span>
                  </div>
                  <div className="text-[11px] text-purple-300 mt-1">
                    💡 Avoids 11 surplus loaves baked unnecessarily
                  </div>
                </div>
              )}

              {activeHour === 14 && (
                <div className="bg-[#131c31] p-3 rounded-lg border border-purple-800/40 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sold via Direct POS:</span>
                    <span className="text-white font-bold">15 units (₹2,400)</span>
                  </div>
                  <div className="flex justify-between text-amber-300 font-medium">
                    <span>Remaining On Counter:</span>
                    <span>9 units</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Remaining Shelf-Life:</span>
                    <span className="text-fuchsia-400 font-bold">4.5 Hours</span>
                  </div>
                </div>
              )}

              {activeHour === 17 && (
                <div className="bg-[#131c31] p-3 rounded-lg border border-purple-800/40 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Original Base Price:</span>
                    <span className="line-through text-slate-500">₹160</span>
                  </div>
                  <div className="flex justify-between font-bold text-fuchsia-400 text-sm">
                    <span>Dynamic Markdown (25% off):</span>
                    <span>₹120</span>
                  </div>
                  <div className="bg-purple-950/70 p-2 rounded text-[11px] text-fuchsia-200">
                    ⚡ WhatsApp & Neighborhood broadcast sent: 4 orders claimed instantly
                  </div>
                </div>
              )}

              {activeHour === 20 && (
                <div className="bg-[#131c31] p-3 rounded-lg border border-purple-800/40 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Bakes Today:</span>
                    <span className="text-white font-bold">24 units</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Units Sold & Cleared:</span>
                    <span>23 units (96%)</span>
                  </div>
                  <div className="flex justify-between text-fuchsia-400 font-bold">
                    <span>Total Cash Salvaged:</span>
                    <span>₹1,420</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Dumpster waste: only 1 broken roll (₹0 loss)
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
              <span>Status: <strong className="text-white">{currentPhaseData.status}</strong></span>
              <span className="text-purple-400 font-semibold">Zero Hardware Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Persona Explainer Tabs ("Explain to My Boss / Staff / Consumer") */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Custom Pitch Tailored by Role</span>
          <h3 className="text-xl font-heading font-bold text-white mt-1">
            Choose your audience to see why 4OURSIGHT makes total sense:
          </h3>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setActiveAudience('owner')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeAudience === 'owner'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-[#131c31] text-slate-300 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Bakery / Café Owner</span>
            </button>
            <button
              onClick={() => setActiveAudience('cashier')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeAudience === 'cashier'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-[#131c31] text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Counter Cashier / Staff</span>
            </button>
            <button
              onClick={() => setActiveAudience('consumer')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeAudience === 'consumer'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-[#131c31] text-slate-300 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Neighborhood Consumer</span>
            </button>
            <button
              onClick={() => setActiveAudience('investor')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeAudience === 'investor'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-[#131c31] text-slate-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Investor / Partner</span>
            </button>
          </div>
        </div>

        {/* Selected Persona Content */}
        <div className="bg-[#131c31] border border-slate-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-fuchsia-400 font-semibold">{audienceViews[activeAudience].role}</span>
              <h4 className="text-lg font-bold text-white">{audienceViews[activeAudience].title}</h4>
            </div>
            <button
              onClick={audienceViews[activeAudience].ctaAction}
              className="btn-foursight px-4 py-2 rounded-lg text-xs font-semibold text-white self-start md:self-auto flex items-center gap-2"
            >
              <span>{audienceViews[activeAudience].ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-4 italic text-sm text-purple-200 bg-purple-950/40 p-3.5 rounded-lg border border-purple-800/40">
            {audienceViews[activeAudience].quote}
          </div>

          <div className="space-y-2.5">
            {audienceViews[activeAudience].points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Step Architecture Graphic */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 relative">
          <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 font-bold flex items-center justify-center text-sm mb-4">
            01
          </div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Morning PYR Baseline</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Past Year Records compare historical sales velocity against weather, holidays, and day-of-week so you bake the exact right quantity.
          </p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 relative">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm mb-4">
            02
          </div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Real-Time Counter POS</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fast billing interface deducts inventory with every customer checkout. Live countdown calculates true at-risk items and shelf-life.
          </p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 relative">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 font-bold flex items-center justify-center text-sm mb-4">
            03
          </div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Dynamic Clearance & Salvage</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            At 4 PM / 5 PM, automated discounts activate and broadcast to local buyers. Perishable items turn into revenue instead of trash.
          </p>
        </div>
      </div>

    </div>
  );
};

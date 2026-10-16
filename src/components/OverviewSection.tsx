import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  FileSpreadsheet, 
  ShoppingBag, 
  Calculator,
  HelpCircle
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { BrandLogo } from './BrandLogo';

interface OverviewSectionProps {
  currentLang: Language;
  onGoToBilling: () => void;
  onGoToPyr: () => void;
  onGoToExplain: () => void;
  onGoToRoi: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  currentLang,
  onGoToBilling,
  onGoToPyr,
  onGoToExplain,
  onGoToRoi
}) => {
  const t = translations[currentLang] || translations.en;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Banner with 4OURSIGHT Brand Showcase */}
      <div className="bg-[#050508] border border-purple-900/60 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        {/* Glow Spheres */}
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 top-1/3 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-purple-900/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          
          {/* Large Hero Brand SVG */}
          <div className="mb-6">
            <BrandLogo size="lg" showSubtitle={false} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="font-roxborough text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            {t.hero.headline}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onGoToBilling}
              className="btn-foursight px-6 py-3.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2.5 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGoToExplain}
              className="px-5 py-3.5 rounded-xl bg-fuchsia-950/40 hover:bg-fuchsia-900/40 text-fuchsia-300 font-semibold text-sm border border-fuchsia-700/60 transition-all flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{t.hero.ctaExplain}</span>
            </button>

            <button
              onClick={onGoToPyr}
              className="px-5 py-3.5 rounded-xl bg-[#131c31] hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-purple-800/50 transition-all flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-purple-400" />
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Facts & Figures Grid (UNEP 2024 Data) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-white">{t.unep.title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{t.unep.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-800/60 transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">{t.unep.stat1Label}</span>
              <div className="font-heading text-4xl sm:text-5xl font-bold text-white mt-2">28%</div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {t.unep.stat1Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              Source: Food Waste Index Report 2024 | UNEP
            </div>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-800/60 transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">{t.unep.stat2Label}</span>
              <div className="font-heading text-4xl sm:text-5xl font-bold text-white mt-2">130M Tonnes</div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {t.unep.stat2Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              Retail Sector Loss | UNEP ca5ae07a
            </div>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-800/60 transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">{t.unep.stat3Label}</span>
              <div className="font-heading text-4xl sm:text-5xl font-bold text-fuchsia-400 mt-2 flex items-center">
                <span className="font-sans mr-0.5">₹</span>14,350
              </div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {t.unep.stat3Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-purple-300 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 57x Monthly ROI
              </span>
              <button onClick={onGoToRoi} className="text-fuchsia-400 hover:underline">
                Calculate Yours →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Problem vs 4OURSIGHT Comparison Matrix */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">The Practical Solution</span>
          <h3 className="text-2xl font-heading font-bold text-white mt-1">
            Why Traditional Store Operations Fail & How 4OURSIGHT Solves It
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Legacy way */}
          <div className="bg-[#131c31] border border-red-950/40 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Without 4OURSIGHT (Status Quo)</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Blind Morning Baking:</strong> Relying on memory or fixed batch sheets, leading to 15-20% surplus on rainy or slow days.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Expensive Hardware Lock-in:</strong> Enterprise POS systems cost ₹40,000+ capex with high monthly subscription fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>Static Shelf Pricing:</strong> Items stay at full price until 9 PM, then get dumped into garbage bags with ₹0 recovered.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span><strong>No Customer Channel:</strong> Neighborhood customers walk past closed counters unaware of fresh surplus availability.</span>
              </li>
            </ul>
          </div>

          {/* 4OURSIGHT way */}
          <div className="bg-[#150a2a] border border-purple-600/50 rounded-xl p-6 space-y-4 shadow-lg shadow-purple-950/30">
            <div className="flex items-center gap-2 text-fuchsia-400 font-bold text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>With 4OURSIGHT (Intelligence & Salvage)</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>PYR Forecast Sizing:</strong> Past Year Records adjust prep quantities based on weather, festivals, and velocity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Zero Hardware Capex:</strong> Works on any smartphone, iPad, or laptop browser with fast 2-tap billing and UPI.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Automated 4 PM Clearance:</strong> Dynamic markdowns trigger safely as closing time approaches to salvage cash.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Neighborhood Buyer Network:</strong> Local buyers place fair-price bids and pick up bundles right before closing.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, ChevronDown, ChevronUp, Users, ArrowRight } from 'lucide-react';

interface PricingTeamSectionProps {
  onSelectPlan: (plan: string) => void;
  onGoToExplain: () => void;
}

export const PricingTeamSection: React.FC<PricingTeamSectionProps> = ({ onSelectPlan, onGoToExplain }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need to buy any new POS hardware or card swipe machines?",
      a: "No! 4OURSIGHT runs in any web browser on your existing smartphone, iPad, tablet, or cash counter computer. There is zero hardware capex."
    },
    {
      q: "Can I still use my current Excel or handwritten sheets?",
      a: "Yes. 4OURSIGHT has built-in copy-paste and file import/export for `.xlsx` and `.csv`. You can also snap a photo of your morning register, and Gemini extracts the counts automatically."
    },
    {
      q: "How does 4OURSIGHT help me sell surplus before closing?",
      a: "As the closing clock approaches, 4OURSIGHT calculates remaining shelf-life and applies algorithmic markdowns (15% to 35% off). It also syncs with nearby neighborhood consumers seeking fresh items at honest prices."
    },
    {
      q: "How does billing work after the 30-day free trial?",
      a: "The Basic plan is only ₹250/month. Based on our UNEP-verified pilots, counters salvage an average of ₹14,350/month—meaning the software pays for itself in less than 24 hours of operation."
    }
  ];

  const founders = [
    {
      name: "Kartikey Saxena",
      role: "Co-Founder & Product",
      initials: "KS",
      color: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40",
      desc: "Architecting B2B retail intelligence and cashier-friendly POS workflows."
    },
    {
      name: "Arjun Joshi",
      role: "Co-Founder & Strategy",
      initials: "AJ",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      desc: "Commercial expansion, UNEP framework alignment, and food-service partnerships."
    },
    {
      name: "Soham Bhalerao",
      role: "Co-Founder & Tech",
      initials: "SB",
      color: "bg-violet-500/20 text-violet-400 border-violet-500/40",
      desc: "Building the PYR predictive engine, real-time sync, and Gemini multimodal integrations."
    },
    {
      name: "Himanshu Galiyan",
      role: "Co-Founder & Operations",
      initials: "HG",
      color: "bg-pink-500/20 text-pink-400 border-pink-500/40",
      desc: "On-ground merchant onboarding, neighborhood consumer network logistics, and merchant support."
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">Transparent Subscription Plans & Team</h2>
          <span className="px-2 py-0.5 rounded bg-purple-950/80 text-fuchsia-300 border border-purple-700/60 text-[10px] font-bold">
            Zero Hardware Lock-In
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Paid directly from salvaged food waste. Risk-free 30-day proof of concept for any bakery, cafe, or grocer.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        
        {/* Trial */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Trial Phase</span>
            <div className="font-roxborough text-3xl sm:text-4xl font-bold text-white mt-2">
              ₹0 <span className="text-xs font-normal text-slate-400 font-sans">/ 30 days</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Risk-free proof of concept to validate real waste recovery in your store.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>1 Store Counter Included</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>CSV & Spreadsheet Uploads</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Weekly Surplus Summary</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Basic Discounting Templates</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('30-Day Free Trial')}
            className="mt-8 w-full py-2.5 rounded-xl bg-[#131c31] hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Start 30-Day Free Trial
          </button>
        </div>

        {/* Basic - FEATURED */}
        <div className="bg-[#150a2a] border-2 border-purple-500 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative shadow-2xl shadow-purple-950/50">
          <span className="btn-foursight absolute -top-3 right-6 text-[10px] text-white font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
            Recommended
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Basic Plan</span>
            <div className="font-roxborough text-3xl sm:text-4xl font-bold text-white mt-2">
              ₹250 <span className="text-xs font-normal text-purple-200 font-sans">/ month</span>
            </div>
            <p className="text-xs text-purple-200/80 mt-2">
              Essential daily surplus intelligence for single-store bakeries, cafés & food stalls.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Single Store Counter Dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Automated 4 PM Dynamic Markdowns</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Actionable Waste Reduction Insights</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>WhatsApp Daily Shift Digests</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>57x Average Monthly Verified ROI</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('Basic Plan (₹250/mo)')}
            className="btn-foursight mt-8 w-full py-3 rounded-xl text-xs font-bold text-white shadow-md"
          >
            Choose Basic Plan (₹250/mo)
          </button>
        </div>

        {/* Pro */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Pro Plan</span>
            <div className="font-roxborough text-3xl sm:text-4xl font-bold text-white mt-2">
              ₹600 <span className="text-xs font-normal text-slate-400 font-sans">/ month</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Advanced predictive intelligence for high-volume bakeries, chains & central kitchens.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Multi-Counter & Central Batch Tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Dynamic Discount AI Engine</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Neighborhood Bulk-Buyer Broadcasts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Priority Founder 24/7 Support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('Pro Plan (₹600/mo)')}
            className="mt-8 w-full py-2.5 rounded-xl bg-[#131c31] hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Choose Pro Plan (₹600/mo)
          </button>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Common Questions</span>
            <h3 className="text-lg font-heading font-bold text-white mt-0.5">Frequently Asked Questions</h3>
          </div>
          <button
            onClick={onGoToExplain}
            className="text-xs text-fuchsia-400 hover:underline flex items-center gap-1"
          >
            <span>See interactive demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#131c31] border border-slate-800 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-white"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-fuchsia-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Founders Section */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Executive Leadership</span>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
            Founders of <span className="foursight-wordmark text-2xl font-bold">4OURSIGHT</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated to eliminating retail food waste through practical merchant intelligence and automated cash salvage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {founders.map((founder, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#131c31] border border-slate-800 hover:border-purple-800/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl font-bold flex items-center justify-center mx-auto mb-4 text-base border ${founder.color}`}>
                  {founder.initials}
                </div>
                <div className="text-sm font-bold text-white">{founder.name}</div>
                <div className="text-[11px] text-fuchsia-400 font-medium mt-0.5">{founder.role}</div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {founder.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-purple-300 font-semibold">
                4OURSIGHT Co-Founder
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { NavTab, Language } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  Sparkles, 
  Volume2, 
  Sun, 
  Moon, 
  Languages, 
  Menu, 
  X, 
  HelpCircle,
  Calculator,
  LayoutGrid,
  ShoppingBag,
  FileSpreadsheet,
  Users,
  CreditCard
} from 'lucide-react';
import { translations } from '../data/translations';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenCopilot: () => void;
  onOpenAudioBriefing: () => void;
  onOpenExplainTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentLang,
  onSelectLang,
  isDarkMode,
  onToggleTheme,
  onOpenCopilot,
  onOpenAudioBriefing,
  onOpenExplainTour
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  // Streamlined concise navigation labels for clean horizontal layout
  const navItems = [
    { id: 'overview' as NavTab, label: 'Overview', icon: LayoutGrid, isSpecial: false },
    { id: 'explain' as NavTab, label: 'Explain 💡', icon: HelpCircle, isSpecial: true },
    { id: 'billing' as NavTab, label: 'POS Billing ⚡', icon: ShoppingBag, isSpecial: false },
    { id: 'pyr' as NavTab, label: 'PYR Ledger 📊', icon: FileSpreadsheet, isSpecial: false },
    { id: 'network' as NavTab, label: 'Network 🤝', icon: Users, isSpecial: false },
    { id: 'roi' as NavTab, label: 'ROI Calc 📈', icon: Calculator, isSpecial: false },
    { id: 'pricing' as NavTab, label: 'Pricing 💎', icon: CreditCard, isSpecial: false },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#050508]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <BrandLogo size="sm" showSubtitle={false} onClick={() => onSelectTab('overview')} />
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center bg-[#0f172a] rounded-xl p-1 border border-slate-800 text-xs font-medium shadow-inner shrink" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-purple-900/70 text-fuchsia-200 border border-purple-600/50 shadow-sm font-semibold'
                      : item.isSpecial
                      ? 'text-fuchsia-300 hover:text-white hover:bg-purple-950/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-fuchsia-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-[#0f172a] border border-purple-800/60 rounded-lg px-1.5 py-1 text-xs text-slate-200 hover:border-purple-500 transition-colors">
              <Languages className="w-3 h-3 text-fuchsia-400 mr-1 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as Language)}
                className="bg-transparent text-[11px] font-medium text-slate-200 focus:outline-none cursor-pointer pr-0.5"
                aria-label="Select Language"
              >
                <option value="en" className="bg-[#0f172a] text-white">EN</option>
                <option value="hi" className="bg-[#0f172a] text-white">HI</option>
                <option value="mr" className="bg-[#0f172a] text-white">MR</option>
                <option value="gu" className="bg-[#0f172a] text-white">GU</option>
                <option value="ta" className="bg-[#0f172a] text-white">TA</option>
              </select>
            </div>

            {/* AI Audio Briefing (desktop only) */}
            <button
              onClick={onOpenAudioBriefing}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 border border-purple-800/50 text-xs text-fuchsia-300 font-medium transition-colors"
              title="Listen to 30-sec AI Shift Audio Briefing"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Audio Brief</span>
            </button>

            {/* AI Strategist Button */}
            <button
              onClick={onOpenCopilot}
              className="btn-foursight flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs text-white font-semibold shadow-md shrink-0"
              title="Open Gemini AI Surplus Strategist"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Strategist</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="hidden sm:flex p-1.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 border border-slate-800 text-slate-300 shrink-0"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-fuchsia-400" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-purple-900/60 text-fuchsia-200 border border-purple-700/60 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-fuchsia-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  onOpenExplainTour();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-fuchsia-950/60 border border-fuchsia-700/60 text-fuchsia-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Explain 4OURSIGHT</span>
              </button>
              
              <button
                onClick={() => {
                  onOpenAudioBriefing();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-[#0f172a] border border-purple-800/60 text-slate-200 text-xs font-medium flex items-center justify-center gap-2"
              >
                <Volume2 className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Audio Shift Brief</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

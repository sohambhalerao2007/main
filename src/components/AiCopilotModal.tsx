import React, { useState } from 'react';
import { X, Sparkles, Send, Globe, MessageSquare } from 'lucide-react';

interface AiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AiCopilotModal: React.FC<AiCopilotModalProps> = ({ isOpen, onClose, initialPrompt = '' }) => {
  const [query, setQuery] = useState(initialPrompt);
  const [useSearch, setUseSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    "Draft a WhatsApp flash promo for 5 surplus Sourdoughs at 30% off.",
    "Recommend a 4 PM coffee + pastry bundle price to clear remaining stock.",
    "How to size tomorrow's morning bake if rain is forecasted?",
    "Calculate my monthly food waste loss on ₹2,00,000 turnover."
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setResponse(null);

    // Call internal strategist logic or API
    setTimeout(() => {
      let mockReply = "";
      const qLower = q.toLowerCase();

      if (qLower.includes("whatsapp") || qLower.includes("promo")) {
        mockReply = `🥖 *4OURSIGHT FRESH SURPLUS FLASH ALERT!* 🥖\n\nHey food lovers! We have 5 freshly baked Artisan Sourdough loaves ready for pickup at a special evening rate.\n\n✨ *Original Price:* ₹160\n🔥 *Flash Deal:* ₹119 (25% OFF!)\n⏰ *Valid Till:* 8:30 PM tonight only\n📍 *Pickup:* Counter 1 (Tap to claim: foursight.app/c/8821)\n\nHelp us ensure zero fresh bread goes to waste tonight! 🙌`;
      } else if (qLower.includes("bundle") || qLower.includes("coffee")) {
        mockReply = `💡 *Tactical 4 PM Bundle Recommendation:*\n\nPair your remaining 4 Pain au Chocolat (base ₹130) with our House Cold Brew / Cappuccino (base ₹120).\n\n• Combined Menu Value: ₹250\n• *Clearance Bundle Price:* ₹169 (Save ₹81)\n• *Expected Recovery:* Clears 4 units within 60 minutes, generating ₹676 cash that would otherwise be zero-value waste.`;
      } else if (qLower.includes("rain") || qLower.includes("weather")) {
        mockReply = `🌧️ *PYR Weather Adjustment Advice:*\n\nHistorical analysis shows that unseasonal afternoon rain dampens walk-in foot traffic by approximately 22-28%.\n\n• *Recommended Prep:* Trim morning bake from 35 loaves to 25 loaves.\n• *Afternoon Strategy:* Open consumer network bids at 3:30 PM rather than 5 PM.\n• *Result:* Avoids ₹1,200 in unsold evening inventory.`;
      } else {
        mockReply = `⚡ *4OURSIGHT Strategic Analysis:*\n\nBased on your counter's live volume and remaining shelf-life clock:\n1. Your bread category is pacing slightly behind seasonal PYR velocity (9 units at risk).\n2. Activate a 20% dynamic clearance discount starting at 4:30 PM.\n3. Broadcast to neighborhood network buyers to salvage up to ₹1,240 before 8 PM closing.`;
      }

      setResponse(mockReply);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-xl w-full p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
          aria-label="Close strategist"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-fuchsia-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-base font-heading font-bold text-white">4OURSIGHT AI Surplus Strategist</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Tactical advice for bakery, café, and grocery operators to maximize cash salvage.
        </p>

        {/* Quick prompt chips */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] text-slate-400 font-medium">Quick Suggestions:</span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => { setQuery(p); handleSend(p); }}
                className="text-[10px] text-slate-300 bg-[#131c31] hover:bg-purple-950/60 hover:text-fuchsia-200 border border-slate-800 hover:border-purple-700/60 px-2.5 py-1 rounded-lg text-left transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about inventory risk, promos, pricing..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow bg-[#131c31] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !query.trim()}
              className="btn-foursight px-4 py-2.5 rounded-xl text-xs font-semibold text-white disabled:opacity-50 flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[11px] text-slate-400 flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useSearch}
                onChange={(e) => setUseSearch(e.target.checked)}
                className="accent-purple-500 rounded"
              />
              <Globe className="w-3 h-3 text-purple-400" />
              <span>Enable Google Search Grounding for localized food prices</span>
            </label>
          </div>

          {/* Response Box */}
          <div className="bg-[#131c31] border border-slate-800 rounded-xl p-4 min-h-[140px] max-h-72 overflow-y-auto text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {isLoading ? (
              <div className="flex items-center gap-2 text-fuchsia-400 py-6 justify-center">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Gemini AI is analyzing surplus strategy...</span>
              </div>
            ) : response ? (
              response
            ) : (
              <span className="text-slate-500 italic">
                Ask a question or select a suggestion above to generate tactical clearance advice.
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

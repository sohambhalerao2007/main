import React, { useState } from 'react';
import { X, Volume2, Play, Square, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface AudioBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const AudioBriefingModal: React.FC<AudioBriefingModalProps> = ({
  isOpen,
  onClose,
  currentLang
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const briefings: Record<Language, { title: string; script: string; langCode: string }> = {
    en: {
      title: "Morning Shift Briefing (English)",
      script: "Good morning team. Welcome to 4OURSIGHT. Your morning inventory shows 9 Country Sourdoughs and 4 Pain au Chocolat pacing behind historical seasonal velocity. Weather indicates clear skies until 4 PM, followed by evening overcast. We recommend triggering the 4 PM Coffee and Sourdough bundle at ₹149 to salvage ₹1,420 of cash today. Let's make sure zero fresh bread is wasted tonight.",
      langCode: "en-US"
    },
    hi: {
      title: "दैनिक शिफ्ट ब्रीफिंग (हिंदी)",
      script: "नमस्ते टीम। 4OURSIGHT में आपका स्वागत है। आज सुबह के काउंटर पर 9 सावरडो ब्रेड और 4 पेन ओ शोकोला बचने का जोखिम है। मौसम के अनुसार शाम 4 बजे से हल्की बारिश हो सकती है। हमारा सुझाव है कि शाम 4 बजे कॉफी कॉम्बो ऑफर चालू करें और ₹1,420 का मुनाफा बचाएं। आज रात को एक भी ब्रेड कचरे में नहीं जानी चाहिए।",
      langCode: "hi-IN"
    },
    mr: {
      title: "दैनिक शिफ्ट ब्रीफिंग (मराठी)",
      script: "नमस्कार टीम. 4OURSIGHT मध्ये आपले स्वागत आहे. आज काउंटरवर ९ सावरडो ब्रेड आणि ४ पेस्ट्रीज शिल्लक राहण्याची शक्यता आहे. संध्याकाळी ४ वाजता विशेष कॉफी कॉम्बो ऑफर सुरू करा आणि ₹१,४२० चा नफा वाचवा. आज रात्री कोणतीही ताजी ब्रेड वाया जाणार नाही याची काळजी घ्या.",
      langCode: "mr-IN"
    },
    gu: {
      title: "દૈનિક શિફ્ટ બ્રીફિંગ (ગુજરાતી)",
      script: "નમસ્તે ટીમ. 4OURSIGHT માં આપનું સ્વાગત છે. આજે કાઉન્ટર પર 9 સાવરડો બ્રેડ વધવાનું જોખમ છે. સાંજે 4 વાગ્યાની કોફી બંડલ ઓફર શરૂ કરીને ₹1,420 બચાવો. આજે કોઈ ખોરાક બગાડવો જોઈએ નહીં.",
      langCode: "gu-IN"
    },
    ta: {
      title: "காலை ஷிப்ட் சுருக்கம் (தமிழ்)",
      script: "வணக்கம். 4OURSIGHT-க்கு நல்வரவு. இன்று 9 பிரெட் பாக்கெட்டுகள் மீதமாகும் வாய்ப்பு உள்ளது. மாலை 4 மணிக்கு சிறப்பு காபி சலுகையை செயல்படுத்தி ₹1,420 சேமிக்கவும். உணவு விரயத்தை தவிர்ப்போம்.",
      langCode: "ta-IN"
    }
  };

  const activeBriefing = briefings[currentLang] || briefings.en;

  const handlePlay = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeBriefing.script);
      utterance.lang = activeBriefing.langCode;
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
        <button
          onClick={() => { handleStop(); onClose(); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
          aria-label="Close audio briefing"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-fuchsia-400 flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </div>
          <h3 className="text-base font-heading font-bold text-white">4OURSIGHT Audio Shift Briefing</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Listen to your 30-second morning briefing on daily surplus and clearance advice.
        </p>

        <div className="bg-[#131c31] border border-purple-800/40 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-fuchsia-300">
            <span>{activeBriefing.title}</span>
            <span className="text-[10px] text-slate-400">Duration ~ 25s</span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed italic">
            "{activeBriefing.script}"
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="btn-foursight flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-md"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Play Shift Briefing Audio</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Stop Audio</span>
            </button>
          )}

          <button
            onClick={() => { handleStop(); onClose(); }}
            className="px-4 py-2.5 rounded-xl bg-[#131c31] hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

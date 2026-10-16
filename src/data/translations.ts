import { Language } from '../types';

export interface TranslationDictionary {
  langName: string;
  nav: {
    overview: string;
    explain: string;
    billing: string;
    pyr: string;
    network: string;
    roi: string;
    pricing: string;
  };
  actions: {
    audioBriefing: string;
    aiStrategist: string;
    explainToOthers: string;
    startTrial: string;
    openBilling: string;
    viewPyr: string;
    addBatch: string;
    importData: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaExplain: string;
  };
  unep: {
    title: string;
    subtitle: string;
    stat1Label: string;
    stat1Desc: string;
    stat2Label: string;
    stat2Desc: string;
    stat3Label: string;
    stat3Desc: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    langName: "English",
    nav: {
      overview: "Overview & Benchmark",
      explain: "Explain 4OURSIGHT 💡",
      billing: "Counter POS & Billing ⚡",
      pyr: "PYR Excel Ledger 📊",
      network: "Consumer Network 🤝",
      roi: "ROI Calculator 📈",
      pricing: "Pricing & Team 💎"
    },
    actions: {
      audioBriefing: "AI Audio Briefing",
      aiStrategist: "AI Strategist",
      explainToOthers: "Explain to Others",
      startTrial: "Start Free 30-Day Trial",
      openBilling: "Open Counter Billing",
      viewPyr: "Open PYR Excel Ledger",
      addBatch: "Add Morning Batch",
      importData: "Import CSV / Excel"
    },
    hero: {
      badge: "UN Environment Programme 2024 Aligned • B2B Food Waste Reduction",
      headline: "Can you sell it before it becomes garbage?",
      subheadline: "Independent bakeries, cafés, and grocers lose up to 15% of daily turnover to unsold surplus and estimation errors. 4OURSIGHT converts perishable inventory risk into daily cash recovery using Past Year Records (PYR) and automated dynamic pricing—with zero POS hardware replacement.",
      ctaPrimary: "Open Counter Billing POS",
      ctaSecondary: "Explore PYR Excel Ledger",
      ctaExplain: "See How It Works (60s Tour)"
    },
    unep: {
      title: "The B2B Surplus Crisis in Numbers",
      subtitle: "Official UNEP 2024 benchmarks and the 4OURSIGHT verified economic return.",
      stat1Label: "UNEP 2024 Food-Service Waste",
      stat1Desc: "Of global food waste comes from food-service counters (bakeries, restaurants, cafés) due to inaccurate daily prep forecasting.",
      stat2Label: "130 Million Tonnes",
      stat2Desc: "Lost annually at the retail and grocery level worldwide without automated dynamic markdowns.",
      stat3Label: "₹14,350 / Counter",
      stat3Desc: "Average net cash salvaged every month by counters using 4OURSIGHT Basic (₹250/mo), a 57x monthly return."
    }
  },
  hi: {
    langName: "हिंदी (Hindi)",
    nav: {
      overview: "अवलोकन एवं आंकड़े",
      explain: "4OURSIGHT कैसे काम करता है 💡",
      billing: "काउंटर बिलिंग POS ⚡",
      pyr: "PYR एक्सेल लेजर 📊",
      network: "ग्राहक नेटवर्क 🤝",
      roi: "मुनाफा कैलकुलेटर 📈",
      pricing: "प्लान और टीम 💎"
    },
    actions: {
      audioBriefing: "AI ऑडियो ब्रीफिंग",
      aiStrategist: "AI रणनीतिकार",
      explainToOthers: "दूसरों को समझाएं",
      startTrial: "30 दिन का फ्री ट्रायल शुरू करें",
      openBilling: "काउंटर बिलिंग खोलें",
      viewPyr: "PYR एक्सेल लेजर देखें",
      addBatch: "सुबह का नया बैच जोड़ें",
      importData: "CSV / एक्सेल अपलोड करें"
    },
    hero: {
      badge: "संयुक्त राष्ट्र पर्यावरण कार्यक्रम (UNEP) 2024 संरेखित",
      headline: "क्या आप इसे कचरा बनने से पहले बेच सकते हैं?",
      subheadline: "स्वतंत्र बेकरी, कैफे और किराना स्टोर गलत अनुमान और बिना बिके स्टॉक के कारण रोज़ाना 15% तक का नुकसान उठाते हैं। 4OURSIGHT पिछले साल के रिकॉर्ड (PYR) और ऑटोमैटिक डायनेमिक प्राइसिंग की मदद से खराब होने वाले स्टॉक को मुनाफे में बदलता है—बिना किसी नई POS मशीन के।",
      ctaPrimary: "काउंटर बिलिंग POS खोलें",
      ctaSecondary: "PYR एक्सेल लेजर देखें",
      ctaExplain: "देखें यह कैसे काम करता है"
    },
    unep: {
      title: "खाद्य बर्बादी का संकट और हल",
      subtitle: "UNEP 2024 आधिकारिक आंकड़े और 4OURSIGHT द्वारा की जाने वाली वास्तविक बचत।",
      stat1Label: "UNEP 2024 फूड-सर्विस वेस्ट",
      stat1Desc: "वैश्विक खाद्य बर्बादी का 28% हिस्सा कैफे, बेकरी और रेस्टोरेंट में गलत उत्पादन अनुमान के कारण होता है।",
      stat2Label: "13 करोड़ टन",
      stat2Desc: "हर साल खुदरा और किराना दुकानों पर बिना बिके खराब होने वाला भोजन।",
      stat3Label: "₹14,350 / काउंटर",
      stat3Desc: "4OURSIGHT बेसिक (₹250/माह) इस्तेमाल करने वाले काउंटरों द्वारा हर महीने बचाई जाने वाली औसत नकद राशि (57 गुना रिटर्न)।"
    }
  },
  mr: {
    langName: "मराठी (Marathi)",
    nav: {
      overview: "आढावा आणि आकडेवारी",
      explain: "4OURSIGHT कसे कार्य करते 💡",
      billing: "काउंटर बिलिंग POS ⚡",
      pyr: "PYR एक्सेल लेजर 📊",
      network: "ग्राहक नेटवर्क 🤝",
      roi: "नफा कॅल्क्युलेटर 📈",
      pricing: "प्लॅन्स आणि टीम 💎"
    },
    actions: {
      audioBriefing: "AI ऑडिओ ब्रीफिंग",
      aiStrategist: "AI सल्लागार",
      explainToOthers: "इतरांना समजावून सांगा",
      startTrial: "३० दिवसांची विनामूल्य चाचणी",
      openBilling: "काउंटर बिलिंग उघडा",
      viewPyr: "PYR लेजर पहा",
      addBatch: "सकाळची बॅच जोडा",
      importData: "फाईल इम्पोर्ट करा"
    },
    hero: {
      badge: "UNEP 2024 अन्न बचत मानकांशी संलग्न",
      headline: "अन्न कचऱ्यात जाण्यापूर्वी तुम्ही ते विकू शकता का?",
      subheadline: "स्थानिक बेकरी, कॅफे आणि किराणा दुकानांचे चुकीच्या अंदाजामुळे दररोज १५% नुकसान होते. 4OURSIGHT मागील नोंदी (PYR) आणि डायनॅमिक किंमतींचा वापर करून तोटा नफ्यात बदलते—कोणत्याही नवीन POS मशीनशिवाय.",
      ctaPrimary: "काउंटर बिलिंग POS उघडा",
      ctaSecondary: "PYR एक्सेल लेजर पहा",
      ctaExplain: "कसे कार्य करते ते पहा"
    },
    unep: {
      title: "अन्नाची नासाडी आणि आर्थिक उपाय",
      subtitle: "UNEP 2024 चे जागतिक निकष आणि 4OURSIGHT चे प्रत्यक्ष लाभ.",
      stat1Label: "२८% अन्न सेवा कचरा",
      stat1Desc: "चुकीच्या अंदाजामुळे बेकरी आणि कॅफेमधून होणारा कचरा.",
      stat2Label: "१३ कोटी टन",
      stat2Desc: "जगभरात दरवर्षी रिटेल स्तरावर वाया जाणारे अन्न.",
      stat3Label: "₹१४,३५० / काउंटर",
      stat3Desc: "मूलभूत प्लॅनवर दरमहा वाचवले जाणारे सरासरी रोख उत्पन्न (५७ पट नफा)."
    }
  },
  gu: {
    langName: "ગુજરાતી (Gujarati)",
    nav: {
      overview: "ઝાંખી અને આંકડા",
      explain: "4OURSIGHT કેવી રીતે કામ કરે છે 💡",
      billing: "કાઉન્ટર બિલિંગ POS ⚡",
      pyr: "PYR એક્સેલ લેજર 📊",
      network: "ગ્રાહક નેટવર્ક 🤝",
      roi: "નફો કેલ્ક્યુલેટર 📈",
      pricing: "પ્લાન અને ટીમ 💎"
    },
    actions: {
      audioBriefing: "AI ઓડિયો બ્રીફિંગ",
      aiStrategist: "AI સલાહકાર",
      explainToOthers: "અન્યને સમજાવો",
      startTrial: "30 દિવસની મફત ટ્રાયલ",
      openBilling: "કાઉન્ટર બિલિંગ ખોલો",
      viewPyr: "PYR લેજર જુઓ",
      addBatch: "સવારનો સ્ટોક ઉમેરો",
      importData: "ફાઇલ ઇમ્પોર્ટ કરો"
    },
    hero: {
      badge: "UNEP 2024 ફૂડ વેસ્ટ ઇન્ડેક્સ મુજબ",
      headline: "શું તમે તેને કચરો બનતા પહેલા વેચી શકો છો?",
      subheadline: "બેકરી, કાફે અને કરિયાણાની દુકાનો ખોટા અંદાજથી રોજ 15% આવક ગુમાવે છે. 4OURSIGHT પાછલા વર્ષના રેકોર્ડ્સ (PYR) વડે વધારાના સ્ટોકને નફામાં ફેરવે છે—કોઈપણ POS મશીન બદલ્યા વિના.",
      ctaPrimary: "કાઉન્ટર બિલિંગ POS ખોલો",
      ctaSecondary: "PYR એક્સેલ લેજર જુઓ",
      ctaExplain: "કામ કરવાની પદ્ધતિ જુઓ"
    },
    unep: {
      title: "ખોરાકનો બગાડ અને આર્થિક પુનઃપ્રાપ્તિ",
      subtitle: "UNEP 2024 ના આંકડા અને 4OURSIGHT નું રોકડ વળતર.",
      stat1Label: "28% ફૂડ-સર્વિસ વેસ્ટ",
      stat1Desc: "ખોટા અંદાજને કારણે કેફે અને બેકરીઓમાં થતો કચરો.",
      stat2Label: "13 કરોડ ટન",
      stat2Desc: "વિશ્વભરમાં રિટેલ સ્તરે બગડતો વાર્ષિક ખોરાક.",
      stat3Label: "₹14,350 / કાઉન્ટર",
      stat3Desc: "બેઝિક પ્લાન (₹250/મહિને) પર દર મહિને સરેરાશ બચાવવામાં આવતી રોકડ."
    }
  },
  ta: {
    langName: "தமிழ் (Tamil)",
    nav: {
      overview: "கண்ணோட்டம்",
      explain: "செயல்முறை விளக்கம் 💡",
      billing: "கவுண்டர் பில்லிங் POS ⚡",
      pyr: "PYR எக்செல் லெட்ஜர் 📊",
      network: "நுகர்வோர் வலையமைப்பு 🤝",
      roi: "லாபக் கணக்கீடு 📈",
      pricing: "விலை & குழு 💎"
    },
    actions: {
      audioBriefing: "AI ஆடியோ சுருக்கம்",
      aiStrategist: "AI ஆலோசகர்",
      explainToOthers: "பிறருக்கு விளக்க",
      startTrial: "30 நாள் இலவச சோதனை",
      openBilling: "பில்லிங் திறக்க",
      viewPyr: "PYR லெட்ஜர் பார்க்க",
      addBatch: "காலை தொகுப்பை சேர்க்க",
      importData: "கோப்பை பதிவேற்ற"
    },
    hero: {
      badge: "UNEP 2024 உணவு விரயக் குறைப்பு தரநிலை",
      headline: "அது குப்பையாக மாறுவதற்கு முன்பு உங்களால் விற்க முடியுமா?",
      subheadline: "பேக்கரிகள் மற்றும் கஃபேக்கள் விற்கப்படாத பொருட்களால் 15% வருவாயை இழக்கின்றன. 4OURSIGHT கடந்த கால பதிவுகள் (PYR) மற்றும் தானியங்கி விலை மாற்றம் மூலம் உணவு விரயத்தை பணமாக மாற்றுகிறது.",
      ctaPrimary: "கவுண்டர் பில்லிங் திறக்க",
      ctaSecondary: "PYR எக்செல் லெட்ஜர் பார்க்க",
      ctaExplain: "எவ்வாறு செயல்படுகிறது"
    },
    unep: {
      title: "உணவு விரய நெருக்கடி மற்றும் தீர்வு",
      subtitle: "UNEP 2024 தரவுகள் மற்றும் 4OURSIGHT மூலம் பெறப்படும் வருவாய்.",
      stat1Label: "28% உணவு விரயம்",
      stat1Desc: "முறையற்ற கணிப்பால் உணவு சேவை நிறுவனங்களில் ஏற்படும் விரயம்.",
      stat2Label: "130 மில்லியன் டன்",
      stat2Desc: "உலகளவில் சில்லறை விற்பனையில் வீணாகும் வருடாந்திர உணவு.",
      stat3Label: "₹14,350 / கவுண்டர்",
      stat3Desc: "மாதந்தோறும் சேமிக்கப்படும் சராசரி ரொக்கத் தொகை."
    }
  }
};

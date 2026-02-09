import React from 'react';
import { Link } from 'react-router-dom';

// We add ({ lang }) here to "catch" the language from App.jsx
const About = ({ lang }) => {
  
  // Translation object for all text on the page
  const content = {
    en: {
      badge: "Our Story",
      heroTitle1: "Bridging the Gap",
      heroTitle2: "From Farm to Home.",
      heroDesc: "MilkHub started with a simple mission in Mandsaur: to ensure that every household receives the purest dairy products while supporting our local hardworking sellers like Mahavir Dhud.",
      values: [
        { title: "Pure Quality", desc: "No preservatives, no chemicals. Just 100% pure milk from local farms.", icon: "🌿" },
        { title: "Tech Driven", desc: "Professional dashboards for buyers and sellers to track every liter.", icon: "📱" },
        { title: "Local Impact", desc: "Strengthening the Mandsaur dairy economy one delivery at a time.", icon: "🏘️" }
      ]
    },
    hi: {
      badge: "हमारी कहानी",
      heroTitle1: "खेत से घर तक",
      heroTitle2: "की दूरी कम करना।",
      heroDesc: "मिल्क-हब (MilkHub) की शुरुआत मंदसौर में एक साधारण मिशन के साथ हुई थी: यह सुनिश्चित करना कि हर घर को शुद्धतम डेयरी उत्पाद मिलें और हमारे स्थानीय मेहनती विक्रेताओं जैसे महावीर धुद का समर्थन हो सके।",
      values: [
        { title: "शुद्ध गुणवत्ता", desc: "कोई संरक्षक नहीं, कोई रसायन नहीं। स्थानीय खेतों से सिर्फ 100% शुद्ध दूध।", icon: "🌿" },
        { title: "तकनीक आधारित", desc: "खरीदारों और विक्रेताओं के लिए हर लीटर को ट्रैक करने के लिए पेशेवर डैशबोर्ड।", icon: "📱" },
        { title: "स्थानीय प्रभाव", desc: "एक समय में एक डिलीवरी के माध्यम से मंदसौर की डेयरी अर्थव्यवस्था को मजबूत करना।", icon: "🏘️" }
      ]
    }
  };

  // Select the correct translation based on lang prop
  const t = content[lang || 'en'];

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500 selection:text-white">
      {/* Hero Section */}
      <div className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-sky-600 font-black uppercase tracking-[0.2em] text-xs mb-4 block">
            {t.badge}
          </span>
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 mb-8 leading-tight">
            {t.heroTitle1} <br />
            <span className="text-sky-500">{t.heroTitle2}</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            {t.heroDesc}
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {t.values.map((val, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-sky-100 transition-all group text-left">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{val.icon}</div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{val.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
import React from 'react';
import { Link } from 'react-router-dom';

// We catch the lang prop passed from App.jsx to toggle English/Hindi
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
      ],
      ctaTitle: "Ready to get fresh milk?",
      ctaBtn: "Join MilkHub Today"
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
      ],
      ctaTitle: "ताज़ा दूध प्राप्त करने के लिए तैयार हैं?",
      ctaBtn: "आज ही मिल्क-हब से जुड़ें"
    }
  };

  // Select the correct translation based on lang prop
  const t = content[lang || 'en'];

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500 selection:text-white">
      {/* Hero Section */}
      <div className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-sky-600 font-black uppercase tracking-[0.2em] text-xs mb-4 block animate-bounce">
            {t.badge}
          </span>
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
            {t.heroTitle1} <br />
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              {t.heroTitle2}
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            {t.heroDesc}
          </p>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {t.values.map((val, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 group">
              <div className="text-5xl mb-6 group-hover:rotate-12 transition-transform inline-block">
                {val.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                {val.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Small Call to Action Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-slate-900 rounded-[4rem] p-16 text-center relative overflow-hidden">
          <h2 className="text-4xl font-black text-white mb-8 relative z-10">
            {t.ctaTitle}
          </h2>
          <Link 
            to="/register" 
            className="inline-block px-12 py-5 bg-sky-500 text-white font-black rounded-2xl shadow-xl shadow-sky-500/20 hover:bg-sky-400 transition-all relative z-10"
          >
            {t.ctaBtn}
          </Link>
          {/* Abstract background shape */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
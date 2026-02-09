import { useEffect, useState } from 'react';
import AnalyticsChart from '../components/AnalyticsChart';
import API_URL from '../config/api';

// 1. Elaborated Inventory Summary Component
const InventorySummary = ({ lang, t }) => {
  const data = [
    { item: t.milk, total: `142.5 ${t.unit}`, icon: "🥛", border: "border-sky-500" },
    { item: t.paneer, total: `12.0 ${t.kg}`, icon: "🧀", border: "border-orange-500" },
    { item: t.curd, total: `45 ${t.pkts}`, icon: "🥣", border: "border-green-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {data.map((i, index) => (
        <div 
          key={index} 
          className={`bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 ${i.border} hover:-translate-y-2 transition-all duration-300 text-left relative overflow-hidden group`}
        >
          <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2 relative z-10">
            {i.item}
          </p>
          <p className="text-3xl font-black text-slate-900 italic relative z-10">
            {i.total}
          </p>
          <div className="absolute top-2 right-4 opacity-5 text-6xl group-hover:scale-110 group-hover:opacity-10 transition-all">
            {i.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

// 2. Main Seller Dashboard
const SellerDashboard = ({ lang }) => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = {
    en: {
      title: "Delivery",
      highlight: "Manager",
      welcome: "Welcome back, Mahavir Dhud",
      branch: "Mandsaur Branch",
      statTotal: "Total Customers",
      statDemand: "Projected Demand",
      chartTitle: "Weekly Revenue Trend",
      tableTitle: "Today's Delivery Route",
      colQty: "Standard Qty",
      btnMark: "Mark Delivered",
      loadingText: "Fetching Mandsaur Buyers...",
      unit: "L",
      kg: "kg",
      pkts: "pkts",
      milk: "Milk",
      paneer: "Paneer",
      curd: "Curd"
    },
    hi: {
      title: "डिलीवरी",
      highlight: "प्रबंधक",
      welcome: "वापस स्वागत है, महावीर धुद",
      branch: "मंदसौर शाखा",
      statTotal: "कुल ग्राहक",
      statDemand: "अनुमानित मांग",
      chartTitle: "साप्ताहिक राजस्व रुझान",
      tableTitle: "आज का डिलीवरी रूट",
      colQty: "मानक मात्रा",
      btnMark: "डिलिवरी मार्क करें",
      loadingText: "खरीदारों की जानकारी लोड हो रही है...",
      unit: "लीटर",
      kg: "किलो",
      pkts: "पैकेट",
      milk: "दूध",
      paneer: "पनीर",
      curd: "दही"
    }
  }[lang || 'en'];

  const weeklyEarnings = [
    { name: 'Mon', amount: 4200 },
    { name: 'Tue', amount: 3800 },
    { name: 'Wed', amount: 5100 },
    { name: 'Thu', amount: 4600 },
    { name: 'Fri', amount: 5900 },
    { name: 'Sat', amount: 7200 },
    { name: 'Sun', amount: 6800 },
  ];

  useEffect(() => {
    // FIXED: Using dynamic API_URL for live environment
    fetch(`${API_URL}/api/users/buyers`)
      .then(res => res.json())
      .then(data => {
        setBuyers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching buyers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-12 text-left">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">
              {t.title} <span className="text-sky-500">{t.highlight}</span>
            </h1>
            <p className="text-slate-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {t.welcome}
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 font-black text-slate-700">
            📍 {t.branch}
          </div>
        </header>

        <InventorySummary lang={lang} t={t} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50">
            <p className="text-slate-900 font-black mb-6 uppercase text-xs tracking-widest opacity-50">
                {t.chartTitle}
            </p>
            <AnalyticsChart data={weeklyEarnings} lang={lang} />
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 flex-1 flex flex-col justify-center">
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest mb-2">{t.statTotal}</p>
              <p className="text-6xl font-black text-slate-900">{buyers.length}</p>
            </div>
            <div className="bg-sky-500 p-8 rounded-[2.5rem] shadow-xl text-white flex-1 flex flex-col justify-center relative overflow-hidden">
              <p className="text-sky-100 font-black uppercase text-xs tracking-widest mb-2 relative z-10">{t.statDemand}</p>
              <p className="text-6xl font-black relative z-10">142.5 <span className="text-2xl font-bold">{t.unit}</span></p>
              <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 rotate-12">🥛</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
            <h3 className="text-2xl font-black text-slate-900">{t.tableTitle}</h3>
            <span className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-black text-slate-400 uppercase tracking-tighter">
                {new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
            </span>
          </div>
          
          <div className="divide-y divide-slate-50">
            {loading ? (
              <div className="p-20 text-center font-bold text-slate-300 animate-pulse text-xl">{t.loadingText}</div>
            ) : (
              buyers.map((buyer) => (
                <div key={buyer._id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 transition-all">
                  <div className="flex items-center gap-6 w-full md:w-auto text-left">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">👤</div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">{buyer.name}</h4>
                      <p className="text-slate-400 font-bold text-sm uppercase tracking-wide">📍 {buyer.location || "Mandsaur, MP"}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto gap-12">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.colQty}</p>
                      <p className="font-black text-slate-900 text-xl italic">1.5 <span className="text-sm text-sky-500 font-black">{t.unit}</span></p>
                    </div>
                    
                    <button className="px-8 py-4 bg-green-500 text-white rounded-2xl font-black shadow-lg shadow-green-100 hover:bg-green-600 hover:-translate-y-1 transition-all active:scale-95">
                      {t.btnMark}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
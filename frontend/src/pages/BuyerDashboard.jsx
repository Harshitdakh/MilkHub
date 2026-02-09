import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API_URL from '../config/api';

const BuyerDashboard = ({ lang }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Translation Object
  const t = {
    en: {
      account: "Buyer Account", greeting: "Hello",
      connected: "Connected to Mahaveer Dhud", billTitle: "Total Amount (Feb)",
      dueDate: "Due Date: March 1, 2026", chartTitle: "Milk Consumption Log",
      chartSub: "Recent Activity", todayTitle: "Current Plan",
      statusDelivered: "Delivered", statusPending: "Pending",
      historyTitle: "Recent Deliveries", paid: "PAID",
      unit: "L", buffalo: "Buffalo", btnEdit: "Change Plan"
    },
    hi: {
      account: "खरीदार खाता", greeting: "नमस्ते",
      connected: "महावीर धुद से जुड़े हैं", billTitle: "कुल राशि (फरवरी)",
      dueDate: "देय तिथि: 1 मार्च, 2026", chartTitle: "दूध खपत लॉग",
      chartSub: "हाल की गतिविधि", todayTitle: "वर्तमान प्लान",
      statusDelivered: "डिलिवर हुआ", statusPending: "बाकी है",
      historyTitle: "हाल की डिलीवरी", paid: "सफल",
      unit: "ली", buffalo: "भैंस", btnEdit: "प्लान बदलें"
    }
  }[lang || 'en'];

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        // FIXED: Replaced localhost with ${API_URL}
        const subRes = await fetch(`${API_URL}/api/subscription/my-subscription`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const subData = await subRes.json();

        // FIXED: Replaced localhost with ${API_URL}
        const historyRes = await fetch(`${API_URL}/api/delivery/buyer/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const historyData = await historyRes.json();

        if (subData.success) {
          setUserData({
            ...subData.data,
            history: historyData.data || []
          });
        }
      } catch (error) {
        console.error("Error fetching buyer dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyerData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest animate-pulse">Loading Mandsaur Dairy Data...</div>;
  
  if (!userData) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <div className="text-6xl mb-6">🥛</div>
      <h2 className="text-2xl font-black mb-2">No Active Subscription</h2>
      <p className="text-slate-500 mb-8">Please set your daily milk order on the Home Page first.</p>
      <a href="/" className="px-8 py-3 bg-sky-500 text-white rounded-2xl font-black shadow-lg">Go to Home</a>
    </div>
  );

  const chartData = userData.history.length > 0 
    ? userData.history.slice(-7).map(item => ({
        day: new Date(item.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { day: '2-digit', month: 'short' }),
        qty: item.quantity
      }))
    : [{ day: 'N/A', qty: 0 }];

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-block px-4 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">{t.account}</div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
              {t.greeting}, <span className="text-sky-500">{localStorage.getItem('userName') || 'User'}</span>
            </h1>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-black text-slate-700 uppercase text-xs tracking-tighter">{t.connected}</span>
          </div>
        </header>

        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10">
              <p className="text-sky-400 font-black uppercase text-xs tracking-widest mb-2">{t.billTitle}</p>
              <h2 className="text-6xl font-black mb-4">₹{userData.totalDailyCost ? userData.totalDailyCost * 30 : 0}</h2>
              <p className="font-bold opacity-70 text-sm">{t.dueDate}</p>
              <button className="mt-6 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl text-xs font-bold border border-white/20 transition-all">{t.btnEdit}</button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900">{t.chartTitle}</h3>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.chartSub}</span>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorQty" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="qty" stroke="#0ea5e9" strokeWidth={4} fill="url(#colorQty)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 flex flex-col justify-between group">
            <div>
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest mb-4">{t.todayTitle}</p>
              <div className="flex items-center gap-6 mb-8">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-500">🥛</div>
                <div>
                  <h4 className="text-4xl font-black text-slate-900">{userData.quantity} {userData.unit || 'L'}</h4>
                  <p className="text-sky-500 font-bold">{userData.milkType || userData.product}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-50 pt-6">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider ${userData.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${userData.status === 'Delivered' ? 'bg-green-600' : 'bg-amber-600'}`}></span>
                {userData.status === 'Delivered' ? t.statusDelivered : t.statusPending}
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50">
            <h3 className="text-xl font-black text-slate-900 mb-6">{t.historyTitle}</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {userData.history.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">🥛</div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{new Date(item.date).toDateString()}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight">{item.quantity}L • {item.product}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-600 font-black text-[10px] rounded-lg border border-green-100">{t.paid}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;  
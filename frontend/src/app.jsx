import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';

// Page Imports
import Login from './pages/login'; 
import Register from './pages/register';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';

// 1. Smart Navigation Component
const Navbar = ({ lang, toggleLang, userRole, handleLogout }) => {
  const location = useLocation();
  
  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 px-8 py-4 text-left">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" onClick={handleHomeClick} className="text-3xl font-black tracking-tighter text-slate-900 flex items-center gap-2">
          <span className="bg-sky-500 text-white p-2 rounded-xl text-xl">🥛</span>
          Milk<span className="text-sky-500">Hub</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
          <NavLink to="/" onClick={handleHomeClick} className={({ isActive }) => isActive ? "text-sky-500" : "hover:text-sky-500 transition-colors"}>
            {lang === 'en' ? 'Home' : 'होम'}
          </NavLink>
          <a href="#products" className="hover:text-sky-500 transition-colors">{lang === 'en' ? 'Products' : 'उत्पाद'}</a>
          <a href="#reviews" className="hover:text-sky-500 transition-colors">{lang === 'en' ? 'Reviews' : 'रिव्यु'}</a>
          <a href="#contact" className="hover:text-sky-500 transition-colors">{lang === 'en' ? 'Contact' : 'संपर्क'}</a>
          
          {userRole && (
            <NavLink to={userRole === 'seller' ? "/dashboard" : "/my-orders"} className="text-sky-600">
              {lang === 'en' ? 'Dashboard' : 'डैशबोर्ड'}
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className="px-3 py-1.5 bg-slate-100 rounded-lg font-black text-[10px] uppercase border border-slate-200">
            🌐 {lang === 'en' ? 'EN' : 'HI'}
          </button>

          {!userRole ? (
            <>
              <Link to="/login" className="hidden sm:block px-6 py-2.5 rounded-xl border-2 border-slate-100 font-bold text-sm">
                {lang === 'en' ? 'Login' : 'लॉगिन'}
              </Link>
              <Link to="/register" className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm">
                {lang === 'en' ? 'Join Now' : 'जुड़िये'}
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="px-6 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm border border-red-100 hover:bg-red-100 transition-all">
              {lang === 'en' ? 'Logout' : 'लॉगआउट'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

// 2. The Merged Home Component
const Home = ({ lang, userRole }) => {
  const [category, setCategory] = useState('milk'); 
  const [product, setProduct] = useState('cow'); 
  const [price, setPrice] = useState(40);
  const [qty, setQty] = useState(1);

  const t = {
    en: {
      badge: "✨ Freshness Delivered Daily",
      hero1: "Pure Milk,", hero2: "Right to Your Door.",
      sub: "Professional dairy management in Mandsaur.",
      buyerTitle: "Quick Order",
      catMilk: "Milk", catDairy: "Dairy",
      paneer: "Paneer", curd: "Curd", lassi: "Lassi",
      unitKg: "kg", unitL: "L",
      total: "Total", confirm: "Set Subscription",
      sellerTitle: "Delivery Route",
      startBtn: "Start Route",
      successMsg: "Order Saved Successfully!",
      errorMsg: "Failed to save order."
    },
    hi: {
      badge: "✨ ताज़गी रोज़ाना डिलीवर",
      hero1: "शुद्ध दूध,", hero2: "सीधे आपके द्वार।",
      sub: "मंदसौर में पेशेवर डेयरी प्रबंधन।",
      buyerTitle: "त्वरित ऑर्डर",
      catMilk: "दूध", catDairy: "डेयरी",
      paneer: "पनीर", curd: "दही", lassi: "लस्सी",
      unitKg: "किलो", unitL: "लीटर",
      total: "कुल", confirm: "ऑर्डर कन्फर्म करें",
      sellerTitle: "डिलीवरी रूट",
      startBtn: "रूट शुरू करें",
      successMsg: "ऑर्डर सफलतापूर्वक सहेजा गया!",
      errorMsg: "ऑर्डर सहेजा नहीं जा सका।"
    }
  }[lang || 'en'];

  const handleProductChange = (prod) => {
    setProduct(prod);
    const prices = { cow: 40, buffalo: 45, paneer: 320, curd: 60, lassi: 25 };
    setPrice(prices[prod]);
  };

  const handleSubscription = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/subscription/set-daily', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Added Auth Token
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          category, product, price, qty
        })
      });
      if (response.ok) alert(t.successMsg);
      else alert(t.errorMsg);
    } catch (error) {
      alert(t.errorMsg);
    }
  };

  return (
    <div className="flex flex-col scroll-smooth">
      <section className="min-h-[80vh] flex items-center justify-center border-b border-slate-50">
        {!userRole ? (
          <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-full font-bold text-sm mb-8">{t.badge}</div>
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.1] mb-8">{t.hero1} <br /><span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">{t.hero2}</span></h1>
              <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed font-medium">{t.sub}</p>
            </div>
            <div className="flex-1 text-[12rem] bg-slate-50 rounded-[4rem] aspect-square flex items-center justify-center">🥛</div>
          </div>
        ) : userRole === 'buyer' ? (
          <div className="max-w-7xl mx-auto px-6 py-16 text-left w-full">
            <h2 className="text-4xl font-black mb-10 text-slate-900">{t.buyerTitle}</h2>
            <div className="flex gap-4 mb-8">
               <button onClick={() => {setCategory('milk'); handleProductChange('cow');}} className={`px-8 py-3 rounded-2xl font-black ${category === 'milk' ? 'bg-sky-500 text-white' : 'bg-slate-100'}`}>{t.catMilk}</button>
               <button onClick={() => {setCategory('dairy'); handleProductChange('paneer');}} className={`px-8 py-3 rounded-2xl font-black ${category === 'dairy' ? 'bg-sky-500 text-white' : 'bg-slate-100'}`}>{t.catDairy}</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
                <div className="flex flex-wrap gap-3 mb-8">
                  {category === 'milk' ? (
                    <>
                      <button onClick={() => handleProductChange('cow')} className={`px-6 py-3 rounded-xl font-bold border-2 ${product === 'cow' ? 'border-sky-500 bg-sky-50' : ''}`}>🐄 Cow</button>
                      <button onClick={() => handleProductChange('buffalo')} className={`px-6 py-3 rounded-xl font-bold border-2 ${product === 'buffalo' ? 'border-sky-500 bg-sky-50' : ''}`}>🐃 Buffalo</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleProductChange('paneer')} className={`px-6 py-3 rounded-xl font-bold border-2 ${product === 'paneer' ? 'border-sky-500 bg-sky-50' : ''}`}>🧀 {t.paneer}</button>
                      <button onClick={() => handleProductChange('curd')} className={`px-6 py-3 rounded-xl font-bold border-2 ${product === 'curd' ? 'border-sky-500 bg-sky-50' : ''}`}>🥣 {t.curd}</button>
                      <button onClick={() => handleProductChange('lassi')} className={`px-6 py-3 rounded-xl font-bold border-2 ${product === 'lassi' ? 'border-sky-500 bg-sky-50' : ''}`}>🥤 {t.lassi}</button>
                    </>
                  )}
                </div>
                <div className="mb-10">
                  <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <button onClick={() => setQty(Math.max(0.5, qty - 0.5))} className="w-12 h-12 bg-white rounded-xl shadow-sm font-black text-xl">-</button>
                    <span className="flex-1 text-center text-2xl font-black text-slate-900">{qty} {product === 'paneer' ? t.unitKg : t.unitL}</span>
                    <button onClick={() => setQty(qty + 0.5)} className="w-12 h-12 bg-white rounded-xl shadow-sm font-black text-xl">+</button>
                  </div>
                </div>
                <button onClick={handleSubscription} className="w-full py-5 bg-sky-500 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-sky-600 transition-all">{t.confirm}</button>
              </div>
              <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex-1 relative overflow-hidden flex flex-col justify-center text-left">
                <p className="text-sky-400 font-black uppercase tracking-widest mb-2">{t.total}</p>
                <h3 className="text-8xl font-black mb-4">₹{price * qty}</h3>
                <p className="text-xl font-bold opacity-70">• {qty}{product === 'paneer' ? t.unitKg : t.unitL} {product}</p>
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full blur-[120px] opacity-30 -mr-20 -mt-20"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-20 text-left w-full">
            <h2 className="text-4xl font-black mb-10 text-slate-900">{t.sellerTitle}</h2>
            <div className="bg-slate-900 p-12 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-10 overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-4xl font-black mb-4 text-left">{lang === 'en' ? "Mahaveer's Route" : "महावीर का रूट"}</h3>
                <Link to="/dashboard" className="bg-sky-500 px-12 py-5 rounded-2xl font-black text-xl hover:bg-sky-400 transition-all shadow-lg block w-fit">{t.startBtn}</Link>
              </div>
              <div className="text-[15rem] opacity-10 absolute -right-10 rotate-12">🚚</div>
            </div>
          </div>
        )}
      </section>

      <section id="products"><Products lang={lang} /></section>
      <section id="reviews"><Reviews lang={lang} /></section>
      <section id="contact"><Contact lang={lang} /></section>
    </div>
  );
};

// 3. Main App Hub
export default function App() {
  const [lang, setLang] = useState('en');
  
  // Persistence Initialization
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  const toggleLang = () => setLang(prev => prev === 'en' ? 'hi' : 'en');

  // Stay Logged In Logic
  const handleLoginSuccess = (role, token, userId) => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-sky-500 selection:text-white">
      <Navbar lang={lang} toggleLang={toggleLang} userRole={userRole} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home lang={lang} userRole={userRole} />} />
          <Route path="/login" element={<Login lang={lang} handleLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register lang={lang} />} />
          <Route path="/dashboard" element={<SellerDashboard lang={lang} />} />
          <Route path="/my-orders" element={<BuyerDashboard lang={lang} />} />
        </Routes>
      </main>
      <footer className="py-20 bg-slate-50 border-t border-slate-100 text-center text-slate-400">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mb-8 text-sky-500 font-black uppercase text-xs tracking-widest">↑ {lang === 'en' ? 'Back to Top' : 'वापस ऊपर'}</button>
        <p className="font-bold text-xs uppercase tracking-widest">© 2026 MilkHub Mandsaur.</p>
      </footer>
    </div>
  );
}
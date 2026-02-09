import React from 'react';
import { Link } from 'react-router-dom';

// We catch the 'lang' prop here to synchronize with the App state
const Products = ({ lang }) => {
  
  const content = {
    en: {
      badge: "Our Catalog",
      title: "Freshness in",
      highlight: "Every Pack",
      sub: "From daily milk to premium paneer, we bring the best of Mandsaur's dairy to your kitchen.",
      bannerTitle: "Need Bulk Supply for Events?",
      bannerSub: "We provide bulk paneer, curd, and milk for weddings and parties in Mandsaur with guaranteed quality.",
      bannerBtn: "Enquire Now"
    },
    hi: {
      badge: "हमारी सूची",
      title: "हर पैक में",
      highlight: "ताजगी",
      sub: "दैनिक दूध से लेकर प्रीमियम पनीर तक, हम मंदसौर की बेहतरीन डेयरी आपके किचन तक लाते हैं।",
      bannerTitle: "क्या आयोजनों के लिए थोक आपूर्ति चाहिए?",
      bannerSub: "हम गारंटीकृत गुणवत्ता के साथ मंदसौर में शादियों और पार्टियों के लिए थोक पनीर, दही और दूध प्रदान करते हैं।",
      bannerBtn: "अभी पूछताछ करें"
    }
  };

  const dairyProducts = [
    {
      id: 1,
      name: lang === 'en' ? "Pure Milk" : "शुद्ध दूध",
      description: lang === 'en' ? "Farm-fresh buffalo and cow milk delivered daily in Mandsaur." : "मंदसौर में रोजाना डिलीवर होने वाला खेत का ताजा भैंस और गाय का दूध।",
      price: "₹60/L",
      unit: lang === 'en' ? "Liters" : "लीटर",
      gradient: "from-blue-50 to-sky-100",
      icon: "🥛",
      tag: lang === 'en' ? "Best Seller" : "सबसे लोकप्रिय"
    },
    {
      id: 2,
      name: lang === 'en' ? "Fresh Paneer" : "ताज़ा पनीर",
      description: lang === 'en' ? "Soft, handcrafted cottage cheese made from pure whole milk." : "शुद्ध मलाईदार दूध से बना नरम, हाथ से तैयार किया गया पनीर।",
      price: "₹400/kg",
      unit: lang === 'en' ? "kg" : "किलो",
      gradient: "from-orange-50 to-yellow-100",
      icon: "🧀",
      tag: lang === 'en' ? "Freshly Made" : "ताज़ा निर्मित"
    },
    {
      id: 3,
      name: lang === 'en' ? "Natural Curd" : "प्राकृतिक दही",
      description: lang === 'en' ? "Thick, creamy set curd with no added preservatives." : "बिना किसी मिलावट के गाढ़ा और मलाईदार जमा हुआ दही।",
      price: "₹80/kg",
      unit: lang === 'en' ? "kg/L" : "किलो/ली",
      gradient: "from-green-50 to-emerald-100",
      icon: "🥣",
      tag: lang === 'en' ? "Healthy Choice" : "स्वस्थ विकल्प"
    },
    {
      id: 4,
      name: lang === 'en' ? "Masala Chass" : "मसाला छाछ",
      description: lang === 'en' ? "Refreshing buttermilk blended with traditional Indian spices." : "पारंपरिक भारतीय मसालों के साथ मिश्रित ताज़ा छाछ।",
      price: "₹20/pkt",
      unit: lang === 'en' ? "Packet" : "पैकेट",
      gradient: "from-purple-50 to-indigo-100",
      icon: "🥤",
      tag: lang === 'en' ? "Cooler" : "शीतल पेय"
    },
    {
      id: 5,
      name: lang === 'en' ? "Sweet Lassi" : "मीठी लस्सी",
      description: lang === 'en' ? "Rich, creamy traditional sweet lassi for the perfect refreshment." : "बेहतरीन ताजगी के लिए भरपूर, मलाईदार पारंपरिक मीठी लस्सी।",
      price: "₹40/btl",
      unit: lang === 'en' ? "Bottle" : "बोतल",
      gradient: "from-pink-50 to-rose-100",
      icon: "🍶",
      tag: lang === 'en' ? "Premium" : "प्रीमियम"
    }
  ];

  const t = content[lang || 'en'];

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-sky-500 font-black uppercase tracking-widest text-sm bg-sky-50 px-4 py-2 rounded-full">
            {t.badge}
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mt-6 mb-4">
            {t.title} <span className="text-sky-500">{t.highlight}</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            {t.sub}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dairyProducts.map((product) => (
            <div 
              key={product.id} 
              className={`group relative bg-gradient-to-br ${product.gradient} p-1 rounded-[3rem] transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-100`}
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-[2.8rem] p-8 h-full border border-white/50 flex flex-col">
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-800 border border-slate-100">
                  {product.tag}
                </div>

                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {product.icon}
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-3xl font-black text-slate-900">{product.price.split('/')[0]}</span>
                    <span className="text-slate-400 font-bold text-sm ml-1">/{product.unit}</span>
                  </div>
                  
                  <Link 
                    to="/login" 
                    className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-sky-500 transition-colors shadow-lg shadow-slate-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Order Banner */}
        <div className="mt-24 bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
          <h2 className="text-4xl font-black mb-4 relative z-10">{t.bannerTitle}</h2>
          <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto relative z-10">
            {t.bannerSub}
          </p>
          <Link to="/contact" className="bg-sky-500 hover:bg-sky-400 text-white px-10 py-4 rounded-2xl font-black transition-all inline-block relative z-10">
            {t.bannerBtn}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
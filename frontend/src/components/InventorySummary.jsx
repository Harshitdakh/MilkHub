import React from 'react';

const InventorySummary = ({ lang }) => {
  // 1. Translation Dictionary for the Summary Cards
  const t = {
    en: {
      milk: "Total Milk",
      paneer: "Fresh Paneer",
      curd: "Thick Curd",
      unitL: "L",
      unitKg: "kg",
      unitPkt: "pkts",
      inventory: "Daily Stock"
    },
    hi: {
      milk: "कुल दूध",
      paneer: "ताज़ा पनीर",
      curd: "गाढ़ा दही",
      unitL: "लीटर",
      unitKg: "किलो",
      unitPkt: "पैकेट",
      inventory: "दैनिक स्टॉक"
    }
  }[lang || 'en'];

  // 2. Data Mapped to the Translation Object
  const data = [
    { 
      item: t.milk, 
      total: `142.5 ${t.unitL}`, 
      icon: "🥛", 
      color: "border-sky-500", 
      bg: "bg-sky-50" 
    },
    { 
      item: t.paneer, 
      total: `12.0 ${t.unitKg}`, 
      icon: "🧀", 
      color: "border-orange-500", 
      bg: "bg-orange-50" 
    },
    { 
      item: t.curd, 
      total: `45 ${t.unitPkt}`, 
      icon: "🥣", 
      color: "border-green-500", 
      bg: "bg-green-50" 
    }
  ];

  return (
    <div className="mb-12">
      <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] mb-6 text-left">
        {t.inventory}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((i, index) => (
          <div 
            key={index} 
            className={`relative group bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 ${i.color} hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden`}
          >
            {/* Background Decorative Icon */}
            <div className="absolute -right-2 -top-2 opacity-5 text-8xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 select-none">
              {i.icon}
            </div>

            <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2 relative z-10">
              {i.item}
            </p>
            <p className="text-4xl font-black text-slate-900 italic relative z-10">
              {i.total}
            </p>
            
            {/* Visual Indicator */}
            <div className={`mt-4 w-12 h-1.5 rounded-full ${i.bg} relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 h-full w-2/3 rounded-full ${i.color.replace('border', 'bg')}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventorySummary;
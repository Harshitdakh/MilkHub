import React from 'react';

// Catching the 'lang' prop to enable English/Hindi switching
const Reviews = ({ lang }) => {
  
  const content = {
    en: {
      title: "What Our",
      highlight: "Community Says",
      reviews: [
        { name: "Rahul Sharma", loc: "Nai Abadi", text: "The MilkHub app makes it so easy to track my daily buffalo milk. The quality is always top-notch!", stars: 5 },
        { name: "Priya Patidar", loc: "Mhow-Neemuch Road", text: "I love the new Paneer and Curd options. Mahavir delivers it fresh every single morning.", stars: 5 },
        { name: "Ankit Jain", loc: "Kalakhet", text: "Finally a professional way to manage dairy in Mandsaur. The charts help me track my monthly spending.", stars: 5 }
      ]
    },
    hi: {
      title: "हमारा",
      highlight: "समुदाय क्या कहता है",
      reviews: [
        { name: "राहुल शर्मा", loc: "नई आबादी", text: "मिल्क-हब ऐप मेरे दैनिक भैंस के दूध को ट्रैक करना बहुत आसान बनाता है। गुणवत्ता हमेशा बेहतरीन होती है!", stars: 5 },
        { name: "प्रिया पाटीदार", loc: "महू-नीमच रोड", text: "मुझे नए पनीर और दही के विकल्प बहुत पसंद हैं। महावीर इसे हर सुबह ताज़ा डिलीवर करते हैं।", stars: 5 },
        { name: "अंकित जैन", loc: "कालाखेत", text: "अंततः मंदसौर में डेयरी प्रबंधित करने का एक पेशेवर तरीका। चार्ट मुझे मेरे मासिक खर्च को ट्रैक करने में मदद करते हैं।", stars: 5 }
      ]
    }
  };

  const t = content[lang || 'en'];

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-16">
          {t.title} <span className="text-sky-500">{t.highlight}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.reviews.map((rev, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 text-left relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-sky-100">
              {/* Decorative Quote Mark */}
              <div className="text-sky-400 text-6xl absolute -top-2 -left-2 opacity-10 font-serif">“</div>
              
              <div className="flex text-yellow-400 mb-6">
                {[...Array(rev.stars)].map((_, i) => <span key={i}>★</span>)}
              </div>
              
              <p className="text-slate-600 font-medium italic mb-8 relative z-10 leading-relaxed">
                "{rev.text}"
              </p>
              
              <div className="border-t border-slate-50 pt-6">
                <p className="font-black text-slate-900 text-lg">{rev.name}</p>
                <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mt-1">
                  {rev.loc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
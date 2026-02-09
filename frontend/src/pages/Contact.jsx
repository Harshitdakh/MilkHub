import React from 'react';

// Catch the 'lang' prop to make translations work
const Contact = ({ lang }) => {
  
  const content = {
    en: {
      title1: "Get in",
      title2: "Touch.",
      sub: "Have questions about your milk delivery or want to start selling in Mandsaur? We are here to help!",
      office: "Our Office",
      address: "Nai Abadi, Mandsaur, MP",
      phone: "Phone",
      labelName: "Full Name",
      placeholderName: "Your Name",
      labelMessage: "Message",
      placeholderMessage: "How can we help you?",
      button: "Send Message"
    },
    hi: {
      title1: "संपर्क",
      title2: "करें।",
      sub: "क्या आपके पास दूध की डिलीवरी के बारे में प्रश्न हैं या मंदसौर में बेचना शुरू करना चाहते हैं? हम मदद के लिए यहाँ हैं!",
      office: "हमारा कार्यालय",
      address: "नई आबादी, मंदसौर, मध्य प्रदेश",
      phone: "फ़ोन",
      labelName: "पूरा नाम",
      placeholderName: "आपका नाम",
      labelMessage: "संदेश",
      placeholderMessage: "हम आपकी क्या मदद कर सकते हैं?",
      button: "संदेश भेजें"
    }
  };

  const t = content[lang || 'en'];

  return (
    <div className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="text-left">
            <h1 className="text-6xl font-black text-slate-900 mb-6">
              {t.title1} <span className="text-sky-500">{t.title2}</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">
              {t.sub}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-sky-50 p-4 rounded-2xl text-2xl">📍</div>
                <div>
                  <p className="font-black text-slate-900">{t.office}</p>
                  <p className="text-slate-500 font-medium">{t.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-sky-50 p-4 rounded-2xl text-2xl">📞</div>
                <div>
                  <p className="font-black text-slate-900">{t.phone}</p>
                  <p className="text-slate-500 font-medium">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <form className="space-y-6 text-left">
              <div>
                <label className="block text-sm font-black text-slate-900 mb-2 ml-1">
                  {t.labelName}
                </label>
                <input 
                  type="text" 
                  placeholder={t.placeholderName} 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-white focus:border-sky-500 outline-none transition-all shadow-sm font-medium" 
                />
              </div>
              <div>
                <label className="block text-sm font-black text-slate-900 mb-2 ml-1">
                  {t.labelMessage}
                </label>
                <textarea 
                  rows="4" 
                  placeholder={t.placeholderMessage} 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-white focus:border-sky-500 outline-none transition-all shadow-sm font-medium"
                ></textarea>
              </div>
              <button className="w-full py-5 bg-sky-500 text-white rounded-2xl font-black shadow-lg shadow-sky-200 hover:bg-sky-600 hover:-translate-y-1 transition-all">
                {t.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
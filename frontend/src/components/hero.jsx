import React from 'react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Vibrant Background Blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-sky-200 rounded-full blur-[120px] opacity-40 -z-10"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-amber-100 rounded-full blur-[120px] opacity-40 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-700 font-bold text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Now Live in India 🇮🇳
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
            Fresh Milk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400">
              Smart Tracking
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
            The modern way for Dairy Sellers and Buyers to manage daily deliveries, 
            automated billing, and transparent records in English & हिन्दी.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-sky-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-sky-200">
              Start Selling
            </button>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-200">
              Join Now
            </button>
            <button className="bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-100 hover:bg-slate-50 hover:border-sky-200 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Side: Vibrant Visuals */}
        <div className="relative">
          {/* Main Visual Box */}
          <div className="relative w-full aspect-square bg-gradient-to-br from-sky-500 to-sky-700 rounded-[3rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
            <span className="text-white/20 text-9xl font-black">MILK</span>
          </div>

          {/* Floating Modern Card 1 */}
          <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 animate-bounce-slow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Today's Goal</p>
                <p className="text-2xl font-black text-slate-900">2.5 Liters</p>
              </div>
            </div>
          </div>

          {/* Floating Modern Card 2 */}
          <div className="absolute -bottom-8 -left-8 bg-slate-900/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl text-white">
            <p className="text-sky-400 font-bold mb-1">Monthly Bill</p>
            <p className="text-3xl font-black">₹ 4,250.00</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-sky-600 rounded-full text-xs font-bold">FEBRUARY</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
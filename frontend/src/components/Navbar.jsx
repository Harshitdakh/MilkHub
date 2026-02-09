    import React from 'react';
    import { Link } from 'react-router-dom';

    const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-200 group-hover:rotate-6 transition-transform">
                D
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
                Milk<span className="text-sky-600">Hub</span>
            </span>
            </div>

            {/* Navigation Links & Language */}
            <div className="hidden md:flex items-center gap-8">
            <button className="text-slate-600 font-semibold hover:text-sky-600 transition-colors">
                English / हिन्दी
            </button>
            
            <div className="h-6 w-[1px] bg-slate-200"></div>

            <button className="text-slate-700 font-bold hover:text-sky-600 transition-colors">
                Login
            </button>
            
            <button className="bg-sky-600 text-white px-7 py-2.5 rounded-full font-bold shadow-lg shadow-sky-100 hover:bg-sky-700 hover:shadow-sky-200 hover:-translate-y-0.5 active:scale-95 transition-all">
                Join Now
            </button>
            </div>

            {/* Mobile Menu Icon (Visual Only for now) */}
            <div className="md:hidden text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </div>
        </div>
        </nav>
    );
    };

    export default Navbar;
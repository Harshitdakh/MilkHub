import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ lang, handleLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Translation Dictionary
  const t = {
    en: {
      title: "Welcome Back",
      sub: "Log in to manage your MilkHub deliveries in Mandsaur.",
      emailLabel: "Email Address",
      passLabel: "Password",
      btn: "Sign In",
      noAcc: "Don't have an account?",
      join: "Join Now",
      error: "Invalid email or password",
      serverError: "Server connection failed. Try again."
    },
    hi: {
      title: "वापस स्वागत है",
      sub: "मंदसौर में अपनी मिल्क-हब डिलीवरी प्रबंधित करने के लिए लॉगिन करें।",
      emailLabel: "ईमेल पता",
      passLabel: "पासवर्ड",
      btn: "साइन इन करें",
      noAcc: "खाता नहीं है?",
      join: "अभी जुड़ें",
      error: "अमान्य ईमेल या पासवर्ड",
      serverError: "सर्वर कनेक्शन विफल रहा। पुन: प्रयास करें।"
    }
  }[lang || 'en'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Connect to your Node.js Backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // 1. Update Global App State & LocalStorage
        handleLoginSuccess(data.role, data.token, data._id);

        // 2. Redirect based on user role
        if (data.role === 'seller') {
          navigate('/dashboard');
        } else {
          navigate('/my-orders');
        }
      } else {
        // Show backend error message or default translation
        setError(data.message || t.error);
      }
    } catch (err) {
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 text-left">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
        
        {/* Header Section */}
        <header className="text-center mb-8">
          <div className="inline-block p-4 bg-sky-50 rounded-2xl mb-4 text-3xl">🔑</div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">{t.title}</h2>
          <p className="text-slate-500 font-medium">{t.sub}</p>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-900 mb-2 ml-1">
              {t.emailLabel}
            </label>
            <input 
              type="email" 
              required
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-500 rounded-2xl font-bold outline-none transition-all placeholder:text-slate-300"
              placeholder="rahul@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-black text-slate-900 mb-2 ml-1">
              {t.passLabel}
            </label>
            <input 
              type="password" 
              required
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-500 rounded-2xl font-bold outline-none transition-all placeholder:text-slate-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-xl transition-all flex justify-center items-center ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600 hover:-translate-y-1'
            }`}
          >
            {loading ? (
               <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : t.btn}
          </button>
        </form>

        {/* Footer Link */}
        <footer className="mt-10 text-center">
          <p className="text-slate-400 font-bold text-sm">
            {t.noAcc} 
            <Link to="/register" className="text-sky-500 hover:underline ml-1">
              {t.join}
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
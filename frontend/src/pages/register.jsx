import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = ({ lang, handleLoginSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer' 
  });

  const t = {
    en: {
      title: "Join MilkHub",
      sub: "Fresh milk from Mandsaur farms to your doorstep.",
      name: "Full Name",
      email: "Email Address",
      pass: "Password",
      role: "I want to...",
      buy: "Buy Milk (Customer)",
      sell: "Sell Milk (Seller)",
      btn: "Create Account",
      btnLoading: "Creating Account...",
      already: "Already have an account?",
      login: "Login",
      serverError: "Registration failed. Please try again."
    },
    hi: {
      title: "मिल्क-हब से जुड़ें",
      sub: "मंदसौर के खेतों से ताज़ा दूध आपके द्वार तक।",
      name: "पूरा नाम",
      email: "ईमेल पता",
      pass: "पासवर्ड",
      role: "मैं चाहता हूँ...",
      buy: "दूध खरीदना (ग्राहक)",
      sell: "दूध बेचना (विक्रेता)",
      btn: "खाता बनाएँ",
      btnLoading: "खाता बनाया जा रहा है...",
      already: "पहले से ही खाता है?",
      login: "लॉगिन करें",
      serverError: "पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।"
    }
  }[lang || 'en'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        // Automatically log the user in after registration
        handleLoginSuccess(data.role, data.token, data._id);
        
        // Redirect to their specific dashboard
        if (data.role === 'seller') {
          navigate('/dashboard');
        } else {
          navigate('/my-orders');
        }
      } else {
        setError(data.message || t.serverError);
      }
    } catch (err) {
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] px-6 py-12 text-left">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-sky-50 rounded-2xl mb-4 text-3xl">🥛</div>
          <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{t.title}</h2>
          <p className="text-slate-500 font-medium">{t.sub}</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 animate-pulse">
            ⚠️ {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">{t.name}</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-sky-500 outline-none transition-all font-bold"
              placeholder="Harshit ..."
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">{t.email}</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-sky-500 outline-none transition-all font-bold"
              placeholder="name@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">{t.pass}</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-sky-500 outline-none transition-all font-bold"
              placeholder="••••••••"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">{t.role}</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-sky-500 outline-none transition-all font-bold text-slate-600 appearance-none cursor-pointer"
            >
              <option value="buyer">{t.buy}</option>
              <option value="seller">{t.sell}</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-xl transition-all flex justify-center items-center ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-sky-600 hover:-translate-y-1'
            }`}
          >
            {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : t.btn}
          </button>
        </form>

        <footer className="mt-10 text-center">
          <p className="text-slate-400 font-bold text-sm">
            {t.already} <Link to="/login" className="text-sky-500 hover:underline ml-1">{t.login}</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
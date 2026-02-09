import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const AnalyticsChart = ({ data, lang }) => {
  // Localization for the chart tooltip
  const label = lang === 'en' ? 'Amount (₹)' : 'राशि (₹)';

  return (
    <div className="h-[300px] w-full bg-white p-6 rounded-[2.5rem] shadow-inner border border-slate-50">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {/* Gradient for a professional "Modern App" look */}
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* Grid lines - only horizontal for a clean look */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

          {/* X Axis (Days of the week) */}
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} 
            dy={10} 
          />

          {/* Y Axis (Money) */}
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} 
          />

          {/* Tooltip that shows up when you hover */}
          <Tooltip 
            contentStyle={{
              borderRadius: '20px', 
              border: 'none', 
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
            cursor={{ stroke: '#0ea5e9', strokeWidth: 2 }}
          />

          {/* The Actual Area / Line */}
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#0ea5e9" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            name={label}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
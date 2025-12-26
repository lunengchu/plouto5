
import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 700 },
  { name: 'Sat', value: 600 },
  { name: 'Sun', value: 800 },
];

const barData = [
  { name: 'Ocean', value: 45 },
  { name: 'Air', value: 25 },
  { name: 'Road', value: 20 },
  { name: 'Rail', value: 10 },
];

const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#e0e7ff'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Orders', value: '1,284', icon: TrendingUp, trend: '+12%', color: 'indigo' },
          { label: 'Pending Arrival', value: '42', icon: Clock, trend: '-3', color: 'amber' },
          { label: 'Cleared Today', value: '89', icon: CheckCircle2, trend: '+14%', color: 'emerald' },
          { label: 'Alerts', value: '7', icon: AlertTriangle, trend: '+2', color: 'rose' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Supply Chain Velocity</h2>
              <p className="text-sm text-slate-500">Tracking transit times across all trade lanes</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl text-xs font-semibold px-3 py-1.5 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Modality Mix</h2>
            <div className="h-[240px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 500}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {barData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Critical Tracking Events</h2>
          <button className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All Shipments <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Shipment ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Origin</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { id: 'SH-82910', status: 'In Transit', origin: 'Shanghai (CNSHA)', dest: 'Los Angeles (USLAX)', eta: 'Nov 24, 2023', color: 'indigo' },
                { id: 'SH-11029', status: 'Customs Hold', origin: 'Mumbai (INBOM)', dest: 'Felixstowe (GBFXT)', eta: 'Nov 22, 2023', color: 'amber' },
                { id: 'SH-77631', status: 'Delivered', origin: 'Hamburg (DEHAM)', dest: 'Chicago DC', eta: 'Completed', color: 'emerald' },
                { id: 'SH-22934', status: 'At Origin', origin: 'Shenzhen (CNSZN)', dest: 'New York (USNYC)', eta: 'Dec 02, 2023', color: 'slate' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{row.id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-${row.color}-50 text-${row.color}-600`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-${row.color}-500`}></div>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.origin}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.dest}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{row.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

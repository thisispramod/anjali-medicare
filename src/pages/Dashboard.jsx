import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import ServiceRequestsTable from '../components/ServiceRequestsTable';
import ServiceRequestModal from '../components/ServiceRequestModal';
import LeadManagement from '../components/LeadManagement';
import { PackageSearch, Clock, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', orders: 4000, services: 2400 },
  { name: 'Feb', orders: 3000, services: 1398 },
  { name: 'Mar', orders: 2000, services: 9800 },
  { name: 'Apr', orders: 2780, services: 3908 },
  { name: 'May', orders: 1890, services: 4800 },
  { name: 'Jun', orders: 2390, services: 3800 },
  { name: 'Jul', orders: 3490, services: 4300 },
];

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const rawTab = searchParams.get('tab') || 'dashboard';
  const tab = rawTab.toLowerCase();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 hide-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {tab === 'dashboard' && (
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Welcome, City Hospital
                  </h1>
                  <p className="text-slate-500 mt-1.5 text-lg font-medium">
                    Here's what's happening with your equipment today.
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                   <div className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-bold flex items-center gap-2">
                     <TrendingUp size={16} /> Service Score: 98%
                   </div>
                </div>
              </header>
            )}

            {/* Dashboard Content */}
            {tab === 'dashboard' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard 
                    title="Total Orders" 
                    value="156" 
                    icon={<PackageSearch size={24} />} 
                    trend={12} 
                    color="blue" 
                    IconBg="bg-blue-100" 
                  />
                  <StatsCard 
                    title="Pending Orders" 
                    value="12" 
                    icon={<Clock size={24} />} 
                    trend={-5} 
                    color="amber" 
                    IconBg="bg-amber-100" 
                  />
                  <StatsCard 
                    title="Active Services" 
                    value="8" 
                    icon={<AlertTriangle size={24} />} 
                    trend={2} 
                    color="rose" 
                    IconBg="bg-rose-100" 
                  />
                  <StatsCard 
                    title="Completed Services" 
                    value="342" 
                    icon={<CheckCircle size={24} />} 
                    trend={18} 
                    color="emerald" 
                    IconBg="bg-emerald-100" 
                  />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Performance Trends</h2>
                    <p className="text-sm text-slate-500 mt-1">Monthly breakdown of orders vs service requests</p>
                  </div>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorServices" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
                        <Area type="monotone" dataKey="services" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorServices)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <ServiceRequestsTable onRequestClick={() => setIsModalOpen(true)} />
              </>
            ) : tab === 'leads' ? (
              <div className="min-h-[calc(100vh-140px)]">
                 <LeadManagement />
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-white rounded-2xl shadow-sm border border-slate-100 border-dashed">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                    <Clock className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Coming Soon</h3>
                  <p className="text-slate-500 mt-2 max-w-sm mx-auto">The {tab} module is currently under development. Please check back later.</p>
                </div>
              </div>
            )}
            
          </div>
        </main>
      </div>

      <ServiceRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

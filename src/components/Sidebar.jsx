import { Link, useSearchParams } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Wrench, FileText, User, LogOut, Activity } from 'lucide-react';

export default function Sidebar() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', tab: 'dashboard' },
    { name: 'Leads CRM', icon: <User size={20} />, path: '/dashboard?tab=leads', tab: 'leads' },
    { name: 'My Orders', icon: <ShoppingCart size={20} />, path: '/dashboard?tab=orders', tab: 'orders' },
    { name: 'Service Requests', icon: <Wrench size={20} />, path: '/dashboard?tab=services', tab: 'services' },
    { name: 'Invoices', icon: <FileText size={20} />, path: '/dashboard?tab=invoices', tab: 'invoices' },
    { name: 'Profile', icon: <User size={20} />, path: '/dashboard?tab=profile', tab: 'profile' },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r border-slate-200 h-full">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-200 bg-white shrink-0">
        <div className="bg-primary-600 p-1.5 rounded-lg text-white shadow-md shadow-primary-500/20">
          <Activity size={24} />
        </div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">Anjali Medicare</span>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = currentTab.toLowerCase() === item.tab;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-200 shrink-0">
        <Link 
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </div>
  );
}

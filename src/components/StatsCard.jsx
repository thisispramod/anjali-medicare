export default function StatsCard({ title, value, icon, trend, color, IconBg }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${IconBg} text-${color}-600`}>
          {icon}
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${trend > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 bg-slate-50'}`}>
          {trend > 0 ? `+${trend}%` : `${trend}%`}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
      </div>
    </div>
  );
}

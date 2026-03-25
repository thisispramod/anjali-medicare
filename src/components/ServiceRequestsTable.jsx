import { MoreVertical, UploadCloud } from 'lucide-react';

const statusStyles = {
  Pending: 'bg-amber-100 text-amber-800 border-amber-200',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
  Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

const requestsData = [
  { id: 'REQ-1001', machine: 'X-Ray Machine Model A', issue: 'Power supply failure during operation. Unit shuts down unexpectedly after 5 minutes.', status: 'Pending', engineer: 'Unassigned', date: 'Oct 24, 2026' },
  { id: 'REQ-1002', machine: 'MRI Scanner Pro', issue: 'Cooling system alert. Temperature gauge shows high reading.', status: 'In Progress', engineer: 'Rajesh Kumar', date: 'Oct 23, 2026' },
  { id: 'REQ-1003', machine: 'Ultrasound Basic', issue: 'Display flickering on start up. Hard to read measurements.', status: 'Completed', engineer: 'Amit Singh', date: 'Oct 20, 2026' },
  { id: 'REQ-1004', machine: 'ECG Monitor', issue: 'Cable connector port loose.', status: 'Completed', engineer: 'Rajesh Kumar', date: 'Oct 15, 2026' },
];

export default function ServiceRequestsTable({ onRequestClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Recent Service Requests</h2>
          <p className="text-sm text-slate-500 mt-1">Track and manage your equipment maintenance tickets.</p>
        </div>
        <button
          onClick={onRequestClick}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 hover:shadow-md transition-all active:scale-95"
        >
          <UploadCloud size={18} />
          Raise New Request
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold min-w-[220px]">Machine Details</th>
              <th scope="col" className="px-6 py-4 font-semibold min-w-[280px]">Issue Description</th>
              <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
              <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Assigned Engineer</th>
              <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Date</th>
              <th scope="col" className="relative px-6 py-4 w-10">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requestsData.map((req, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{req.machine}</div>
                  <div className="text-xs text-slate-500 mt-0.5 tracking-tight font-mono">{req.id}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <p className="line-clamp-2">{req.issue}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusStyles[req.status]}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {req.engineer[0]}
                    </div>
                    <span className="text-slate-700 font-medium">{req.engineer}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">
                  {req.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary-600 p-1 rounded-md hover:bg-primary-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { X, Download, Upload, FileSpreadsheet, CheckCircle2, Activity } from 'lucide-react';
import { useState, useRef } from 'react';

export default function ImportLeadsModal({ isOpen, onClose, onFileUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="text-primary-600" size={24} />
              Import Leads from Excel
            </h3>
            <p className="text-sm text-slate-500 mt-1">Upload your spreadsheet to bulk-add leads to your CRM.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {/* Step 1: Download Sample */}
          <div className="mb-8 p-5 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-primary-200 flex items-center justify-center text-primary-600 shadow-sm">
                <Download size={24} />
              </div>
              <div>
                <h4 className="font-bold text-primary-900">Step 1: Download Template</h4>
                <p className="text-xs text-primary-700/70 mt-0.5">Start with our sample file to ensure correct column mapping.</p>
              </div>
            </div>
            <a 
              href="/sample_leads.xlsx" 
              download 
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-primary-200 text-primary-700 font-bold text-sm rounded-xl hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-sm"
            >
              Download .xlsx
            </a>
          </div>

          {/* Table Preview Section */}
          <div className="mb-8">
             <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2 uppercase tracking-tight">
                <CheckCircle2 size={16} className="text-emerald-500" /> Required Format Preview
             </h4>
             <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <table className="w-full text-[11px] text-left text-slate-500">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                    <tr>
                       <th className="px-3 py-2 border-r border-slate-200">Name</th>
                       <th className="px-3 py-2 border-r border-slate-200">Phone</th>
                       <th className="px-3 py-2 border-r border-slate-200">Company</th>
                       <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                       <td className="px-3 py-2 border-r border-slate-200 font-medium">Dr. Ramesh Kumar</td>
                       <td className="px-3 py-2 border-r border-slate-200">+91 987654...</td>
                       <td className="px-3 py-2 border-r border-slate-200">City Hospital</td>
                       <td className="px-3 py-2 text-red-600 font-bold">Hot Lead</td>
                    </tr>
                  </tbody>
                </table>
             </div>
             <p className="text-[10px] text-slate-400 mt-2 italic px-1">Other columns supported: Product Interest, Follow-up Date, Assigned Sales Person.</p>
          </div>

          {/* Step 2: Upload Area */}
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer transition-all duration-300 flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-3xl text-center group ${
              dragActive 
                ? 'border-primary-600 bg-primary-50/50 scale-[0.99]' 
                : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-primary-400 hover:shadow-xl hover:shadow-primary-500/5'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".xlsx,.xls,.csv"
              onChange={onFileUpload}
            />
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-1 ${
               dragActive ? 'bg-primary-600 text-white scale-110' : 'bg-primary-100 text-primary-600'
            }`}>
              <Upload size={32} />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Step 2: Upload Spreadsheet</h4>
            <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
              Drag and drop your Excel file here, or click to browse files stored on your computer.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
           <div className="flex items-center gap-2 text-slate-400">
              <Activity size={18} className="text-primary-600 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Secure Import Engine</span>
           </div>
           <button 
             onClick={onClose}
             className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
           >
             Cancel
           </button>
        </div>
      </div>
    </div>
  );
}

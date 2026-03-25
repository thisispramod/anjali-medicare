import { useState, useRef, useEffect } from 'react';
import { Upload, Filter, Search, Phone, FileText, Calendar, X, ChevronRight, UserCircle, Database, Plus } from 'lucide-react';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import AddLeadModal from './AddLeadModal';
import ImportLeadsModal from './ImportLeadsModal';

// Smart Color Mapping
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'hot lead':
    case 'hot':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'follow-up':
    case 'in progress':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'closed':
    case 'won':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'cold':
    case 'lost':
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export default function LeadManagement() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = () => {
    fetch('/api/leads')
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const enhancedLeads = data.map(lead => ({ 
            ...lead, 
            activities: lead.activities || [] 
          }));
          setLeads(enhancedLeads);
        }
      })
      .catch(err => console.error("Error loading leads:", err));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [activityNote, setActivityNote] = useState('');
  const fileInputRef = useRef(null);

  // Handle Add Lead
  const handleAddLead = (newLead) => {
    setLeads([{ ...newLead, activities: [] }, ...leads]);
  };

  // Handle Excel Import
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      // Map imported data into leads
      const newLeads = data.map((row) => ({
        name: row['Name'] || row['Lead Name'] || 'Unknown',
        phone: row['Phone'] || row['Contact'] || 'N/A',
        company: row['Company'] || row['Hospital/Clinic'] || 'N/A',
        product: row['Product Interest'] || row['Product'] || 'N/A',
        status: row['Lead Status'] || row['Status'] || 'Cold',
        followUp: row['Follow-up Date'] || row['FollowUp'] || '-',
        assignedTo: row['Assigned Sales Person'] || row['Assigned To'] || 'Unassigned',
      }));

      try {
        const response = await fetch('/api/leads/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLeads),
        });

        if (response.ok) {
          fetchLeads(); // Refresh from DB to get real IDs
          setIsImportModalOpen(false);
          Swal.fire({
            icon: 'success',
            title: 'Import Successful',
            text: `Successfully added your leads to the database!`,
            confirmButtonColor: '#2563eb',
            timer: 2000
          });
        } else {
          let errorMsg = 'Unable to save leads to database.';
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
              const errData = await response.json();
              errorMsg = errData.details || errorMsg;
          } else {
              errorMsg = `Server error ${response.status}: ${response.statusText}`;
          }
          
          Swal.fire({
            icon: 'error',
            title: 'Import Failed',
            text: errorMsg,
            confirmButtonColor: '#2563eb'
          });
        }
      } catch (error) {
        console.error("Bulk upload error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Import Error',
          text: error.message.includes('Unexpected token') 
                ? 'Server returned non-JSON response. Check your API routes.' 
                : 'Check your connection or backend server status.',
          confirmButtonColor: '#2563eb'
        });
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = null; // Reset input
  };

  // Filtering leads
  const filteredLeads = leads.filter(lead => {
    const nameStr = (lead.name || '').toLowerCase();
    const companyStr = (lead.company || '').toLowerCase();
    const statusStr = (lead.status || '').toLowerCase();
    
    const matchesSearch = nameStr.includes(searchQuery.toLowerCase()) || 
                          companyStr.includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' ? true : statusStr.includes(filterStatus.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  // Save new activity to the selected lead
  const handleSaveActivity = () => {
    if (!activityNote.trim() || !selectedLead) return;
    
    const newActivity = {
      id: Date.now(),
      time: 'Just Now',
      text: activityNote,
      type: 'note'
    };

    const updatedLeads = leads.map(lead => {
      if (lead.id === selectedLead.id) {
        const updatedLead = { ...lead, activities: [newActivity, ...(lead.activities || [])] };
        setSelectedLead(updatedLead); // Update the slide-out view dynamically
        return updatedLead;
      }
      return lead;
    });

    setLeads(updatedLeads);
    setActivityNote('');
  };

  return (
    <div className="flex h-full gap-6">
      {/* Main Leads List */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedLead ? 'hidden lg:flex lg:w-2/3' : 'w-full'}`}>
        
        {/* Header & Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">Smart CRM: Lead Database</h2>
              <p className="text-sm text-slate-500 mt-1">Manage, import, and track your active sales pipeline.</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 shadow-sm hover:bg-primary-100 transition-colors"
              >
                <Database size={18} />
                Import Excel
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
              >
                <Plus size={18} />
                Add Lead
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads, hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border-0 py-2 pl-10 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-primary-600 sm:text-sm bg-slate-50"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Filter className="text-slate-400 h-5 w-5" />
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-xl border-0 py-2 pl-3 pr-8 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-primary-600 sm:text-sm font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Hot Lead">🔥 Hot Leads (Red)</option>
                <option value="Follow-up">⏳ Needs Follow-up (Yellow)</option>
                <option value="Closed">✅ Closed (Green)</option>
                <option value="Cold">❄️ Cold (Grey)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex-1 flex flex-col relative">
          <div className="overflow-x-auto flex-1 h-[500px]">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">Lead Details</th>
                  <th scope="col" className="px-6 py-4 font-bold">Company</th>
                  <th scope="col" className="px-6 py-4 font-bold">Product Interest</th>
                  <th scope="col" className="px-6 py-4 font-bold">Status</th>
                  <th scope="col" className="px-6 py-4 font-bold">Follow-up</th>
                  <th scope="col" className="px-6 py-4 font-bold">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 overflow-y-auto">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => setSelectedLead(lead)}
                    className={`hover:bg-slate-50 border-l-4 transition-colors cursor-pointer ${selectedLead?.id === lead.id ? 'bg-primary-50/50 border-primary-500' : 'border-transparent'}`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                        <Phone size={12} /> {lead.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{lead.company}</td>
                    <td className="px-6 py-4 text-slate-600">{lead.product}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wide ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium flex items-center gap-2 mt-2">
                       <Calendar size={14} className="text-slate-400"/> {lead.followUp}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <UserCircle className="text-slate-300" size={20} />
                        <span className="text-slate-700 text-xs font-semibold">{lead.assignedTo}</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Database className="h-10 w-10 text-slate-300 mb-3" />
                        <p className="font-semibold text-slate-700">No leads found!</p>
                        <p className="text-sm mt-1">Try importing from an Excel file.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-out Activity Panel */}
      {selectedLead && (
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden flex flex-col animate-in slide-in-from-right-8 duration-300">
          
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-primary-600" /> Lead Activity Info
            </h3>
            <button 
              onClick={() => setSelectedLead(null)}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 hide-scrollbar">
            {/* Lead Details Summary */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-bold shadow-sm">
                  {selectedLead.name.charAt(0)}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusColor(selectedLead.status)}`}>
                  {selectedLead.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedLead.name}</h2>
              <p className="text-slate-600 font-medium mb-4">{selectedLead.company}</p>
              
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-slate-400 mt-0.5" />
                  <div>
                     <p className="text-xs text-slate-500 font-medium">Contact Number</p>
                     <p className="text-sm text-slate-800 font-semibold">{selectedLead.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Database size={16} className="text-slate-400 mt-0.5" />
                  <div>
                     <p className="text-xs text-slate-500 font-medium">Product Output</p>
                     <p className="text-sm text-slate-800 font-semibold">{selectedLead.product}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline / Call Notes */}
            <div className="mb-6">
              <h4 className="font-bold text-slate-800 mb-4 tracking-tight">Recent Activity</h4>
              
              <div className="relative pl-4 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
                
                {(!selectedLead.activities || selectedLead.activities.length === 0) && (
                  <p className="text-sm text-slate-500 italic relative z-10 bg-white ml-2 pl-4">No activity logged yet.</p>
                )}

                {selectedLead.activities?.map((activity) => (
                  <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow shrink-0 z-10 absolute -left-4 md:left-1/2 md:-translate-x-1/2 ${
                      activity.type === 'phone' ? 'bg-slate-200 text-slate-500' : 
                      activity.type === 'document' ? 'bg-blue-100 text-blue-600' : 'bg-primary-100 text-primary-600'
                    }`}>
                      {activity.type === 'phone' ? <Phone size={14} /> : activity.type === 'document' ? <FileText size={14} /> : <FileText size={14} />}
                    </div>
                    <div className="pl-6 w-full md:w-[calc(50%-2.5rem)] md:pl-0 sm:pl-8">
                       <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                         <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{activity.time}</span>
                         <p className="text-sm text-slate-700 font-medium mt-1">{activity.text}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 mt-auto">
              <textarea 
                placeholder="Log a call or add a note..." 
                value={activityNote}
                onChange={(e) => setActivityNote(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 resize-none mb-3"
                rows="3"
              />
              <button 
                onClick={handleSaveActivity}
                disabled={!activityNote.trim()}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
              >
                Save Activity
              </button>
            </div>

          </div>
        </div>
      )}

      <AddLeadModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddLead={handleAddLead} 
      />

      {/* Import Leads Modal */}
      <ImportLeadsModal 
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
}

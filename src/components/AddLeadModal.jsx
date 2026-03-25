import { X, CheckCircle2, UserCircle, Phone, Database, Calendar, CheckCircle, Package, Send, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddLeadModal({ isOpen, onClose, onAddLead }) {
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    product: '',
    status: 'Cold',
    followUp: '',
    assignedTo: 'Unassigned'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedLead = await response.json();
        setSubmitted(true);
        
        setTimeout(() => {
          onAddLead(savedLead);
          setSubmitted(false);
          setFormData({
            name: '', phone: '', company: '', product: '', status: 'Cold', followUp: '', assignedTo: 'Unassigned'
          });
          onClose();
        }, 1500);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: 'Failed to save lead. Please check your data.',
          confirmButtonColor: '#2563eb'
        });
      }
    } catch (error) {
       console.error(error);
       Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'Please check your server connection.',
          confirmButtonColor: '#2563eb'
       });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white text-left shadow-2xl ring-1 ring-slate-900/10 transition-all sm:my-8 transform">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold leading-6 text-slate-900 mb-1" id="modal-title">
              Add New Lead
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 border border-transparent text-slate-400 hover:text-slate-500 hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mt-2 text-sm text-slate-500 mb-6">
            Enter the details for your new prospective client.
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center animate-in fade-in zoom-in duration-300">
              <div className="bg-green-100 text-green-600 rounded-full p-3 shadow-sm">
                <CheckCircle2 size={48} />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Lead Added!</h4>
              <p className="text-sm text-slate-500">The lead has been successfully saved to your CRM.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">
                    Lead Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Rajesh Kumar"
                      className="block w-full rounded-xl border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-slate-900">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1.5">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 "
                      className="block w-full rounded-xl border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium leading-6 text-slate-900">
                  Hospital / Company <span className="text-red-500">*</span>
                </label>
                <div className="mt-1.5">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. City Care Hospital"
                    className="block w-full rounded-xl border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="product" className="block text-sm font-medium leading-6 text-slate-900">
                    Product Interest
                  </label>
                  <div className="mt-1.5">
                    <input
                      type="text"
                      name="product"
                      id="product"
                      value={formData.product}
                      onChange={handleChange}
                      placeholder="e.g. MRI Scanner Pro"
                      className="block w-full rounded-xl border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium leading-6 text-slate-900">
                    Lead Status
                  </label>
                  <div className="mt-1.5">
                    <select
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="block w-full rounded-xl border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white"
                    >
                      <option value="Hot Lead">Hot Lead</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Closed">Closed / Won</option>
                      <option value="Cold">Cold / Lost</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                  <label htmlFor="followUp" className="block text-sm font-medium leading-6 text-slate-900">
                    Follow-up Date
                  </label>
                  <div className="mt-1.5">
                    <input
                      type="date"
                      name="followUp"
                      id="followUp"
                      value={formData.followUp}
                      onChange={handleChange}
                      className="block w-full rounded-xl border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="assignedTo" className="block text-sm font-medium leading-6 text-slate-900">
                    Assigned To
                  </label>
                  <div className="mt-1.5">
                    <input
                      type="text"
                      name="assignedTo"
                      id="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      placeholder="Sales Rep Name"
                      className="block w-full rounded-xl border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sm:px-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 hover:shadow-md transition-all active:scale-95"
                >
                  Save Lead
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

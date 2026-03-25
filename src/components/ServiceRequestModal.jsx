import { X, Upload, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function ServiceRequestModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [machineName, setMachineName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('machine_name', machineName);
    formData.append('issue_description', issueDescription);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setMachineName('');
          setIssueDescription('');
          setFile(null);
          onClose();
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Failed to submit service request.',
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
              Raise New Service Request
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 border border-transparent text-slate-400 hover:text-slate-500 hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mt-2 text-sm text-slate-500 mb-6">
            Please provide details about the machine issue. Our engineers will respond shortly.
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center animate-in fade-in zoom-in duration-300">
              <div className="bg-green-100 text-green-600 rounded-full p-3 shadow-sm">
                <CheckCircle2 size={48} />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Request Submitted!</h4>
              <p className="text-sm text-slate-500">Your service request has been successfully raised. A ticket ID has been sent to your email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
              <div>
                <label htmlFor="machine" className="block text-sm font-medium leading-6 text-slate-900">
                  Select Machine <span className="text-red-500">*</span>
                </label>
                <div className="mt-1.5">
                  <select
                    id="machine"
                    required
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                    className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white transition-colors"
                  >
                    <option value="">Select a machine from inventory</option>
                    <option value="X-Ray Machine Model A">X-Ray Machine Model A (SN: XRM-1029)</option>
                    <option value="MRI Scanner Pro">MRI Scanner Pro (SN: MRI-4432)</option>
                    <option value="Ultrasound Basic">Ultrasound Basic (SN: ULT-9901)</option>
                    <option value="ECG Monitor">ECG Monitor (SN: ECG-201)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-medium leading-6 text-slate-900">
                  Issue Description <span className="text-red-500">*</span>
                </label>
                <div className="mt-1.5">
                  <textarea
                    id="issue"
                    rows={4}
                    required
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Please describe the issue in detail..."
                    className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-colors resize-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  Upload Image/Video (Optional)
                </label>
                <div className="mt-1.5 flex justify-center rounded-xl border border-dashed border-slate-300 px-6 py-6 hover:bg-slate-50 hover:border-primary-400 transition-colors cursor-pointer group group-focus-within:ring-2 group-focus-within:ring-primary-600">
                  <div className="text-center">
                    <Upload className="mx-auto h-10 w-10 text-slate-300 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary-600 hover:text-primary-500"
                      >
                        <span>{file ? file.name : 'Upload a file'}</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
                      </label>
                      <p className="pl-1">{!file && "or drag and drop"}</p>
                    </div>
                    <p className="text-xs leading-5 text-slate-500">PNG, JPG, MP4 up to 10MB</p>
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
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

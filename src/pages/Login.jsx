import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/dashboard');
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-screen flex text-slate-800 bg-slate-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 p-8 bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 ring-1 ring-slate-900/5">
          <div>
            <div className="flex justify-center items-center gap-2 mb-6">
              <div className="bg-primary-600 p-2.5 rounded-xl text-white shadow-lg shadow-primary-500/30">
                <Activity size={28} />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                Anjali Medicare
              </h1>
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 text-center">
              Dealer Portal Access
            </h2>
            <p className="mt-2 text-sm text-center text-slate-500 font-medium">
              Medical Equipment Management System
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  Email Address
                </label>
                <div className="mt-2 text-left">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dealer@example.com"
                    className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-slate-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2 text-left">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-xl bg-primary-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all active:scale-95 duration-200"
                >
                  Sign in to Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Decorative background side */}
      <div className="hidden lg:relative lg:block lg:flex-1 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-900 to-slate-900 opacity-90"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-20"
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Medical Background"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
           <div className="max-w-2xl text-center space-y-6 transform translate-y-[-10%]">
             <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-4 tracking-wide shadow-2xl">
               <Activity className="text-primary-400" size={18} />
               Premium Service Delivery
             </div>
             <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
               Empowering Medical <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-white font-extrabold italic pr-1">Excellence</span>
             </h2>
             <p className="text-lg text-slate-300 max-w-lg mx-auto leading-relaxed">
               Access real-time equipment status, automated service requests, and insightful business metrics through our seamless dealer platform.
             </p>
           </div>
        </div>
        
        {/* Subtle decorative shapes */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>
    </div>
  );
}

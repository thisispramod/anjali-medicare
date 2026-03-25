import { Bell, Search, UserCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8">
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 sm:block hidden">
        Dealer Portal
      </h1>
      <div className="flex flex-1 justify-end sm:justify-end lg:ml-auto items-center gap-4 sm:gap-6">
        <div className="relative max-w-sm hidden sm:block">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              id="search"
              name="search"
              type="search"
              placeholder="Search..."
              className="block w-full rounded-full border-0 py-1.5 pl-10 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-slate-50 hover:bg-slate-100 transition-colors"
            />
          </div>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-primary-600 transition-colors bg-slate-50 hover:bg-primary-50 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 sm:pl-6">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-900 leading-tight">City Hospital</span>
            <span className="text-xs font-medium text-slate-500">Premium Dealer</span>
          </div>
          <button className="flex items-center justify-center h-9 w-9 rounded-full bg-primary-100 text-primary-700 hover:ring-2 hover:ring-offset-2 hover:ring-primary-500 transition-all">
            <UserCircle size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

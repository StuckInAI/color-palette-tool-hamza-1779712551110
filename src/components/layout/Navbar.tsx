import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Search, Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Browse Cars' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0f0f1a]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Car size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl text-white">
              Car<span className="gradient-text">Vision</span>
              <span className="text-xs align-super text-purple-400 ml-0.5">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  'text-sm font-medium transition-colors',
                  location.pathname === l.to
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/search"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 hover:text-white transition-all"
            >
              <Search size={15} />
              Search
            </Link>
            <Link
              to="/search"
              className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Zap size={15} />
              AI Match
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === l.to
                    ? 'bg-purple-600/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

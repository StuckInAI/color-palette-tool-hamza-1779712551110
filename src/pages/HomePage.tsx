import { Link } from 'react-router-dom';
import { Search, Zap, Shield, TrendingUp, Car, Star, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import CarCard from '@/components/ui/CarCard';
import StatCard from '@/components/ui/StatCard';
import { cars } from '@/lib/data';

export default function HomePage() {
  const featured = cars.slice(0, 3);
  const topRated = [...cars].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-8">
            <Sparkles size={14} />
            AI-Powered Car Discovery Platform
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Find Your Dream
            <br />
            <span className="gradient-text">Car with AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover the perfect vehicle with our intelligent search engine. Browse thousands of premium cars,
            compare specs, and get AI-matched recommendations tailored just for you.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center gap-3 bg-[#1a1a2e] rounded-2xl border border-white/10 p-2 focus-within:border-purple-500/50 transition-colors">
              <Search size={20} className="ml-3 text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search by make, model, year..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base py-2"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/search?q=${(e.target as HTMLInputElement).value}`;
                  }
                }}
              />
              <Link
                to="/search"
                className="gradient-bg text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
              >
                Search
              </Link>
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Electric', 'SUV', 'Luxury', 'Sports', 'Under $100k'].map((tag) => (
              <Link
                key={tag}
                to={`/search`}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-purple-500/30 transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero car image */}
        <div className="max-w-5xl mx-auto px-4 mt-16">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 animate-pulse-glow">
            <img
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80"
              alt="Featured car"
              className="w-full h-64 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-xs text-purple-400 font-semibold mb-1">FEATURED</p>
                <h3 className="text-2xl font-bold text-white">Tesla Model S Plaid</h3>
                <p className="text-gray-300">From $89,990 · 1,020 HP · 0-60 in 1.99s</p>
              </div>
              <Link
                to="/car/1"
                className="flex items-center gap-2 gradient-bg text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                View <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="10,000+" label="Premium Vehicles" icon={<Car size={22} />} />
          <StatCard value="4.9★" label="Average Rating" icon={<Star size={22} />} />
          <StatCard value="98%" label="Customer Satisfaction" icon={<Shield size={22} />} />
          <StatCard value="AI" label="Powered Matching" icon={<Zap size={22} />} />
        </div>
      </section>

      {/* Featured Cars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-purple-400 font-semibold mb-1">HANDPICKED FOR YOU</p>
            <h2 className="text-3xl font-bold text-white">Featured Vehicles</h2>
          </div>
          <Link
            to="/search"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-sm text-purple-400 font-semibold mb-2">WHY CARVISION AI</p>
          <h2 className="text-3xl font-bold text-white">The Smarter Way to Find Cars</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap size={24} />,
              title: 'AI-Powered Matching',
              desc: 'Our intelligent algorithm learns your preferences and suggests vehicles you\'ll love, saving hours of research.',
            },
            {
              icon: <Shield size={24} />,
              title: 'Verified Listings',
              desc: 'Every vehicle is verified with detailed history reports, inspection results, and transparent pricing — no surprises.',
            },
            {
              icon: <TrendingUp size={24} />,
              title: 'Market Insights',
              desc: 'Get real-time market data, price trend analysis, and expert guidance to ensure you always get the best deal.',
            },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-[#1a1a2e] rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all group">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-purple-400 font-semibold mb-1">COMMUNITY PICKS</p>
            <h2 className="text-3xl font-bold text-white">Top Rated Cars</h2>
          </div>
          <Link
            to="/search"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topRated.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-12 text-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative">
            <Sparkles size={40} className="text-white/70 mx-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Find Your Perfect Match?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Let our AI analyze thousands of listings and surface the best options for your budget and lifestyle.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-2xl font-bold text-lg hover:bg-white/90 transition-colors"
            >
              Start Browsing <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 CarVision AI. All rights reserved. Built with AI-powered intelligence.</p>
      </footer>
    </div>
  );
}

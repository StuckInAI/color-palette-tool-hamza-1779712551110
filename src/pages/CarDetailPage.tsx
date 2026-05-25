import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Fuel, Gauge, Zap, Shield, Check, Heart, Share2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { cars } from '@/lib/data';
import { formatPrice, formatMileage } from '@/lib/utils';
import CarCard from '@/components/ui/CarCard';

const fuelColors: Record<string, string> = {
  Electric: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Petrol: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  Diesel: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Hybrid: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
};

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-2xl font-bold text-white mb-4">Car not found</h1>
        <Link to="/search" className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold">
          Back to Search
        </Link>
      </div>
    );
  }

  const similar = cars.filter((c) => c.id !== car.id && (c.bodyType === car.bodyType || c.fuelType === car.fuelType)).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Navbar />

      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/search" className="hover:text-white transition-colors">Browse</Link>
            <ChevronRight size={14} />
            <span className="text-white">{car.make} {car.model}</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-64 sm:h-96 lg:h-[500px] overflow-hidden">
          <img
            src={car.image}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/30 to-transparent" />

          {/* Back button */}
          <Link
            to="/search"
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md text-white text-sm hover:bg-black/60 transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </Link>

          {/* Actions */}
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <Heart size={18} className={liked ? 'text-red-500 fill-red-500' : ''} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left col */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${fuelColors[car.fuelType] || ''}`}>
                    {car.fuelType}
                  </span>
                  {car.badge && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {car.badge}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2">
                  {car.year} {car.make} {car.model}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(car.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                    <span className="ml-1">{car.rating}</span>
                  </div>
                  <span>·</span>
                  <span>{car.reviews} reviews</span>
                  <span>·</span>
                  <span>{formatMileage(car.mileage)}</span>
                </div>
              </div>

              {/* Performance stats */}
              <div>
                <h2 className="text-lg font-bold text-white mb-4">Performance</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: '0-60 mph', value: car.acceleration, icon: <Zap size={18} /> },
                    { label: 'Top Speed', value: car.topSpeed, icon: <Gauge size={18} /> },
                    { label: 'Horsepower', value: `${car.horsepower} hp`, icon: <Fuel size={18} /> },
                    { label: car.range ? 'Range' : 'Transmission', value: car.range || car.transmission, icon: <Shield size={18} /> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#1a1a2e] rounded-2xl border border-white/5 p-4 text-center">
                      <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white mx-auto mb-2">
                        {stat.icon}
                      </div>
                      <p className="text-base font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-bold text-white mb-3">About this Vehicle</h2>
                <p className="text-gray-400 leading-relaxed">{car.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-lg font-bold text-white mb-4">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[#1a1a2e] rounded-xl border border-white/5">
                      <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-sm text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col — price card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[#1a1a2e] rounded-3xl border border-white/10 p-6 card-glow">
                <p className="text-sm text-gray-400 mb-1">Price</p>
                <p className="text-4xl font-extrabold text-white mb-1">{formatPrice(car.price)}</p>
                <p className="text-sm text-gray-500 mb-6">+ taxes & fees</p>

                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Make', value: car.make },
                    { label: 'Model', value: car.model },
                    { label: 'Year', value: car.year.toString() },
                    { label: 'Color', value: car.color },
                    { label: 'Body Type', value: car.bodyType },
                    { label: 'Mileage', value: formatMileage(car.mileage) },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3.5 gradient-bg text-white rounded-2xl font-bold text-base hover:opacity-90 transition-opacity mb-3">
                  Request Test Drive
                </button>
                <button className="w-full py-3.5 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold text-sm hover:bg-white/10 transition-colors">
                  Get Financing Quote
                </button>

                <div className="flex items-center gap-2 mt-5 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <Shield size={16} className="text-emerald-400 shrink-0" />
                  <p className="text-xs text-emerald-300">Verified listing with full vehicle history report included</p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar cars */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Similar Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similar.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 CarVision AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
